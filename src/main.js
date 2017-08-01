//引入vue
import Vue from 'vue';

//引入axios
import Axios from 'axios';
//配置默认的请求url
Axios.defaults.baseURL = 'http://webhm.top:8899/api/';
Vue.prototype.$ajax = Axios;

//引入mint-ui
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUi);


//引入vue-preview插件图片预览
import VuePreview from 'vue-preview'
Vue.use(VuePreview);


//引入mui
import './static/vendor/mui-master/dist/css/mui.css';
//引入自定义图标
import './static/myicon.css';

//引入我们的全局的css
import './static/global.css';

//引入moment.js
import Moment from 'moment';

//代码分片段
// const Foo = resolve => require(['./Foo.vue'], resolve)


import App from './app.vue';
const Home = r => require(['./components/home.vue'], r);
const NewsList = r => require(['./components/news/newsList.vue'], r);

//引入全局组件开始
//顶部导航栏，包含后退功能
import NavBar from './components/commons/navBar.vue';
//评论组件
import Comment from './components/commons/comment.vue';
//轮播图组件
import MySwipe from './components/commons/mySwipe.vue';
//引入全局组件结束

//引入新闻详情组件
const NewsDetail = r => require(['./components/news/newsDetail.vue'], r);

const Member = r => require(['./components/member.vue'], r); //会员
const Search = r => require(['./components/search.vue'], r); //查找
const Shopcart = r => require(['./components/shopcart.vue'], r); //购物车

//图片分享组件
const PhotoShare = r => require(['./components/photo/photoShare.vue'], r);
//图片详情组件
const PhotoDetail = r => require(['./components/photo/photoDetail.vue'], r);

//商品列表组件
const GoodsList = r => require(['./components/goods/goodsList.vue'], r);
//商品详情组件
const GoodsDetail = r => require(['./components/goods/goodsDetail.vue'], r);
//引入商品评论组件
const GoodsComments = r => require(['./components/goods/goodsComments.vue'], r);

//v1.1.1-->1.1.2
console.log('做了修改');
console.log('又做了修改');
console.log('又又做了修改');
console.log('main.js改动了但是css没改');
console.log('加入了chunkhash');
console.log('又加入了chunkhash');
console.log('又又加入了chunkhash');
console.log('完成第三方库的抽离');
console.log('最后一次修改代码');
///创建全局组件 带返回功能的导航栏
/// Vue.component(组件名,引入的组件对象); 组件名驼峰，
/// 使用的时候 大写字符转成-小写字母  nav-bar
Vue.component('navBar', NavBar);
//声明全局的评论组件
Vue.component('comment', Comment);
//声明全局轮播图组件
Vue.component('mySwipe', MySwipe);


//声明全局过滤器
Vue.filter('formatDate', function(value) {
    return Moment(value).format('YYYY-MM-DD');
});


//引入vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//配置路由规则
let router = new VueRouter({
    linkActiveClass: 'mui-active' //设置当锚点值匹配的时候当前a标签所用的样式
});
router.addRoutes([
    { name: 'home', path: '/home', component: Home },
    { path: '/', redirect: { name: 'home' } }, //重定向到Home
    { name: 'news.list', path: '/news/list', component: NewsList }, //新闻列表
    { name: 'news.detail', path: '/news/detail', component: NewsDetail }, //新闻详情
    { name: 'member', path: '/member', component: Member }, //会员
    { name: 'shopcart', path: '/shopcart', component: Shopcart }, //购物车
    { name: 'search', path: '/search', component: Search }, //查找
    { name: 'photo.share', path: '/photo/share', component: PhotoShare }, //图片分享
    { name: 'photo.detail', path: '/photo/detail/:id', component: PhotoDetail }, //图片详情
    { name: 'goods.list', path: '/goods/list', component: GoodsList }, //商品列表
    { name: 'goods.detail', path: '/goods/detail/:gid', component: GoodsDetail }, //商品详情
    { name: 'goods.comments', path: '/goods/comments', component: GoodsComments }
]);


//构建vue实例
new Vue({
    el: '#app',
    router,
    render: c => c(App)
})
