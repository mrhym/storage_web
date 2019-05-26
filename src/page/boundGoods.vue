<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
        <header class="form_header">绑定商品</header>
        <el-form
          :model="foodForm"
          :rules="foodrules"
          ref="foodForm"
          label-width="110px"
          class="form food_form"
        >
          <el-form-item label="货架编号" prop="shelvesCode">
            <el-select
              v-model="foodForm.shelvesCode"
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
          <el-form-item label="层板号码" prop="laminateNum">
            <el-select
              v-model="foodForm.laminateNum"
              filterable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option v-for="item in 5" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodsInfo">
            <el-select
              value-key="name"
              v-model="foodForm.goodsInfo"
              filterable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option v-for="item in goods" :key="item.name" :label="item.name" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="boundGoods('foodForm')">确认</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { getGoodsAll, getShevlesAll, saveDisplay } from "@/api/getData";
import { baseUrl, baseImgPath } from "@/config/env";
import { getStore } from "@/config/mUtils";
export default {
  data() {
    return {
      baseUrl,
      baseImgPath,
      header: {},
      goods: [],
      shelves: [],
      foodForm: {},
      foodrules: {
        shelvesCode: [{ required: true, message: "请输入" }],
        laminateNum: [{ required: true, message: "请输入" }],
        goodsInfo: [{ required: true, message: "请输入" }]
      }
    };
  },
  components: {
    headTop
  },
  created() {
    if (this.$route.query.restaurant_id) {
      this.restaurant_id = this.$route.query.restaurant_id;
    } else {
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    selectOne(item) {
      //change 触发事件
      //直接就拿到当前的这个对象了
      alert(JSON.stringify(item));
    },
    async initData() {
      //初始商品栏
      const goodsResult = await getGoodsAll();
      if (goodsResult.retCode == "200") {
        this.goods = goodsResult.data;
      } else {
        this.$message({
          type: "error",
          message: "初始商品栏失败"
        });
      }

      //初始货架栏
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
    boundGoods(foodForm) {
      this.$refs[foodForm].validate(async valid => {
        if (valid) {
          const params = {
            username: this.foodForm.username,
            storeId: this.foodForm.storeId,
            shelvesCode: this.foodForm.shelvesCode,
            laminateNum: this.foodForm.laminateNum,
            barcode: this.foodForm.goodsInfo.barcode,
            goodsName: this.foodForm.goodsInfo.name
          };
          try {
            const result = await saveDisplay(params);
            if (result.retCode == "200") {
              this.$message({
                type: "success",
                message: "保存成功"
              });
            } else {
              this.$message({
                type: "error",
                message: "保存失败"
              });
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          this.$notify.error({
            title: "错误",
            message: "请检查输入是否正确",
            offset: 100
          });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.form {
  min-width: 400px;
  margin-bottom: 30px;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border-radius: 6px;
    transition: all 400ms;
  }
}
.food_form {
  border: 1px solid #eaeefb;
  padding: 10px 10px 0;
}
.form_header {
  text-align: center;
  margin-bottom: 10px;
}
.category_select {
  border: 1px solid #eaeefb;
  padding: 10px 30px 10px 10px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}
.add_category_row {
  height: 0;
  overflow: hidden;
  transition: all 400ms;
  background: #f9fafc;
}
.showEdit {
  height: 185px;
}
.add_category {
  background: #f9fafc;
  padding: 10px 30px 0px 10px;
  border: 1px solid #eaeefb;
  border-top: none;
}
.add_category_button {
  text-align: center;
  line-height: 40px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px solid #eaeefb;
  border-top: none;
  transition: all 400ms;
  &:hover {
    background: #f9fafc;
    span,
    .edit_icon {
      color: #20a0ff;
    }
  }
  span {
    .sc(14px, #999);
    transition: all 400ms;
  }
  .edit_icon {
    color: #ccc;
    transition: all 400ms;
  }
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
.cell {
  text-align: center;
}
</style>
