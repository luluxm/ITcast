<template>
    <div>
        <button @click="showUsers">点击查看当前用户数据</button>
    </div>
</template>
<script>
export default {
    data() {
            return {

            }
        }, created() {
            //1:不建议直接使用修改
            // console.log(this.$store.state.users = '1');
            // console.log(this.$store.state.users);
            // 2: 在异步的操作中，会出现问题,第二个参数叫做载荷（payload）：
            // this.$store.commit('add', {
            //     name: 'mike',
            //     age: '18'
            // });
        },
        methods: {

            showUsers() {
                //3:不建议直接获取数据
                // console.log(this.$store.state.users);
            }

        }
}
</script>
<style>
</style>
