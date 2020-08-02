import zylbg from "@/assets/zylbg.jpg";
import bybg from "@/assets/bybg.jpg";
import zyltx from "@/assets/zyltx.jpg";
import bytx from "@/assets/bytx.jpg";
export default {
  name: "FirstIn",
  data() {
    return {
      nameId: 0,
      zylbg,
      bybg,
      zyltx,
      bytx
    };
},
    components: {},
    mounted() {
      this.nameId = localStorage.getItem("nameId");
      console.log("router", this.$route.path);
    }
};