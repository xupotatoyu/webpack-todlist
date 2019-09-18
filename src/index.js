import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)
//index是入口文件
new Vue({
    // h参数其实是vue中的createApp参数
    render: (h) => h(App)
}).$mount(root)
