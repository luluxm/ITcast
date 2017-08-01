<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in pictures" :key="index">
                <a :href="item.url||''">
                    <img :src="item.img||item.src">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    props: ['url'],
    data() {
        return {
            //存放轮播图
            pictures: [],
        }
    },
    created() {
        //var self = this;  在下方使用self，箭头函数替代了这个事
        //vue-resource的then的内部的this是VueComponent对象
        this.$ajax.get(this.$props.url)
            .then((res) => {
                this.pictures = res.data.message;
            })
            .catch(function(err) {
                console.log(err);
            })
    }
}
</script>
<style scoped>
.mint-swipe-item img {
    width: 100%;
    height: 220px;
}

.mint-swipe {
    height: 220px;
}
</style>
