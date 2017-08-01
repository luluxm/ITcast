<template>
    <div class="tmpl">
        <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for="(goods,index) in goodsList" :key="goods.id">
                    <mt-switch v-model="goods.isPicked"></mt-switch>
                    <img :src="goods.thumb_path">
                    <div class="pay-calc">
                        <p>{{goods.title}}</p>
                        <div class="calc">
                            <span>￥{{goods.sell_price}}</span>
                            <span @click="substract(goods)">-</span>
                            <span>{{goods.pickNum}}</span>
                            <span @click="add(goods)">+</span>
                            <a href="javascript:;" @click="del(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.count}}件，总价￥{{payment.sum}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import tools from '../components/goods/goodsTools.js';
import vueBus from './commons/myBus.js';

export default {
    data() {
            return {
                goodsList: [] //购物车列表
            }
        },
        created() {
            //获取购物车数据，拼接88,93,95 发起请求获取数据
            let prods = tools.getProds();

            //判断如果当前没有商品，不要发起请求，直接return
            if (Object.keys(prods).length === 0) return;


            // console.log(prods);
            let ids = '';
            for (let key in prods) {
                //拼接88,93,95
                ids += key + ',';
            }
            //干掉最后一个逗号
            ids = ids.substr(0, ids.length - 1);
            let url = 'goods/getshopcarlist/' + ids;

            //发起请求
            this.$ajax.get(url)
                .then(res => {
                    // console.log(res.data);

                    //不通过vue.$set方式添加属性的方法
                    res.data.message.forEach((ele) => {

                            ele.pickNum = prods[ele.id];
                            ele.isPicked = true;

                        })
                        //获取结果放上页面（this的一个属性已经设置了setter）
                        //this.goodsList = res.data.message就触发了setter函数
                        //将赋值过来的对象的所有key，进行遍历，并添加setter
                    this.goodsList = res.data.message;

                    //遍历操作数据
                    // this.goodsList.forEach((ele) => {

                    //     // ele.title = 'abc'; 由于是之前=以后就存在的setter过的属性，所以是响应式

                    //     // if(prods[ele.id]){
                    //     // 通知vue双向数据绑定
                    //     this.$set(ele, 'pickNum', prods[ele.id]);
                    //     this.$set(ele, 'isPicked', false);
                    //     // ele.pickNum = prods[ele.id];
                    //     // ele.isPicked = true;
                    //     // }
                    // })


                })
                .catch(err => console.log(err));

        },
        methods: {
            substract(goods) {
                if (goods.pickNum <= 1) return;
                goods.pickNum--;
                //内存中的数据已经改变
            },
            add(goods) {
                goods.pickNum++;
            },
            del(index) {
                if (window.confirm('亲,这么优惠,再考虑下吧')) {
                    //删除localStorage中的元素
                    tools.del(this.goodsList[index].id);
                    vueBus.$emit('addShopcart', -this.goodsList[index].pickNum, this.goodsList[index].id);
                    this.goodsList.splice(index, 1);

                }
            }
        },
        computed: {
            payment() {
                console.log('computed被执行了');
                //累计件数，总金额
                let count = 0;
                let sum = 0;
                this.goodsList.forEach((ele) => {
                    if (ele.isPicked) {
                        count += ele.pickNum; //累计件数
                        sum += ele.pickNum * ele.sell_price;
                    }
                })

                return {
                    sum,
                    count
                };
            }
        },
        beforeRouteLeave(to, from, next) {
            // 导航离开该组件的对应路由时调用
            //需求:如果当前商品还有未买单的，用户离开时，给予提示
            //如果否，停留在原来的位置
            if (this.goodsList.length != 0) {
                if (window.confirm('亲,您还有商品没有结账,确定,优惠哟!')) {
                    //放行
                    next();
                } else {
                    //继续购买
                    next(false); //取消用户的导航行为
                }
            } else {
                //等于0的情况直接放行
                next();
            }

            // 可以访问组件实例 `this`
        }
}
</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
