<template>
    <div class="tmpl">
        <nav-bar title="图文详情"></nav-bar>
        <div class="photo-title">
            <p>{{info.title}}</p>
            <span>发起日期：{{info.add_time | formatDate}}</span>
            <span>{{info.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(pic,index) in pics" :key="index">
                <img class="preview-img" :src="pic.src" height="100" @click="$preview.open(index, pics)">
            </li>
        </ul>
        <div class="photo-desc">
            <p v-html="info.content"></p>
        </div>
        <!-- 传递变量 -->
        <comment :cid="id"></comment>
    </div>
</template>
<script>
export default {
    data() {
        return {
            pics: [], //缩略图
            info: {}, //详情信息
            id: '', //图文id
        }
    }, created() {
        //1:获取路由参数
        this.id = this.$route.params.id;
        //2:发起两次请求
        this.$ajax.all([this.$ajax.get('getthumimages/' + this.id), this.$ajax.get('getimageInfo/' + this.id)])
            .then(this.$ajax.spread((imgRes, infoRes) => {
                this.pics = imgRes.data.message;

                this.pics.forEach(function(pic) {
                    pic.w = 300;
                    pic.h = 300;
                })


                this.info = infoRes.data.message[0];
            }))
            .catch(err => console.log('图文数据异常', err));
    }
}
</script>
<style scoped>
li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
}

.mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
}

.mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
}

.photo-desc p {
    font-size: 18px;
}

.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    padding: 2 2;
}
</style>
