<template>
  <div class="fillcontain">
    <head-top></head-top>
    <header class="admin_title">管理员信息</header>
    <div class="admin_set">
      <ul>
        <li>
          <span>姓名：</span>
          <span>{{adminInfo.name}}</span>
        </li>
        <li>
          <span>注册时间：</span>
          <span>{{formatDate(adminInfo.createdTime)}}</span>
        </li>
        <li>
          <span>管理门店ID：</span>
          <span>{{adminInfo.storeId}}</span>
        </li>
        <li>
          <span>管理员 ID：</span>
          <span>{{adminInfo.username}}</span>
        </li>
        <li>
          <span>更换头像：</span>
          <el-upload
            class="avatar-uploader"
            action="/goods/uploadPic"
            :show-file-list="false"
            :on-success="uploadImg"
            :before-upload="beforeImgUpload"
          >
            <img v-if="adminInfo.profileImg" :src="adminInfo.profileImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import { mapState } from "vuex";
import { baseUrl, baseImgPath } from "@/config/env";
import { updateProfile } from "@/api/getData";
import dtime from 'time-formater'

export default {
  data() {
    return {
      baseUrl,
      baseImgPath
    };
  },
  components: {
    headTop
  },
  computed: {
    ...mapState(["adminInfo"])
  },
  methods: {
        formatDate(time) {
            return dtime(time).format('YYYY-MM-DD');
        },
    async updateUserProfile() {
      try {
        const res = await updateProfile({
          username: this.adminInfo.username,
          profileImg: this.adminInfo.profileImg
        });
        if (res.retCode == "200") {
          this.$message({
            type: "success",
            message: "添加成功"
          });
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    uploadImg(res, file) {
      if (res.retCode == "200") {
        this.adminInfo.profileImg = res.data;
        this.updateUserProfile();
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    beforeImgUpload(file) {
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
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.explain_text {
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  color: #333;
}
.admin_set {
  width: 60%;
  background-color: #f9fafc;
  min-height: 400px;
  margin: 20px auto 0;
  border-radius: 10px;
  ul > li {
    padding: 20px;
    span {
      color: #666;
    }
  }
}
.admin_title {
  margin-top: 20px;
  .sc(24px, #666);
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  margin-top: 10px;
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
