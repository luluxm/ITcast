<template>
    <div class="tmpl">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a @click="goback">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="newMsg"></textarea>
                </li>
                <li>
                    <mt-button type="primary" @click="sendMsg" size="large">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(msg,index) in msgs" :key="index">
                    {{msg.user_name}}：{{msg.content}} {{msg.add_time|formatDate}}
                </li>
            </ul>
            <mt-button type="danger" @click="loadMore" size="large" plain>加载更多按钮</mt-button>
        </div>
    </div>
</template>
<script>
import {
    Indicator
} from 'mint-ui';

export default {
    data() {
            return {
                pageindex: 1, //默认请求页码是1
                //存放评论数据
                msgs: [],
                id: this.$props.cid, //从父组件获取的默认值
                newMsg: '', //发表的新的评论
            }
        },
        props: ['cid'],
        //创建组件的时候获取评论数据，通过cid
        created() {
            this.loadFirst();

        },
        methods: {
            loadFirst() {
                //将pageindex值为1
                this.pageindex = 1;
                this.$ajax.get('getcomments/' + this.id + '?pageindex=' + this.pageindex)
                    .then(res => {
                        this.pageindex++; //从1加到2
                        this.msgs = res.data.message;
                    });
            },
            loadMore() {
                this.$ajax.get('getcomments/' + this.id + '?pageindex=' + this.pageindex)
                    .then(res => {
                        //从2加到3
                        this.pageindex++;
                        this.msgs = this.msgs.concat(res.data.message);
                    });
            },
            sendMsg() {

                //显示正在拼命发送中
                Indicator.open({
                    text: '拼命发送中...',
                    spinnerType: 'fading-circle'
                });


                //获取到发表的数据
                let msg = this.newMsg;




                this.$ajax.post('postcomment/' + this.id, {
                        content: msg
                    }, {
                        //axios做了优化，如果transformRequest返回的是字符串，默认将content-type改为wwww
                        // headers: { //设置请求数据的头
                        //     'content-type': 'application/x-www-form-urlencoded'
                        // },
                        //将原来发送json字符串数据进行转换成键=值&键=值
                        transformRequest: function(data) {
                            var tmp = '';
                            for (var key in data) {
                                tmp += key + '=' + data[key] + '&';
                            }
                            //去除最后的&符号   content=xxx&age=1234
                            return tmp.substr(0, tmp.length - 1);
                        }
                    })
                    .then(res => {
                        //{"status":0,"message":"评论提交成功"}
                        // console.log(res); 

                        //发送消息成功,情况消息框
                        this.newMsg = '';
                        //关闭拼命发送中。。
                        Indicator.close();

                        this.loadFirst();


                    })
                    .catch(err => console.log('发表评论异常', err));
            },
            //给a标签添加返回的功能
            goback() {
                this.$router.go(-1);
            }
        }
}
</script>
<style scoped>
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}
</style>
