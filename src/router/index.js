import Vue from 'vue'
import Router from 'vue-router'
import payment from 'views/payment/index.vue'
import choose from 'views/payment/chooseAdress.vue'
import edit from 'views/payment/edit.vue'
import add from 'views/payment/add.vue'
import order from 'views/payment/order.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'pay',
        component: payment,
        redirect: '/main',
        children: [
            { path: 'main', component: payment, name: '首页' }
        ],
        meta: { 
            slide: 1 ,
        },
    },{
        path: '/choose',
        name: 'choose',
        component: choose,
        meta: { 
            slide: 1 ,
        },
    },{
        path: '/edit',
        name: 'edit',
        component: edit,
        meta: { 
            slide: 1 ,
        },
    },{
        path: '/add',
        name: 'add',
        component: add,
        meta: { 
            slide: 1 ,
        },
    },{
        path: '/order',
        name: 'order',
        component: order,
        meta: { 
            slide: 1 ,
        },
    }]
})