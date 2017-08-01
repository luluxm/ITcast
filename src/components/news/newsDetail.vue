<template>
    <div class="tmpl">
        <nav-bar :title="title"></nav-bar>
        <div class="news-title">
            <p v-text="newsInfo.title"></p>
            <div>
                <span>{{newsInfo.click}}次点击</span>
                <span>分类:民生经济1</span>
                <span>添加时间:{{newsInfo|formatDate}}</span>
            </div>
        </div>
        <!-- 这里只是在设置给模板放什么内容，不是立刻就放上去了 -->
        <div class="news-content" v-html="newsInfo.content">
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                title: '',
                //新闻详情数据对象
                newsInfo: {},
            }
        },
        created() {
            //获取新闻id
            let id = this.$route.query.id;
            //发起请求  baseURL->  http://webhm.top:8899/api/getnew/
            this.$ajax.get('getnew/' + id)
                .then(res => this.newsInfo = res.data.message[0])
                .catch(err => console.log(err));
        },
        beforeRouteEnter(to, from, next) {
            let title = '';
            //news.detail || goods.detail
            if (from.name == 'news.list') {
                title = '新闻详情';
            } else if (from.name == 'goods.detail') {
                title = '商品详情';
            }
            console.log(from.name);
            next(next(vm => {
                // 通过 `vm` 访问组件实例 就是未来的this
                vm.title = title;
            }));
            //不next就卡主了

            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当钩子执行前，组件实例还没被创建
        }
}
</script>
<style scoped>
.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
}

.news-title span {
    margin-right: 30px;
}

.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}


/*主体文章的左右距离*/

.news-content {
    padding: 10 5;
}
</style>
