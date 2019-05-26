<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品发布用户">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.goods_name }}</span>
              </el-form-item>
              <el-form-item label="商品编码">
                <span>{{ props.row.barcode }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="货架ID" prop="shelves_code" sortable></el-table-column>
        <el-table-column label="层板号" prop="laminate_num" sortable></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)">调整</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改商品位置信息" v-model="dialogFormVisible">
        <el-form :model="selectTable" label-width="110px">
          <el-form-item label="货架编号" prop="shelves_code">
            <el-select
              v-model="selectTable.shelves_code"
              filterable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in shelves"
                :key="item.shelvesCode"
                :label="item.shelvesCode"
                :value="item.shelvesCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="层板号码" prop="laminate_num">
            <el-select
              v-model="selectTable.laminate_num"
              filterable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option v-for="item in 5" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateDisplay()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import {
  getGoods,
  showDisplay,
  updateDisplayLocal,
  getShevlesAll
} from "@/api/getData";
export default {
  inject:["reload"],
  data() {
    return {
      baseUrl,
      baseImgPath,
      restaurant_id: null,
      city: {},
      offset: 0,
      limit: 20,
      count: 0,
      tableData: [],
      currentPage: 1,
      selectTable: {},
      shelves: [],
      dialogFormVisible: false,
      menuOptions: [],
      selectMenu: {},
      selectIndex: null,
      specsForm: {
        specs: "",
        packing_fee: 0,
        price: 20
      },
      specsFormrules: {
        specs: [{ required: true, message: "请输入规格", trigger: "blur" }]
      },
      specsFormVisible: false,
      expendRow: []
    };
  },

  created() {
    this.initData();
  },
  components: {
    headTop
  },
  methods: {
    async initData() {
      try {
        this.showDisplay();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    async showDisplay() {
      const display = await showDisplay();
      this.tableData = [];
      display.data.forEach((item, index) => {
        const tableData = {};
        tableData.id = item.id;
        tableData.store_id = item.storeId;
        tableData.shelves_code = item.shelvesCode;
        tableData.laminate_num = item.laminateNum;
        tableData.goods_name = item.goodsName;
        tableData.barcode = item.barcode;
        tableData.username = item.username;
        tableData.index = index;
        this.tableData.push(tableData);
      });
    },
    tableRowClassName(row, index) {
      if (index === 1) {
        return "info-row";
      } else if (index === 3) {
        return "positive-row";
      }
      return "";
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.selectTable = { ...row };
      this.initShelvesCode();
    },
    handleSelect(index) {
      this.selectIndex = index;
      this.selectMenu = this.menuOptions[index];
    },
    async handleDelete(index, row) {
      try {
        const res = await deleteFood(row.item_id);
        if (res.status == 1) {
          this.$message({
            type: "success",
            message: "删除食品成功"
          });
          this.tableData.splice(index, 1);
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        this.$message({
          type: "error",
          message: err.message
        });
        console.log("删除食品失败");
      }
    },
    async initShelvesCode() {
      const shelvesResult = await getShevlesAll();
      if (shelvesResult.retCode == "200") {
        this.shelves = shelvesResult.data;
      } else {
        this.$message({
          type: "error",
          message: "初始货架栏失败"
        });
      }
    },
    async updateDisplay() {
        let obj = this;
      this.dialogFormVisible = false;
      const postData = {
        id: this.selectTable.id,
        shelvesCode: this.selectTable.shelves_code,
        laminateNum: this.selectTable.laminate_num
      };
      try {
        const res = await updateDisplayLocal(postData);
        if (res.retCode == "200") {
          this.$message({
            type: "success",
            message: "更新信息成功"
          });
         obj.reload();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      } catch (err) {
        console.log("更新信息失败", err);
      }
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 100px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33.333%;
}
.table_container {
  padding: 20px;
}
.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
