import Vue from 'vue'
import VueRouter from 'vue-router'
// import App from "@/App";
import ResignInfo from "@/components/ResignInfoComponent/ResignInfo";
import ChooseIdolPage from "@/components/ChooseIdolPageComponent/ChooseIdolPage";
import LoginPage from "@/components/LoginPageComponent/LoginPage";
import PowerStation from "@/components/PowerStationComponent/PowerStation";
import ProductsMarket from "@/components/ProductsMarketComponent/ProductsMarket";
import StarTelescope from "@/components/StarTelescopeComponent/StarTelescope";
import ElecForLove from "@/components/ElecForLoveComponent/ElecForLove";
import EssayStorage from "@/components/EssayStorageComponent/EssayStorage";
import PaintingStorage from "@/components/PaintingStorageComponent/PaintingStorage";
import EssayInfo from "@/components/EssayInfoComponent/EssayInfo";
import CommentArea from "@/components/CommentAreaComponent/CommentArea";

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            name: 'LoginPage',
            path: '/LoginPage',
            component: LoginPage
        },
        {
            name: 'ChooseIdolPage',
            path: '/ChooseIdolPage',
            component: ChooseIdolPage
        },
        {
            name: 'ResignInfo',
            path: '/ResignInfo',
            component: ResignInfo
        },
        {
            name: 'PowerStation',
            path: '/PowerStation',
            component: PowerStation
        },
        {
            name: 'ProductsMarket',
            path: '/ProductsMarket',
            component: ProductsMarket
        },
        {
            name: 'StarTelescope',
            path: '/StarTelescope',
            component: StarTelescope
        },
        {
            name: 'PowerStation',
            path: '/PowerStation',
            component: PowerStation,
            children:  [
        {
            name: 'ElecForLove',
            path: '/ElecForLove',
            component: ElecForLove
        },
        {
            name: 'EssayStorage',
            path: '/EssayStorage',
            component: EssayStorage
        },
        {
            name: 'PaintingStorage',
            path: '/PaintingStorage',
            component: PaintingStorage
        }
    ]},
        {
            name: 'EssayInfo',
            path: '/EssayInfo',
            component: EssayInfo
        },{
            name: 'CommentArea',
            path: '/CommentArea',
            component: CommentArea
        }
]
})
