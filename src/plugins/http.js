import axios from "axios"

const MyPlugin = {}
MyPlugin.install = (Vue) => {
  axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
  Vue.prototype.$myMethod = axios
}

export default MyPlugin