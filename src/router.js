import Vue from 'vue'
import Router from 'vue-router'

//组件模块
import login from './components/login'
import index from './components/index'
import cityChoose from './components/cityChoose'
import search from './components/search'
import coupons from './components/coupons'
import order from './components/order'
import pay from './components/pay'
import orderDetail from './components/orderDetail'
import paySuccess from './components/paySuccess'
import comment from './components/comment'
import couponDetail from './components/couponDetail'
import viewCode from './components/viewCode'
import storeMap from './components/storeMap'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/login',
            name: '',
            component: login
        },
        {
            path: '/index',
            name: 'index',
            component: index
        },
        {
            path: '/cityChoose',
            name: 'cityChoose',
            component: cityChoose
        },
        {
            path: '/search',
            name: 'search',
            component: search
        },
        {
            path: '/coupons',
            name: 'coupons',
            component: coupons
        },
        {
            path: '/order',
            name: 'order',
            component: order
        },
        {
            path: '/pay',
            name: 'pay',
            component: pay
        },
        {
            path: '/paySuccess',
            name: 'paySuccess',
            component: paySuccess
        },
        {
            path: '/comment',
            name: 'comment',
            component: comment
        },
        {
            path: '/orderDetail',
            name: 'orderDetail',
            component: orderDetail
        },
        {
            path: '/couponDetail',
            name: 'couponDetail',
            component: couponDetail
        },
        {
            path: '/viewCode',
            name: 'viewCode',
            component: viewCode
        },
        {
            path: '/storeMap',
            name: 'storeMap',
            component: storeMap
        }

    ]
})