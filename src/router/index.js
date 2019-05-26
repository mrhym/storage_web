import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Test = r => require.ensure([], () => r(require('@/page/Test')), 'Test');
const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addShelves = r => require.ensure([], () => r(require('@/page/addShelves')), 'addShelves');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const shelvesList = r => require.ensure([], () => r(require('@/page/shelvesList')), 'shelvesList');
const goodList = r => require.ensure([], () => r(require('@/page/goodList')), 'goodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const displaySurface = r => require.ensure([], () => r(require('@/page/displaySurface')), 'displaySurface');
const boundGoods = r => require.ensure([], () => r(require('@/page/boundGoods')), 'boundGoods');
const GoodsBubble = r => require.ensure([], () => r(require('@/components/GoodsBubble')), 'GoodsBubble');
const contryMap = r => require.ensure([], () => r(require('@/components/contryMap')), 'contryMap');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/test',
		component: Test
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/boundGoods',
			name:'boundGoods',
			component: boundGoods,
			meta: ['添加数据', '绑定商品'],
		},
		{
			path: '/addShelves',
			name:'addShelves',
			component: addShelves,
			meta: ['添加数据', '添加货架'],
		},{
			path: '/addGoods',
			name:'addGoods',
			component: addGoods,
			meta: ['添加数据', '添加商品'],
		},{
			path: '/displaySurface',
			name:'displaySurface',
			component: displaySurface,
			meta: ['数据管理', '货架商品'],
		},{
			path: '/userList',
			component: userList,
			name:userList,
			meta: ['数据管理', '用户列表'],
		},{
			path: '/shelvesList',
			name:shelvesList,
			component: shelvesList,
			meta: ['数据管理', '货架列表'],
		},{
			path: '/goodList',
			name:'goodList',
			component: goodList,
			meta: ['数据管理', '食品列表'],
		},{
			path: '/orderList',
			name:'orderList',
			component: orderList,
			meta: ['数据管理', '订单列表'],
		},{
			path: '/adminList',
			name:'orderList',
			component: adminList,
			meta: ['数据管理', '管理员列表'],
		},{
			path: '/visitor',
			name:'visitor',
			component: visitor,
			meta: ['图表', '货架销售额区域分布图'],
		},{
			path: '/map',
			name:'map',
			component: contryMap,
			meta: ['图表', '店铺分布图'],
		},{
			path: '/bubble',
			name:'bubble',
			component: GoodsBubble,
			meta: ['图表', '商品散点图'],
		},{
			path: '/uploadImg',
			name:'uploadImg',
			component: uploadImg,
			meta: ['文本编辑', 'MarkDown'],
		},{
			path: '/vueEdit',
			name:'vueEdit',
			component: vueEdit,
			meta: ['通知', '发送通知'],
		},{
			path: '/adminSet',
			name:'adminSet',
			component: adminSet,
			meta: ['设置', '管理员设置'],
		},{
			path: '/sendMessage',
			name:'sendMessage',
			component: sendMessage,
			meta: ['设置', '发送通知'],
		},{
			path: '/explain',
			name:'explain',
			component: explain,
			meta: ['说明', '说明'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
