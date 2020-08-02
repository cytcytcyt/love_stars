import zyltx from '@/assets/zyltx.jpg';
import bytx from '@/assets/bytx.jpg';
export default {
  name: 'ChooseIdolPage',
  data() {
    return {
      zyltx,
      bytx,
      isShow: true,
    };
  },
  methods: {
    selectBoy(val) {
      localStorage.setItem('nameId', val);
      console.log('choose');
      this.isShow = false;
    },
  },
};
