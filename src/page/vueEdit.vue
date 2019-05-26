<template>
  <div>
    <head-top></head-top>
    <div class="edit_container">
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        class="editer"
        :options="editorOption"
        @ready="onEditorReady($event)"
      ></quill-editor>
    </div>
    <div class="submit_btn">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";

import { sendMessage,getGoods} from "@/api/getData";
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      content: "",
      editorOption: {}
    };
  },
  components: {
    headTop,
    quillEditor
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },
   async submit() {
     const message = this.content;
       const result = await sendMessage({message});
      if (result.retCode == "200") {
        this.$message({
          type: "success",
          message: "发送成功"
        });
        this.content = "";
      } else {
          this.$message({
          type: "error",
          message: "发送失败"
        });
      }
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.edit_container {
  padding: 40px;
  margin-bottom: 40px;
}
.editer {
  height: 350px;
}
.submit_btn {
  text-align: center;
}
</style>
