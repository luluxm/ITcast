<template>
    <div>
        <input type="text" name="" v-model="user.name">
        <input type="text" name="" v-model="user.age">
        <button @click="addUser">添加用户</button>
        <ul>
            <li v-for="(user,index) in getUsers" :key="index">
                {{user.name}} {{user.age}} <a @click="edit(index)">编辑我</a> <a @click="del(index)">删除我</a>
            </li>
        </ul>
        <!-- 模块方式以后，只有单独获取state的数据需要额外增加模块名 -->
        {{$store.state.userOptions.users}}
    </div>
</template>
<script>
export default {
    data() {
            return {
                user: {} //用来添加用户
            }
        },
        methods: {
            addUser() {
                //分发,有时处理异步任务的时候，$store直接commit，该行为无法完成记录，这种方式是ok的
                this.$store.dispatch('addUser', this.user);
            },
            del(index) {
                this.$store.dispatch('delUser', index);
            },
            edit(index) {
                //编译的时候，由于添加或者删除元素了，索引就会不准确，最好使用id来编辑
                this.$store.dispatch('editUser', {
                    index,
                    name: '已经修改'
                });
            }
        },
        computed: {
            getUsers() { //结合computed优雅的获取数据
                return this.$store.getters.users;
            }
        }
}
</script>
<style>
</style>
