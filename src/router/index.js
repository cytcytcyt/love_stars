import Vue from 'vue';
import VueRouter from 'vue-router';
// import App from "@/App";
import ResignInfo from '@/components/ResignInfoComponent/ResignInfo.vue';
import ChooseIdolPage from '@/components/ChooseIdolPageComponent/ChooseIdolPage.vue';
import LoginPage from '@/components/LoginPageComponent/LoginPage.vue';
import PowerStation from '@/components/PowerStationComponent/PowerStation.vue';
import ProductsMarket from '@/components/ProductsMarketComponent/ProductsMarket.vue';
import StarTelescope from '@/components/StarTelescopeComponent/StarTelescope.vue';
import ElecForLove from '@/components/ElecForLoveComponent/ElecForLove.vue';
import EssayStorage from '@/components/EssayStorageComponent/EssayStorage.vue';
import PaintingStorage from '@/components/PaintingStorageComponent/PaintingStorage.vue';
import EssayInfo from '@/components/EssayInfoComponent/EssayInfo.vue';
import CommentArea from '@/components/CommentAreaComponent/CommentArea.vue';
import FirstIn from '@/components/FirstInComponent/FirstIn.vue';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      name: 'LoginPage',
      path: '/LoginPage',
      component: LoginPage,
    },
    {
      name: 'FirstIn',
      path: '/',
      component: FirstIn,
    },
    {
      name: 'ChooseIdolPage',
      path: '/ChooseIdolPage',
      component: ChooseIdolPage,
    },
    {
      name: 'ResignInfo',
      path: '/ResignInfo',
      component: ResignInfo,
    },
    {
      name: 'PowerStation',
      path: '/PowerStation',
      component: PowerStation,
    },
    {
      name: 'ProductsMarket',
      path: '/ProductsMarket',
      component: ProductsMarket,
    },
    {
      name: 'StarTelescope',
      path: '/StarTelescope',
      component: StarTelescope,
    },
    {
      name: 'PowerStation',
      path: '/PowerStation',
      component: PowerStation,
      children: [
        {
          name: 'ElecForLove',
          path: '/ElecForLove',
          component: ElecForLove,
        },
        {
          name: 'EssayStorage',
          path: '/EssayStorage',
          component: EssayStorage,
        },
        {
          name: 'PaintingStorage',
          path: '/PaintingStorage',
          component: PaintingStorage,
        },
      ],
    },
    {
      name: 'EssayInfo',
      path: '/EssayInfo',
      component: EssayInfo,
    },
    {
      name: 'CommentArea',
      path: '/CommentArea',
      component: CommentArea,
    },
  ],
});
