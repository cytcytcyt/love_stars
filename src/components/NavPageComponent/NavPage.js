import zylbg from '@/assets/zylbg.jpg';
import bybg from '@/assets/bybg.jpg';
import zyltx from '@/assets/zyltx.jpg';
import bytx from '@/assets/bytx.jpg';
import swal from 'sweetalert2';
export default {
  name: 'NavPage',
  data() {
    return {
      nameId: 0,
      userName: "",
      loginPage: '/loginPage',
      navList: [
        { path: '/starTelescope', img: 'el-icon-view', navItem: '星星望远镜' },
        { path: '/powerStation', img: 'el-icon-edit', navItem: '爱心发电站' },
        {
          path: '/productsMarket',
          img: 'el-icon-shopping-bag-1',
          navItem: '周边贩售屋',
        },
      ],
      zylbg,
      bybg,
      zyltx,
      bytx,
      isLogin: false
    };
  },
  components: {},
  mounted() {
    this.userName = localStorage.getItem('nickName');
    if(this.userName!=="") {
      this.isLogin = true;
    }
    window.addEventListener('setItem', () => {
      if(localStorage.getItem('nickName')) {
        this.userName = localStorage.getItem('nickName');
        if(this.userName!=="") {
          this.isLogin = true;
          console.log(this.isLogin);
        }
      }
    });
    this.nameId = localStorage.getItem('nameId');
    console.log('router', this.$route.path);
    if (this.$route.path === '') this.firstIn = true;
  },
  methods: {
    // 导航栏选择事件
    handleSelect(key, keyPath) {
      this.firstIn = false;
      console.log('handleSelect-key:', key, 'handleSelect-keyPath:', keyPath);
    },
    changeBoy(val) {
      // localStorage.setItem("nameId", val);
      this.resetSetItem('nameId', val);
      console.log('changeboy', localStorage.getItem('nameId'));
    },
    logout() {
      localStorage.removeItem("nickName")
      this.userName=""
      this.isLogin=false;
      swal('已登出')
      this.$router.push("/");
    }
  },
};
