import zylbg from "@/assets/zylbg.jpg";
import bybg from "@/assets/bybg.jpg";
import zyltx from "@/assets/zyltx.jpg";
import bytx from "@/assets/bytx.jpg";
export default {
  name: "NavPage",
  data() {
    return {
      nameId: 0,
      firstIn: true,
      loginPage: "/loginPage",
      navList: [
        { path: "/starTelescope", img: "el-icon-view", navItem: "星星望远镜" },
        { path: "/powerStation", img: "el-icon-edit", navItem: "爱心发电站" },
        {
          path: "/productsMarket",
          img: "el-icon-shopping-bag-1",
          navItem: "周边贩售屋",
        },
      ],
      zylbg,
      bybg,
      zyltx,
      bytx,
    };
  },
  components: {},
  mounted() {
    this.nameId = localStorage.getItem("nameId");
    console.log("router", this.$route.path);
    if (this.$route.path === "") this.firstIn = true;
  },
  methods: {
    // 导航栏选择事件
    handleSelect(key, keyPath) {
      this.firstIn = false;
      console.log("handleSelect-key:", key, "handleSelect-keyPath:", keyPath);
    },
    changeBoy(val) {
      localStorage.setItem("nameId", val);
      console.log("changeboy", localStorage.getItem("nameId"));
    },
  },
};