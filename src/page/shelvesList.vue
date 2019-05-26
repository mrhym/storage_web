<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table
        :data="tableData"
        @expand="expand"
        :expand-row-keys="expendRow"
        :row-key="row => row.index"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺ID">
                <span>{{ props.row.store_id }}</span>
              </el-form-item>
              <el-form-item label="货架编码">
                <span>{{ props.row.shelves_code }}</span>
              </el-form-item>
              <el-form-item label="货架宽度">
                <span>{{ props.row.width }}</span>
              </el-form-item>
              <el-form-item label="货架高度">
                <span>{{ props.row.height}}</span>
              </el-form-item>
              <el-form-item label="货架层板数">
                <span>{{ props.row.laminate_num}}</span>
              </el-form-item>
              <el-form-item label="货架区域">
                <span>{{ props.row.area}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="店铺ID" prop="store_id"></el-table-column>
        <el-table-column label="货架编码" prop="shelves_code"></el-table-column>
        <el-table-column label="货架区域" prop="area"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)" type="primary">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="修改商品信息" v-model="dialogFormVisible">
        <el-form :model="selectTable">
          <el-form-item label="货架编码" label-width="100px">
            <el-input v-model="selectTable.shelves_code" auto-complete="off" disabled=""></el-input>
          </el-form-item>
          <el-form-item label="货架宽度" label-width="100px">
            <el-input v-model="selectTable.width" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="货架高度" label-width="100px">
            <el-input v-model="selectTable.height" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="货架层板数" label-width="100px">
            <el-input v-model="selectTable.laminate_num" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="货架区域" label-width="100px">
            <el-input v-model="selectTable.area"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateShelves">确 定</el-button>
        </div>
      </el-dialog>

      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import {
  getShelvesList,
  getShelvesCount,
  updateShelves,
  getStoreDetail,
  getUserInfo,
  getAddressById
} from "@/api/getData";
export default {
  data() {
    return {
      tableData: [],
      selectTable: [],
      dialogFormVisible: false,
      currentRow: null,
      store_id: 1,
      items: [],
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      restaurant_id: null,
      expendRow: []
    };
  },
  components: {
    headTop
  },
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
  async  updateShelves() {
      this.dialogFormVisible = false;
      const param = this.selectTable;
     const res = await updateShelves(param);
      try {
        if (res.retCode == "200") {
          this.$message({
            type: "success",
            message: "更新食品信息成功"
          });
          this.getShelves();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      } catch (err) {
        this.$message({
          type: "error",
          message: "更新失败"
        });
      }
    },
    handleEdit(row) {
      this.selectTable = row;
      this.dialogFormVisible = true;
    },
    async initData() {
      try {
        const countData = await getShelvesCount();
        if (countData.retCode == "200") {
          this.count = countData.data;
        } else {
          throw new Error("获取数据失败");
        }
        this.getShelves();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getShelves();
    },
    async getShelves() {
      const Orders = await getShelvesList({
        start: this.offset,
        count: this.limit
      });
      this.tableData = [];
      Orders.data.forEach((item, index) => {
        const tableData = {};
        tableData.store_id = item.storeId;
        tableData.shelves_code = item.shelvesCode;
        tableData.width = item.width;
        tableData.height = item.height;
        tableData.laminate_num = item.laminateNum;
        tableData.area = item.area;
        tableData.index = index;
        this.tableData.push(tableData);
      });
    },
    async expand(row, status) {
      if (status) {
        //           const orderId = row.id;
        //           const storeId = row.store_id;
        //         const store = await getStoreDetail({storeId});
        //         const goods = await getOrderDetail({orderId});
        //  this.items = goods.data;
        //         this.tableData.splice(row.index, 1, {
        //           ...row,
        //           ...{
        //             store_id : store.data.storeId,
        //             store_name: store.data.storeName,
        //             store_address: store.data.address,
        //           }
        //         });
        //         this.$nextTick(() => {
        //           this.expendRow.push(row.index);
        //         });
        //       } else {
        //         const index = this.expendRow.indexOf(row.index);
        //         this.expendRow.splice(index, 1);
      }
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33.33%;
}
</style>
