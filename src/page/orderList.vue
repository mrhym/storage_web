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
              <el-form-item label="用户名">
                <span>{{ props.row.user_name }}</span>
              </el-form-item>
              <el-form-item label="店铺ID">
                <span>{{ props.row.store_id }}</span>
              </el-form-item>
              <el-form-item label="店铺名称">
                <span>{{ props.row.store_name }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.store_address }}</span>
              </el-form-item>
              <div v-for="item in items">
                <el-form-item label="商品条码">
                  <span>{{ item.barcode}}</span>
                </el-form-item>
                <el-form-item label="商品名称">
                  <span>{{ item.goodsName}}</span>
                </el-form-item>
                <el-form-item label="商品单价">
                  <span>{{ item.unitPrice}}</span>
                </el-form-item>
                <el-form-item label="商品数量">
                  <span>{{item.goodsNumber}}</span>
                </el-form-item>
              </div>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单 ID" prop="id"></el-table-column>
        <el-table-column label="总价格" prop="total_amount"></el-table-column>
        <el-table-column label="订单状态" prop="status"></el-table-column>
      </el-table>
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
  getOrderList,
  getOrderCount,
  getOrderDetail,
  getStoreDetail,
  getUserInfo,
  getAddressById
} from "@/api/getData";
export default {
  data() {
    return {
      tableData: [],
      currentRow: null,
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
    async initData() {
      try {
        const countData = await getOrderCount();
        if (countData.retCode == "200") {
          this.count = countData.data;
        } else {
          throw new Error("获取数据失败");
        }
        this.getOrders();
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
      this.getOrders();
    },
    async getOrders() {
      const Orders = await getOrderList({
        start: this.offset,
        count: this.limit
      });
      this.tableData = [];
      Orders.data.forEach((item, index) => {
        const tableData = {};
        tableData.id = item.orderId;
        tableData.user_name =item.username
        tableData.total_amount = item.charge;
        tableData.status = item.status;
        tableData.store_id = item.storeId;
        tableData.index = index;
        this.tableData.push(tableData);
      });
    },
    async expand(row, status) {
      if (status) {
          const orderId = row.id;
          const storeId = row.store_id;
        const store = await getStoreDetail({storeId});
        const goods = await getOrderDetail({orderId});

 this.items = goods.data;
        this.tableData.splice(row.index, 1, {
          ...row,
          ...{
            store_id : store.data.storeId,
            store_name: store.data.storeName,
            store_address: store.data.address,
          }
        });
        this.$nextTick(() => {
          this.expendRow.push(row.index);
        });
      } else {
        const index = this.expendRow.indexOf(row.index);
        this.expendRow.splice(index, 1);
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
  width: 25%;
}
</style>
