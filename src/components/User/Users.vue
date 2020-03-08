<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>宿舍信息</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<el-row :gutter='20'>
				<el-col :span='10'>
					<el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
						<el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
					</el-input>
				</el-col>
				<el-col :span='4'>
					<el-button type="primary" @click="addDialogVisible=true">添加成员</el-button>
				</el-col>
			</el-row>
			<el-table :data="userlist" border stripe>
				<el-table-column type='index' label='#'></el-table-column>
				<el-table-column label='宿舍号'>5613</el-table-column>
				<el-table-column label='姓名' prop='username'></el-table-column>
				<el-table-column label='学号' prop='email'></el-table-column>
				<el-table-column label='电话' prop='mobile'></el-table-column>
				<el-table-column label='角色' prop='role_name'></el-table-column>
				<el-table-column label='操作'>
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDiaiog(scope.row.id)"></el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>

		<el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close='addDialogClosed'>
			<el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="addForm.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="addForm.password"></el-input>
				</el-form-item>
				<el-form-item label="学号" prop="email">
					<el-input v-model="addForm.email"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="mobile">
					<el-input v-model="addForm.mobile"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
    			<el-button @click="addDialogVisible = false">取 消</el-button>
    			<el-button type="primary" @click="addUser">确 定</el-button>
  			</span>
		</el-dialog>

		<el-dialog title="编辑用户" :visible.sync="editDialogVisible" width="50%" @close='editDialogClosed'>
			<el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="editForm.username" disabled></el-input>
				</el-form-item>
				<el-form-item label="学号" prop="email">
					<el-input v-model="editForm.email"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="mobile">
					<el-input v-model="editForm.mobile"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
    			<el-button @click="editDialogVisible = false">取 消</el-button>
    			<el-button type="primary" @click="editUserInfo">确 定</el-button>
  			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				queryInfo: {
					query: '',
					pagenum: 1,
					pagesize: 6
				},
				userlist: [],
				total: 0,
				addDialogVisible: false,
				addForm: {
					username: '',
					password: '',
					email: '',
					mobile: ''
				},
				addFormRules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 10,
							message: '请输入合法的用户名',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 15,
							message: '请输入合法的密码',
							trigger: 'blur'
						}
					],
					email: [{
							required: true,
							message: '请输入学号',
							trigger: 'blur'
						},
						{
							min: 0,
							max: 11,
							message: '请输入合法的学号',
							trigger: 'blur'
						}
					],
					mobile: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 0,
							max: 11,
							message: '请输入合法的手机号',
							trigger: 'blur'
						}
					]
				},
				editDialogVisible: false,
				editForm: {},
				editFormRules: {
					email: [{
							required: true,
							message: '请输入学号',
							trigger: 'blur'
						},
						{
							min: 0,
							max: 11,
							message: '请输入合法的学号',
							trigger: 'blur'
						}
					],
					mobile: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 0,
							max: 11,
							message: '请输入合法的手机号',
							trigger: 'blur'
						}
					]
				}

			}
		},
		created() {
			this.getUserList()
		},
		methods: {
			async getUserList() {
				const {
					data: res
				} = await this.$http.get('users', {
					params: this.queryInfo
				})
				if(res.meta.status !== 200) {
					return this.$message.error('获取信息失败！')
				}
				this.userlist = res.data.users
				this.total = res.data.total
			},
			addDialogClosed() {
				this.$refs.addFormRef.resetFields()
			},
			addUser() {
				this.$refs.addFormRef.validate(async valid => {
					if(!valid) return
					const {
						data: res
					} = await this.$http.post('users', this.addForm)
					if(res.meta.status !== 201) {
						this.$message.error('添加失败')
					}
					this.$message.success('添加成功')
					this.addDialogVisible = false
					this.getUserList()
				})
			},
			async showEditDiaiog(id) {
				const {
					data: res
				} = await this.$http.get('users/' + id)
				if(res.meta.status !== 200) {
					return this.$message.error('查询用户失败')
				}
				this.editForm = res.data
				this.editDialogVisible = true
			},
			editDialogClosed() {
				this.$refs.editFormRef.resetFields()
			},
			editUserInfo() {
				this.$refs.editFormRef.validate(async valid => {
					if(!valid) return
					const {data: res} = await this.$http.put('users/', this.editForm.id, {
						email: this.editForm.email,
						mobile: this.editForm.mobile
					})
					if(res.meta.status !== 200) {
						return this.$message.error('修改失败')
					}
					this.editDialogVisible = false
					this.getUserList()
					this.$message.success('修改成功')
				})
			},
			async removeUserById(id) {
				const resultConfirm = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).catch(err => err)
				if (resultConfirm !== 'confirm'){
					return this.$message.info('已取消删除')
				}
				const {data: res} = await this.$http.delete('users/' + id)
					if (res.meta.status !== 200) {
						return this.$message.error('删除用户失败')
				}
					this.$message.success('删除用户成功')
					this.getUserList()
			}
		}
	}
</script>

<style>
	.el-table {
		margin-top: 15px;
		font-size: 12px;
	}
</style>