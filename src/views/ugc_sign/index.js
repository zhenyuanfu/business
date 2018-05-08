import Vue from "vue";
import "../../utils/flexible";
import App from "./app.vue";
import "../../utils/common";
// Vue.config.debug = false;
// 关闭浏览器vue的提示信息
Vue.config.devtools = false;
Vue.config.productionTip = false;
window.vue = new Vue({
    // el: "#app",
    render: h => h(App)
});
document.addEventListener('JSSDKReady', () => {
    vue.$mount("#app");
}, false)