<template>
    <div>
        <nav-bar title="商品详情"></nav-bar>
        <div class="outer-swiper">
            <div class="swiper">
                <my-swipe :url="goodsUrl"></my-swipe>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                    {{info.title}}
                </span></li>
                <li class="price-li">市场价：
                    <s>￥{{info.market_price}}</s> 销售价：<span>￥{{info.sell_price}}</span></li>
                <li class="number-li">购买数量：<span @click="substract">-</span><span>{{pickNum}}</span><span @click="add">+</span></li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="addShopcart" ref="addShopcart">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <transition name="ball" @after-enter="afterEnter">
            <div class="ball" v-if="isShow"></div>
        </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：{{info.goods_no}}</li>
                <li>库存情况：{{info.stock_quantity}}件</li>
                <li>上架时间：{{info.add_time | formatDate}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain @click="showGoodsInfo">图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain @click="showGoodsComments">商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import vueBus from '../commons/myBus.js';
export default {
    data() {
            return {
                info: {}, //商品详情数据
                isShow: false, //小球默认不显示
                goodsUrl: '', //商品轮播图url
                gid: this.$route.params.gid, //商品id
                pickNum: 1, //加入购物车的商品数量

            }
        },
        created() {
            console.log('aaaa');
            this.$ajax.get('goods/getinfo/' + this.gid)
                .then(res => {
                    this.info = res.data.message[0];
                })
                // 给子组件赋值url,让轮播图显示
            this.goodsUrl = 'getthumimages/' + this.gid;

        },
        methods: {
            showGoodsComments() {
                //跳转到商品评论的路由
                this.$router.push({
                    name: 'goods.comments',
                    query: {
                        gid: this.gid
                    }
                });
            },
            showGoodsInfo() {
                this.$router.push({
                    name: 'news.detail',
                    query: {
                        id: this.gid
                    }
                });
            },
            //加加
            add() {
                //判断当前商品是否超出库存数量
                if (this.pickNum >= this.info.stock_quantity) return;
                this.pickNum++;
            },
            //减去
            substract() {
                if (this.pickNum <= 1) return;
                this.pickNum--;
            },
            //添加购物车
            addShopcart() {
                //会触发ball-entry-active的动画
                this.isShow = true;
                //禁用添加购物车按钮
                //由于addShopcart按钮本身是一个组件，获取来就是一个组件对象，通过$el拿到其DOM元素对象



                //通知底部改变小球数量
                vueBus.$emit('addShopcart', this.pickNum, this.info.id);


                this.$refs.addShopcart.$el.disabled = true;

            },
            //小球被插入以后的行为
            afterEnter() {
                this.isShow = false;
                //如果this.$refs.addShopcart为空，代表组件已经切换

                if (!this.$refs.addShopcart) return;
                //添加购物车的按钮的禁用取消
                this.$refs.addShopcart.$el.disabled = false;
            }

        }
}
</script>
<style scoped>
.ball-enter-active {
    animation: bounce-in 1s;
}

@keyframes bounce-in {
    0% {
        /*3d方式通过硬件加速来执行，保证流畅性*/
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(140px, -50px, 0);
    }
    75% {
        transform: translate3d(160px, 0px, 0);
    }
    100% {
        transform: translate3d(140px, 300px, 0);
    }
}

.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}


/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
}

.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}


/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}


/*商品参数*/

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}
</style>
