<template>
    <div class="tmpl" style="height:100%;">
        <nav-bar title="商品列表"></nav-bar>
        <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :auto-fill="false" ref="loadmore" :bottom-all-loaded="allLoaded" class="mt-loadmore">
            <ul class="mui-table-view mui-grid-view">
                <li v-for="goods in goodsList" :key="goods.id" class="mui-table-view-cell mui-media mui-col-xs-6">
                    <router-link :to="{name:'goods.detail',params:{gid:goods.id} }">
                        <img class="mui-media-object" :src="goods.img_url">
                        <div class="mui-media-body">{{goods.title}}</div>
                        <div class="desc">
                            <div class="sell">
                                <span>￥{{goods.sell_price}}</span>
                                <s>￥{{goods.market_price}}</s>
                            </div>
                            <div class="detail">
                                <div class="hot">
                                    热卖中
                                </div>
                                <div class="count">
                                    剩{{goods.stock_quantity}}件
                                </div>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </mt-loadmore>
        <div>
            <mt-spinner type="double-bounce" v-show="isLoading === 'loading'"></mt-spinner>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                pageindex: 1,
                goodsList: [], //保存商品数据
                allLoaded: false, //允许下拉刷新调用函数
                isLoading: '',
            }
        },
        created() {
            this.$ajax.get('getgoods?pageindex=' + this.pageindex)
                .then(res => {
                    this.pageindex++;
                    this.goodsList = res.data.message;
                })
        },
        methods: {
            handleBottomChange(status) {
                //pull drop  loading
                // console.log(status);
                this.isLoading = status;
            },
            loadBottom() {
                // console.log('loading');

                //发起请求，获取数据，并追加到数组中

                this.$ajax.get('getgoods?pageindex=' + this.pageindex)
                    .then(res => {
                        this.pageindex++;
                        //追加
                        this.goodsList = this.goodsList.concat(res.data.message);

                        //判断如果当前的请求数不是默认的10条，一般认为数据就不足10条，就代码数据完了，但是，正好是10的倍数，会多拉一次

                        if (res.data.message.length != 10) {
                            //数据完了设置为true
                            this.allLoaded = true;
                        }

                        //通知下拉加载完毕，进入下一个状态
                        this.$refs.loadmore.onBottomLoaded();

                    })




            }
        }
}
</script>
<style scoped>
.mt-loadmore {
    margin-bottom: 50px;
}

.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
}
</style>
