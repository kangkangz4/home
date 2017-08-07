'use strict'

export const account = {
	mobile: '13395140855',
	password: '123456',
	name: '朱先生',
    pinyin: 'zhu',
	avatar: 'http://img2.imgtn.bdimg.com/it/u=1735755037,1520963688&fm=214&gp=0.jpg',
    sex: 1,
    addr: '',
    email: 'kang',
    age: 10,
    birth: '2017-08-01'
}

export const menus = [
	{
        path: '/',
        componentUrl: 'views/Home.vue',
        name: '导航一',
        icon: 'el-icon-message',//图标样式class
        order: 1,
        children: [
            { path: '/dashboard', componentUrl: 'views/nav1/Table.vue', name: 'Table', order:1 },
            { path: '/form', componentUrl: 'views/nav1/Form.vue', name: 'Form', order:2 },
            { path: '/user', componentUrl: 'views/nav1/user.vue', name: '列表', order:3 },
        ]
    },
    {
        path: '/',
        componentUrl: 'views/Home.vue',
        name: '导航二',
        icon: 'fa fa-id-card-o',
        order: 2,
        children: [
            { path: '/page4', componentUrl: 'views/nav2/Page4.vue', name: '页面4', order:1 },
            { path: '/page5', componentUrl: 'views/nav2/Page5.vue', name: '页面5', order:2 }
        ]
    },
    {
        path: '/',
        componentUrl: 'views/Home.vue',
        name: '导航三',
        icon: 'fa fa-address-card',
        order: 3,
        children: [
            { path: '/page6',componentUrl: 'views/nav3/Page6.vue', name: '页面6', order:3 }
        ]
    },
    {
        path: '/',
        componentUrl: 'views/Home.vue',
        name: 'Charts',
        icon: 'fa fa-bar-chart',
        order: 4,
        children: [
            { path: '/echarts',componentUrl: 'views/charts/echarts.vue', name: 'echarts', order:4 }
        ]
    },
    {
        path: '/',
        componentUrl: 'views/Home.vue',
        name: '系统设置',
        icon: 'fa fa-bar-chart',
        order: 99,
        children: [
            { path: '/menu',componentUrl: 'views/system/Menu.vue', name: '菜单设置', order:1 }
        ]
    }
]