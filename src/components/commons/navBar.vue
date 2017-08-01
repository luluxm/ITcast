<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="goback"></a>
            <h1 class="mui-title">{{title}}</h1>
        </header>
    </div>
</template>
<script>
export default {
    methods: {
        goback() {
            this.$router.go(-1)
        }
    },
    //props就相当于自己声明了自己的data:{title} ,由外部在赋值的时候完成声明
    props: ['title'],
    // //组件内使用子组件需要先引入，再声明，太麻烦..不如使用全局的声明组件的方式
    // components:{

    // }
}
</script>
<style scoped>
.mui-bar {
    position: relative;
}
</style>
