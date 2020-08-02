import zyltx from '@/assets/zyltx.jpg'
  import bytx from '@/assets/bytx.jpg'
   import dfcw1 from '@/assets/dfcw1.jpg'
   import dfcw2 from '@/assets/dfcw2.jpg'
   import bjcw1 from '@/assets/bjcw1.jpg'
   import bjcw2 from '@/assets/bjcw2.jpg'
   import wqzb from '@/assets/wqzb.jpg'
   import yw from '@/assets/yw.jpg'
   import ws from '@/assets/ws.jpeg'
   import bxb from '@/assets/bxb.jpg'
   import bxb2 from '@/assets/bxb2.jpg'
   import jjs from '@/assets/jjs.jpg'
   import pljkj from '@/assets/pljkj.jpg'
   import qchyj from '@/assets/qchyj.jpg'
   import qchyj2 from '@/assets/qchyj2.jpg'
   import zb1 from '@/assets/zb1.jpg'

export default {
  name: 'StarTelescope',
  data(){
    return{
      zyltx,bytx,
      reverse: false,
      activities:[],
      modelActivities1:[
      {
          icon:'el-icon-star-off',
          city:'上海',
          location:'龙湖天街',
          name:'欧莱雅线下见面会',
          time: '2020-07-22',
          pic:[]
      }, {
        icon:'el-icon-star-on',
        city:'',
        location:'',
        name:'《智族GQ》预售',
        time: '2020-06-22',
          pic:[]
      }, {
          icon:'el-icon-star-on',
          city:'',
          location:'味全tb直播间',
          name:'618直播',
          time: '2020-06-16',
          pic:[wqzb]
      },{
          icon:'el-icon-star-on',
          city:'',
          location:'',
          name:'《T》五月刊预售',
          time: '2020-05-08',
          pic:[]
      }, {
        icon:'el-icon-star-on',
        city:'云南',
        location:'大理',
        name:'《2020年五四青年节特别节目—奋斗的青春最美丽》',
        time: '2020-05-04',
        pic:[ws]
      }, {
          icon:'el-icon-star-on',
          city:'北京',
          location:'',
          name:'《希望搜索词》云连线',
          time: '2020-04-24',
          pic:[]
      }, {
          icon:'el-icon-star-on',
          city:'上海',
          location:'',
          name:'《叛逆者》拍摄',
          time:'2020-04-17',
          pic:[]
      }, {
          icon:'el-icon-star-on',
          city:'',
          location:'',
          name:'《悦游》预售',
          time: '2020-03-26',
          pic:[]
      }, {
          icon:'el-icon-star-on',
          city:'上海',
          location:'',
          name:'东方卫视元宵特别节目',
          time: '2020-02-08',
          pic:[dfcw1,dfcw2]
      }, {
        icon:'el-icon-star-on',
        city:'北京',
        location:'中央电视台',
        name:'2020年春节联欢晚会',
        time: '2020-01-24',
        pic:[bjcw1,bjcw2]
      },{
          icon:'el-icon-star-on',
          city:'上海',
          location:'梅赛德斯奔驰',
          name:'阅文原创盛典',
          time: '2020-01-06',
          pic:[yw]
        }],
      modelActivities2:[
        {
          icon:'el-icon-star-off',
          city:'',
          location:'',
          name:'《沉默的真相》首播',
          time: '2020-08-04',
          pic:[]
        }, {
          icon:'el-icon-star-off',
          city:'上海',
          location:'龙湖天街',
          name:'兰蔻线下见面会',
          time: '2020-07-22',
          pic:[]
        }, {
          icon:'el-icon-star-on',
          city:'',
          location:'',
          name:'电影《银河补习班》北京见面会',
          time: '2020-07-15',
          pic:[bxb,bxb2]
        }, {
          icon:'el-icon-star-on',
          city:'',
          location:'佳洁士tb直播间',
          name:'618直播',
          time: '2020-06-16',
          pic:[jjs,zb1]
        },{
          icon:'el-icon-star-on',
          city:'',
          location:'',
          name:'doki聊天室做客',
          time: '2020-05-09',
          pic:[]
        }, {
          icon:'el-icon-star-on',
          city:'北京',
          location:'',
          name:'央视五四青年晚会录制',
          time: '2020-05-02',
          pic:[]
        }, {
          icon:'el-icon-star-on',
          city:'北京',
          location:'',
          name:'《青春环游记》录制',
          time: '2020-04-09',
          pic:[qchyj,qchyj2]
        }, {
          icon:'el-icon-star-on',
          city:'上海',
          location:'',
          name:'《叛逆者》拍摄',
          time:'2020-04-17',
          pic:[]
        }, {
          icon:'el-icon-star-on',
          city:'江苏',
          location:'南京',
          name:'《蓬莱间》开机',
          time: '2020-03-15',
          pic:[pljkj]
        }, {
          icon:'el-icon-star-on',
          city:'上海',
          location:'',
          name:'东方卫视元宵特别节目',
          time: '2020-02-08',
          pic:[]
        }, {
          icon:'el-icon-star-on',
          city:'北京',
          location:'中央电视台',
          name:'2020年春节联欢晚会',
          time: '2020-01-24',
          pic:[]
        },{
          icon:'el-icon-star-on',
          city:'上海',
          location:'梅赛德斯奔驰',
          name:'阅文原创盛典',
          time: '2020-01-06',
          pic:[]
        }],
      pickerOptions: {
        shortcuts: [{
          text: '本月',
          onClick(picker) {
            picker.$emit('pick', [new Date(), new Date()]);
          }
        }, {
          text: '今年至今',
          onClick(picker) {
            const end = new Date();
            const start = new Date(new Date().getFullYear(), 0);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近六个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 6);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      listQuery:{
        month: '',
        city:'',
      },
      cities:[{
        index:'1',
        label:'上海'
      },{
        index:'2',
        label:'北京'
      },{
        index:'3',
        label:'深圳'
      },{
        index:'4',
        label:'广州'
      },{
        index:'5',
        label:'武汉'
      }],
      dfcw1,dfcw2,bjcw1,bjcw2,wqzb,ws,
      bxb,bxb2,jjs,pljkj,qchyj,qchyj2,zb1,
      nameId:0,
      curPage:1,
      pageSize:3
    }
  },
  watch:{
    reverse(val){
      console.log('val',val)
      this.activities=this.activities.reverse();
    }
  },
  mounted(){
    this.nameId=localStorage.getItem('nameId')
    console.log('tete',this.nameId)
    if(this.nameId==='1') {
      this.activities = this.modelActivities1
      console.log(1, this.activities)
    }
    else
      this.activities=this.modelActivities2
  },
  methods:{
    changeBoy(val){
      console.log('change', val)
      if(val === 1)
        this.activities = this.modelActivities1
      else
        this.activities=this.modelActivities2
    },
    select(){
      this.curPage=1
      var moment = require('moment');
      var monthSearchActivities=[]
      var searchActivities=[]

      if(this.listQuery.month === ""){
        console.log(this.activities)
        // this.activities=
        if(this.listQuery.city === '')
          console.log(this.activities)
          // this.activities=this.activities
        else {
          this.activities.forEach(item=>{
            if(item.city === this.listQuery.city){
              searchActivities.push({...item})
            }
          })
          this.activities=searchActivities
        }
      }else {
        this.activities.forEach(item=>{
          if(moment(item.time).isAfter(this.listQuery.month[0])
                  &&
                  moment(item.time).isBefore(this.listQuery.month[1])){
            monthSearchActivities.push({...item})
          }
        })
        this.activities=monthSearchActivities

        if(this.listQuery.city === '')
          this.activities=monthSearchActivities
        else {
          this.activities.forEach(item=>{
            if(item.city === this.listQuery.city){
              searchActivities.push({...item})
            }
          })
          this.activities=searchActivities
        }
      }
    },
    handleCurrentChange(val) {
      this.curPage=val
    }
  }

}