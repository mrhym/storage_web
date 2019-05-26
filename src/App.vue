<template>
  <div id="app" class="fillcontain">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  created: function() {
    this.init();
  },
  methods: {
    provide() {
      return {
        reload: this.reload
      };
    },
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function() {
          this.isRouterAlive = true;
        });
      },
    init: function() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket("ws://localhost:7003/websocket");
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open: function() {
      this.$message({
        message: "连接成功",
        type: "success"
      });
    },
    error: function() {
      console.log("连接错误");
    },
    getMessage: function(msg) {
      this.$notify({
        title: "通知",
        dangerouslyUseHTMLString: true,
        message: msg.data,
        duration: 0,
        type: "success"
      });
      console.log(msg.data);
    },
    send: function() {
      this.socket.send(params);
    },
    close: function() {
      console.log("socket已经关闭");
    }
  },
  destroyed() {
    // 销毁监听
    this.socket.onclose = this.close;
  }
};
</script>

<style lang="less">
@import "./style/common";
</style>
