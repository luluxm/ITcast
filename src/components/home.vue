<template>
    <div class="tmpl">
        <my-swipe url="getlunbo"></my-swipe>
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link :to="{name:'news.list'}">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link :to="{name:'photo.share'}">
                        <span class="mui-icon mui-icon-email"></span>
                        <div class="mui-media-body">图文分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link :to="{name:'goods.list'}">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品展示</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">留言反馈</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-search"></span>
                        <div class="mui-media-body">搜索资讯</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-phone"></span>
                        <div class="mui-media-body">联系我们</div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
</script>
<style scoped>
/*九宫格 开始*/


/*ul背景白色*/

.mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
    margin-top: 0px;
}

.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    border: 0;
}


/*九宫格结束*/

.mui-icon-home:before,
.mui-icon-email:before,
.mui-icon-chatbubble:before,
.mui-icon-location:before,
.mui-icon-search:before,
.mui-icon-phone:before {
    content: '';
}

.mui-icon-email {
    background-image: url('../static/img/picShare.png');
    /*设置环绕显示，显示出全部背景图片*/
    background-repeat: round;
}

.mui-icon-chatbubble {
    background-image: url('../static/img/goodShow.png');
    /*设置环绕显示，显示出全部背景图片*/
    background-repeat: round;
}

.mui-icon-location {
    background-image: url('../static/img/feedback.png');
    /*设置环绕显示，显示出全部背景图片*/
    background-repeat: round;
}

.mui-icon-search {
    background-image: url('../static/img/search.png');
    /*设置环绕显示，显示出全部背景图片*/
    background-repeat: round;
}

.mui-icon-phone {
    background-image: url('../static/img/callme.png');
    /*设置环绕显示，显示出全部背景图片*/
    background-repeat: round;
}

.mui-icon-home {
    background-image: url('../static/img/news.png');
    /*设置环绕显示，显示出全部背景图片*/
    background-repeat: round;
}

.mui-icon {
    height: 50px;
    width: 50px;
}
</style>
