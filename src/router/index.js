import Vue from 'vue'
import VueRouter from 'vue-router'
// import App from "@/App";
import ResignInfo from "@/components/ResignInfo";
import ChooseIdolPage from "@/components/ChooseIdolPage";
import LoginPage from "@/components/LoginPage";
import PowerStation from "@/components/PowerStation";
import ProductsMarket from "@/components/ProductsMarket";
import StarTelescope from "@/components/StarTelescope";
import ElecForLove from "@/components/ElecForLove";
import EssayStorage from "@/components/EssayStorage";
import PaintingStorage from "@/components/PaintingStorage";
import EssayInfo from "@/components/EssayInfo";
import CommentArea from "@/components/CommentArea";

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
