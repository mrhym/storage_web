<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<header class="section_title">数据统计</header>
			<el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{chargeOneDay}}</span> 当日销售额</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span> 新增订单</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{adminCount}}</span> 客流人数</div></el-col>
			</el-row>
            <el-row :gutter="20">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allUserCount}}</span> 总销售额</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allOrderCount}}</span> 订单</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allAdminCount}}</span> 总客流人数</div></el-col>
            </el-row>
		</section>
		<tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import tendency from '../components/tendency' 
	import dtime from 'time-formater'
	import {orderCount,chargeAmount,chargeAmountAll,orderCountAll,customerFlow,customerFlowAll} from '@/api/getData'
    export default {
    	data(){
    		return {
    			chargeOneDay: 0,
    			orderCount: 0,
                adminCount: 0,
                allUserCount: 0,
                allOrderCount: 0,
                allAdminCount: 0,
    			sevenDay: [],
    			sevenDate: [[],[],[]],
    		}
    	},
    	components: {
    		headTop,
    		tendency,
    	},
    	mounted(){
    		this.initData();
    		for (let i = 6; i > -1; i--) {
    			const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
    			this.sevenDay.push(date)
    		}
    		this.getSevenData();
    	},
        computed: {

        },
    	methods: {
    		async initData(){
    			const today = dtime(new Date()).format('YYYY-MM-DD')
    			Promise.all([chargeAmount(today), orderCount(today), customerFlow(today), chargeAmountAll(), orderCountAll(), customerFlowAll()])
    			.then(res => {
    				this.chargeOneDay = res[0].data;
    				this.orderCount = res[1].data;
                    this.adminCount = res[2].data;
                    this.allUserCount = res[3].data;
                    this.allOrderCount = res[4].data;
                    this.allAdminCount = res[5].data;
    			}).catch(err => {
    				console.log(err)
    			})
    		},
    		async getSevenData(){
				const apiArr = [[],[],[]];
    			this.sevenDay.forEach(item => {
    				apiArr[0].push(chargeAmount(item))
				    apiArr[1].push(orderCount(item))
                    apiArr[2].push(customerFlow(item))
				})
    			const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
    			Promise.all(promiseArr).then(res => {
					const resArr = [[],[],[]];
					res.forEach((item, index) => {
						if (item.retCode == "200") {
							if(item.data != null){
								resArr[Math.floor(index/7)].push(item.data)
							}else{
									resArr[Math.floor(index/7)].push(0)
							}
						}
					})
					this.sevenDate = resArr;
    			}).catch(err => {
    				console.log(err)
    			})
    		}
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
