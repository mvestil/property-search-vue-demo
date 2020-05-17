import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { Slider } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./filters";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Slider);

new Vue({
  router,
  name: "app",
  render: (h) => h(App),
}).$mount("#app");
