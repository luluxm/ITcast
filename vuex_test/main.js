import App from './app2.vue';
//引入vue
import Vue from 'vue';


//引入vuex
import Vuex from 'vuex';
//安装插件   未来this.$store能够拿到总体的仓储对象 该对象可以直接.state拿数据

Vue.use(Vuex);

let userOptions = {
    state: { //数据
        users: [{ name: 'jack', age: 18 }, { name: 'rose', age: 17 }]
    },
    mutations: { //发生改变CRUD
        add(state, data) {
            state.users.push(data);
        },
        edit(state, data) {
            state.users[data.index].name = data.name;
        },
        del(state, index) {
            state.users.splice(index, 1);
        }
    },
    actions: { //行为，代码中会涉及到业务 
        addUser({ commit }, user) {
            //content 相当于$store也可以提交.commit .state
            commit('add', user)
        },
        editUser({ commit }, user) {
            commit('edit', user);
        },
        delUser({ commit }, index) {
            commit('del', index);
        }
    },
    getters: { //获取数据,结合computed来一起使用
        users(state) {
            return state.users;
        }
    }
}



//配置仓储的数据
let store = new Vuex.Store({
    modules: {
        //模块名:模块配置
        userOptions,
    }
});


//将该对象配置进Vue实例options中
new Vue({
    el: '#app',
    store,
    render: c => c(App)
})
