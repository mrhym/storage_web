import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import 'element-ui/lib/theme-default/index.css'
import china from 'echarts/map/json/china.json'

Vue.config.productionTip = false;
echarts.registerMap('china', china)
Vue.use(ElementUI);
Vue.use(echarts);

router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
	  if(localStorage.getItem('token')){ //判断本地是否存在access_token
		  next({
			path:to.fullPath
		  });
		}else{
			next({
				path:'/'
			})
		}
	  }else {
		  next();
	  }
	/*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
	if(to.fullPath == "/login"){
		if(localStorage.getItem('token')){
		  next({
			path:from.fullPath
		  });
		}else {
		  next();
		}
	  }
  })
  
  
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
