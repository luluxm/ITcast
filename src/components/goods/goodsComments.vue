<template>
    <div class="tmpl">
        <comment :cid="gid"></comment>
    </div>
</template>
<script>
export default {
    //创建父组件的时候获取路由参数gid
    //将gid传递给子组件，先有父后有子
    data() {
        return {
            gid: this.$route.query.gid
        }
    }
}
</script>
<style>
</style>
