<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="货架编号" prop="shelvesCode">
						<el-input  v-model.number="formData.shelvesCode"></el-input>
					</el-form-item>
					<el-form-item label="货架宽度(mm)" prop="width">
						<el-input   v-model.number="formData.width" ></el-input>
					</el-form-item>
					<el-form-item label="货架高度(mm)" prop="height">
						<el-input  v-model.number="formData.height"></el-input>
					</el-form-item>
					<el-form-item label="货架层板数" prop="laminateNum">
						<el-input  v-model.number="formData.laminateNum"></el-input>
					</el-form-item>
					<el-form-item label="货架层区域" prop="area">
						<el-input v-model="formData.area"></el-input>
					</el-form-item>
					<el-form-item class="button_submit">
						<el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
					</el-form-item>
				</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {addShelves} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
    			city: {},
    			formData: {},
		        rules: {
					shelvesCode: [
                  { required: true, message: '编码不能为空'},
                  { type: 'number', message: '编码必须是数字值'}
					],
					width: [
						{ required: true, message: '请输入货架尺寸'},
						{ type: 'number', message: '层板数必须是数字' }
					],
					height: [
						{ required: true, message: '请输入货架尺寸'},
						{ type: 'number', message: '层板数必须是数字' }
					],
					laminateNum: [
						{ required: true, message: '请输入层板数'},
						{ type: 'number', message: '层板数必须是数字' }
					],
					area: [
						{ required: true, message: '请输入货架尺寸' }
					]
				},
			    baseUrl,
			    baseImgPath,
			    categoryOptions: []
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    	},
    	methods: {
		    submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						try{
							let result = await addShelves(this.formData);
							if (result.retCode == "200") {
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
								  });
								  this.formData={};
							}else{
								this.$message({
					            	type: 'error',
					            	message: result.message
					          	});
							}
							console.log(result)
						}catch(err){
							console.log(err)
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				});
			},
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.button_submit{
		text-align: center;
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
	.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
	}
</style>
