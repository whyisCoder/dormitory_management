import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/Login/login.vue"
import Home from "@/components/Home.vue"
import Welcome from "@/components/Welcome.vue"
import Users from "@/components/User/Users.vue"

Vue.use(Router)

const router = new Router({
  routes: [
	  {
	  	path: '/',
	  	redirect: '/login'
	  },
    {
      path: '/login',
      component: Login
    },
    {
	  	path: '/home',
	  	component: Home,
	  	redirect: '/welcome',
	  	children:[
	  		{
	  			path:'/welcome',
      		component: Welcome
	  		},
	  		{
	  			path:'/users',
      		component: Users
	  		}
	  	]
	  }
  ]
})

router.beforeEach((to , from , next) => {
	if (to.path === '/login') return next()
	const tokenStr = window.sessionStorage.getItem('token')
	if(!tokenStr) return next('/login')
	next()
})


export default router