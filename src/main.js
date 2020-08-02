import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
// 引入store，变为全局仓库
import store from "@/store/store";

Vue.config.productionTip = false
Vue.use(ElementUI);

//监听方法是这个哦
Vue.prototype.resetSetItem = function (key, newVal) {
  console.log(newVal);
  if (key === 'nameId') {

      // 创建一个StorageEvent事件
      var newStorageEvent = document.createEvent('StorageEvent');
      const storage = {
          setItem: function (k, val) {
              localStorage.setItem(k, val);

              // 初始化创建的事件
              newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

              // 派发对象
              window.dispatchEvent(newStorageEvent)
          }
      }
      return storage.setItem(key, newVal);
  }
}

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
