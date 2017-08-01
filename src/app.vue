<template>
    <div>
        <mt-header title="传智25期信息管理系统"></mt-header>
        <transition name="bounce">
            <router-view></router-view>
        </transition>
        <!-- 底部tabbar -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" :to="{name:'home'}">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'member'}">
                <span class="mui-icon mui-icon-members"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'shopcart'}">
                <span class="mui-icon mui-icon-shopcart"><span class="mui-badge">{{pickNum}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'search'}">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">查找</span>
            </router-link>
        </nav>
    </div>
</template>
<script>
import vueBus from './components/commons/myBus.js';
import tools from './components/goods/goodsTools.js';
export default {
    data() {
        return {
            pickNum: 0,
        }
    }, created() {

        //获取所有商品列表对象的value累加
        this.pickNum = tools.getTotalCount();


        //这里的this VueCompoent
        //老式的处理方式 var self = this;  下面使用self

        //用bus on
        vueBus.$on('addShopcart', (num, id) => {
            // console.log('接受到添加购物车的信号', num);

            this.pickNum += num;
            //存储购物车清单数量
            tools.addOrUpdate({
                id,
                num
            });
        });
    }
}
</script>
<style scoped>
.bounce-leave-active {
    animation: bounce-out .5s;
}

@keyframes bounce-out {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(0);
    }
}
</style>
