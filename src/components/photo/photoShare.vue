<template>
    <div class="tmpl">
        <nav-bar title="图片分享"></nav-bar>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="category in categorys" :key="category.id">
                    <a href="javascript:;" @click="getPicByCategoryId(category.id)">{{category.title}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="pic in pics" :key="pic.id">
                    <router-link :to="{ name:'photo.detail',params:{id:pic.id} }">
                        <img v-lazy="pic.img_url">
                        <p>
                            <span>{{pic.title}}</span>
                            <br>
                            <span>{{pic.zhaiyao}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                //图片分类
                categorys: [],
                //图片数据
                pics: []
            }
        },
        created() {
            //获取分类信息
            // this.$ajax.get('getimgcategory')
            // .then(res => {
            //     this.categorys = res.data.message;
            //     //将全部添加到数组的首位,后端不能改，只能前端该了...
            //     this.categorys.unshift({
            //         id: 0,
            //         title: '全部'
            //     });
            // })
            // .catch(err => console.log('获取图片分类失败', err));
            //创建组件的时候，获取全部的图片
            // this.getPicByCategoryId(0);
            // 
            // 
            // 合并请求的方式

            this.$ajax.all([this.$ajax.get('getimgcategory'), this.getPicByCategoryId(0)])
                .then(this.$ajax.spread(res => {
                    //只处理请求1的后续操作
                    this.categorys = res.data.message;
                    this.categorys.unshift({
                        id: 0,
                        title: '全部'
                    });

                }))
                //该catch可以处理两个请求中的异常，但是成功后的操作各自处理
                .catch(err => console.log('图片请求失败', err));



        }, methods: {
            getPicByCategoryId(id) {
                //当前的函数被调用以后返回一个promise对象，记录着执行的成功与否，后续才能then
                return this.$ajax.get('getimages/' + id).then(res => this.pics = res.data.message);
            }
        }
}
</script>
<style>
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}


/*图片懒加载 mint-ui*/

image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
}
</style>
