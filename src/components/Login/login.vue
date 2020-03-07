<template>
	<div class="login-warp">
		<el-form class="login-form" ref="loginFormRef" :rules="loginFormRules"  :model="formdata">
			<h2>用户登录</h2>
			<el-form-item prop="username">
				<el-input prefix-icon="el-icon-user-solid" placeholder="请输入学号"
					v-model="formdata.username"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input prefix-icon="el-icon-lock" placeholder="请输入密码"
					v-model="formdata.password" type='password'></el-input>
			</el-form-item>
			<el-button @click.prevent="Login" class="login-btn" type="primary" round>登录</el-button>
			<el-button @click.prevent="resetLoginForm" class="login-btn" type="info" round>重置</el-button>
		</el-form>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				formdata: {
					username:'admin',
					password: '123456'
				},
				loginFormRules:{
					username:[
						{ required: true, message: '请输入你的学号', trigger: 'blur' },
						{ min: 0, max: 11, message: '格式错误', trigger: 'blur' }
					],
					password:[
						{ required: true, message: '请输入你的密码', trigger: 'blur' },
						{ min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			Login() {
				this.$refs.loginFormRef.validate(async valid=>{
					if (!valid) return
					const {data : res} = await this.$http.post('login' , this.formdata)
					if(res.meta.status !== 200) return this.$message.error("登陆失败")
					this.$message.success("登陆成功")
					window.sessionStorage.setItem("token",res.data.token)
					this.$router.push("/home")
				})
			},
			resetLoginForm(){
				this.$refs.loginFormRef.resetFields()
				
			}
		}
	}
</script>

<style>
	.login-warp {
		height: 100%;
		background-color: #324152;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.login-warp .login-form {
		width: 400px;
		background-color: #fff;
		padding: 30px;
		border-radius: 10px;
	}
	
	.login-warp .login-btn {
		width: 45%;
	}
	h2{
		text-align: center;
	}
</style>