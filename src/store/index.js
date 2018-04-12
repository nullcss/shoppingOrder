import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    addressList: [{
        id: '1',
        name: '张三',
        tel: '13000000000',
        city:"浙江省杭州市西湖区",
        area:"文三路 138 号东方通信大厦 7 楼 501 室"
      },
      {
        id: '2',
        name: '李四',
        tel: '1310000000',
        city:"浙江省杭州市拱墅区",
        area:"莫干山路 50 号"
      }
    ],
    newaddress:{},
    editaddress:{},
    submitInfo:{}
  },
  mutations: {
    chooseAddress(state,val) {
      state.newaddress = val
    },
    add(state,val) {
      val.id = state.addressList.length + 1
      state.newaddress = val
      state.addressList.unshift(val)
    },
    edit(state, val){
      state.editaddress = val
    },
    editAddress(state, val) {
      let index = state.addressList.findIndex(item =>  val.id == item.id)
      state.addressList[index] = val
    },
    delete(state, val) {
      let index = state.addressList.findIndex(item =>  val.id == item.id)
      state.addressList.splice(state.addressList[index],1)
    },
    submitInfo(state, val) {
      state.submitInfo = val
      state.submitInfo.address = state.newaddress
    }
  }
})

export default store
