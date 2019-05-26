<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
        <header class="form_header">添加商品</header>
        <el-form
          :model="foodForm"
          :rules="foodrules"
          ref="foodForm"
          label-width="110px"
          class="form food_form"
        >
          <el-form-item label="商品条码" prop="barcode">
            <el-input v-model="foodForm.barcode"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="foodForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品类型" prop="type">
            <el-input v-model="foodForm.type"></el-input>
          </el-form-item>
          <el-form-item label="商品宽度(mm)" prop="width">
            <el-input v-model="foodForm.width"></el-input>
          </el-form-item>
          <el-form-item label="商品高度(mm)" prop="height">
            <el-input v-model="foodForm.height"></el-input>
          </el-form-item>
          <el-form-item label="商品详情" prop="describe">
            <el-input v-model="foodForm.describe"></el-input>
          </el-form-item>
          <el-form-item label="上传商品图片" prop="imgPath">
            <el-upload
              class="avatar-uploader"
              :headers="header"
              action="/goods/uploadPic"
              :show-file-list="false"
              :on-success="uploadImg"
              :before-upload="beforeImgUpload"
            >
              <img v-if="foodForm.imgPath" :src="foodForm.imgPath" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addGoods('foodForm')">确认添加食品</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { getCategory, addCategory, addGoods } from "@/api/getData";
import { baseUrl, baseImgPath } from "@/config/env";
import { getStore } from "@/config/mUtils";
export default {
  data() {
    return {
      baseUrl,
      baseImgPath,
      header: {},
      restaurant_id: 1,
      foodForm: {
		barcode:"",
        name: "",
        describe: "",
        imgPath: "",
        type: "",
        width: "",
        height: ""
      },
      foodrules: {
        barcode: [{ required: true, message: "请输入", trigger: "blur" }],
        name: [{ required: true, message: "请输入", trigger: "blur" }],
		type: [{ required: true, message: "请输入", trigger: "blur" }],
        width: [{ required: true, message: "请输入", trigger: "blur" }],
		height: [{ required: true, message: "请输入", trigger: "blur" }],
        imgPath: [{ required: true, message: "请输入", trigger: "blur" }],
        describe: [{ required: true, message: "请输入", trigger: "blur" }]
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
    this.initData();
  },
  computed: {},
  methods: {
    async initData() {},
    uploadImg(res, file) {
      if (res.retCode == "200") {
        this.foodForm.imgPath = res.data;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    beforeImgUpload(file) {
      const token = getStore("token");
      this.header = { Authorization: token };
      const isRightType =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightType && isLt2M;
    },
    tableRowClassName(row, index) {
      if (index === 1) {
        return "info-row";
      } else if (index === 3) {
        return "positive-row";
      }
      return "";
    },
    addGoods(foodForm) {
      this.$refs[foodForm].validate(async valid => {
        if (valid) {
          const params = {
            ...this.foodForm
          };
          try {
			const result = await addGoods(params);
            if (result.retCode == "200") {
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.foodForm = {};
            } else {
              this.$message({
                type: "error",
                message: result.message
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
