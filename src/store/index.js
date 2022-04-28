import Vue from 'vue'
import Vuex from 'vuex'
import UserBiz from '@/biz/Rbac/User'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        userInfo: {}
    },
    mutations: {
        SET_USERINFO(state, balance) {
            state.userInfo = {balance};
        },
    },
    actions: {
        async getUserInfo(context) {
            let balance = await UserBiz.getUserInfo();
            context.commit('SET_USERINFO', balance);
        },
    },
    modules: {}
})
