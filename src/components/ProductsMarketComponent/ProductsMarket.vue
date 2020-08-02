<template>
  <div>
    <el-row class="top-bar">
      <el-col :span="6">
        <el-select v-model="productType" placeholder="请选择商品类型" clearable>
          <el-option
            v-for="item in productTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-input v-model="productInfo" placeholder="请输入搜索内容"></el-input>
      </el-col>
      <el-col :span="3" class="search-button">
        <el-button icon="el-icon-search" type="warning" circle @click="select">
          <!--搜索按钮-->
        </el-button>
      </el-col>
      <el-col :span="7" class="my-pocket">
        <el-button type="warning" round @click="drawer=true">我的购物袋</el-button>
      </el-col>
    </el-row>
    <el-row class="market">
      <el-col
        :span="6"
        v-for="(item,index) in shopItems.slice((curPage-1)*pageSize,curPage*pageSize)"
        :key="index"
        style="margin:2% 4%"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.imgurl" class="image" />
          <div style="padding: 20px;">
            <span class="name">{{item.name}}</span>
            <br />
            <span class="price">￥{{item.price}}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="addToPocket(item)">加入购物袋</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="pagination-container">
      <el-pagination
        background
        :hide-on-single-page="true"
        :current-page="curPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="shopItems.length"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <el-drawer class="pocket" size="50%" :visible.sync="drawer" direction="ttb">
      <el-table
        class="products-table"
        height="200"
        :data="boughtProducts"
        :row-class-name="tableRowClassName"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="100"></el-table-column>
        <el-table-column align="center" prop="name" label="商品名称" width="390"></el-table-column>
        <el-table-column align="center" prop="price" label="价格/元" width="200"></el-table-column>
        <el-table-column align="center" prop="num" label="数量" width="200"></el-table-column>
      </el-table>
      <el-row class="bottom-buttons">
        <span class="total-money">共 &nbsp;&nbsp;{{totalMoney}}&nbsp;&nbsp; 元</span>
        <el-button type @click="deleted" round>删除</el-button>
        <el-button type @click="computed" round>结算</el-button>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "ProductsMarket",
  data() {
    return {
      productType: "",
      productTypes: [
        {
          value: 1,
          label: "海报",
        },
        {
          value: 2,
          label: "写真集",
        },
        {
          value: 3,
          label: "徽章",
        },
        {
          value: 4,
          label: "帆布袋",
        },
        {
          value: 5,
          label: "钥匙扣",
        },
      ],
      productInfo: "",
      pocketMoney: 100000000000,
      shopItems: [],
      shopItemList: [
        {
          imgurl:
            "http://p7.itc.cn/q_70/images03/20200625/7aa025d76a2b4f5eb56d052c5fcda94e.jpeg",
          name: "KFC日向夏海报",
          price: 10,
          type: 1,
        },
        {
          imgurl:
            "http://wx4.sinaimg.cn/orj360/9a0a99eely1gg9hp41wdtj20u01hc4e6.jpg",
          name: "KFC中国风海报",
          price: 15,
          type: 1,
        },
        {
          imgurl:
            "http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvOTAzMDQ3OTcvVEIyWTRJNXdCeVdCdU5rU21GUFhYWGd1VlhhXyEhOTAzMDQ3OTckOQ.jpg",
          name: "沈巍q版钥匙扣",
          price: 20,
          type: 5,
        },
        {
          imgurl:
            "http://up.img.heidiancdn.com/o_1d80qp4e2bkn1rb1im0f0vtf303.jpg?imageView2/2/w/1200/ignore-error/1",
          name: "《DEPART》写真集",
          price: 200,
          type: 2,
        },
        {
          imgurl:
            "http://img14.360buyimg.com/n7/jfs/t23689/66/917416745/127255/80cf9eff/5b495391N2c1b8bd9.jpg",
          name: "沈巍帆布袋",
          price: 50,
          type: 4,
        },
        {
          imgurl:
            "https://wx3.sinaimg.cn/mw690/007bZ7Vvgy1g4lybrjqhdj30mt0k1wls.jpg",
          name: "镇魂一周年写真集",
          price: 180,
          type: 2,
        },
        {
          imgurl:
            "https://wx3.sinaimg.cn/mw690/007bZ7Vvgy1g3zyeu0103j30u00u00vp.jpg",
          name: "【当夏依旧】手机壳",
          price: 30,
          type: 0,
        },
        {
          imgurl:
            "http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTIvMjM3MDMzMzQ4MC9UQjIwNW9ma3Bvb0JLTmpTWkZQWFhYYTJYWGFfISEyMzcwMzMzNDgwJDk.jpg",
          name: "镇魂徽章套组",
          price: 40,
          type: 3,
        },
        {
          imgurl:
            "http://images.china.cn/site1007/2019-08/22/5a71c69b-a551-44eb-90ec-7bd98eaf92e5.jpg",
          name: "【我和我的祖国】海报",
          price: 20,
          type: 1,
        },
      ],
      curPage: 1,
      pageSize: 6,
      drawer: false,
      multipleTable: [],
      boughtProducts: [],
      totalMoney: 0,
    };
  },
  mounted() {
    this.shopItems = this.shopItemList;
  },
  methods: {
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 1) return "warning-row";
      return "";
    },
    select() {
      this.curPage = 1;
      var typeSearchItems = [];
      var searchItems = [];
      console.log("this.productInfo", this.productInfo);
      console.log("this.productType", this.productType);
      if (this.productType !== "") {
        this.shopItemList.forEach((item) => {
          console.log("item.type", item.type);
          if (item.type === this.productType) {
            typeSearchItems.push({ ...item });
            console.log("typeSearchItems", typeSearchItems);
          }
        });
        this.shopItems = typeSearchItems;
        console.log("this.shopItems", this.shopItems);
      }
      if (this.productInfo !== "") {
        this.shopItems.forEach((item) => {
          console.log("item", item.name.indexOf(this.productInfo));
          if (item.name.indexOf(this.productInfo) !== -1) {
            searchItems.push({ ...item });
          }
        });
        this.shopItems = searchItems;
      }
    },
    handleCurrentChange(val) {
      this.curPage = val;
    },
    addToPocket(val) {
      if (this.boughtProducts.length !== 0) {
        var product = this.boughtProducts.find(
          (item) => item.name === val.name
        );
        if (product !== undefined) product.num += 1;
        else {
          val.num = 1;
          this.boughtProducts.push({ ...val });
        }
      } else {
        val.num = 1;
        this.boughtProducts.push({ ...val });
      }
    },
    handleSelectionChange(val) {
      this.multipleTable = val;
      this.totalMoney = 0;
      this.multipleTable.forEach((item) => {
        console.log(item.price, item.num);
        this.totalMoney += item.price * item.num;
      });
      console.log("val", val);
    },
    deleted() {
      this.multipleTable.forEach((MTitem) => {
        this.boughtProducts.forEach((BPitem) => {
          if (MTitem.name === BPitem.name) {
            this.boughtProducts.splice(this.boughtProducts.indexOf(BPitem), 1);
          }
        });
      });
    },
    computed() {
      // this.multipleTable.forEach(item=>)
    },
  },
};
</script>

<style lang="scss" scoped>
.top-bar {
  padding: 30px;
}
.search-button {
  text-align: center;
}
.my-pocket {
  text-align: right;
}
.market {
  padding: 20px;
}
::v-deep .el-card,
.el-message {
  border-radius: 7px;
  overflow: hidden;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
  height: 335px;
  object-fit: contain;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.pocket {
  margin: auto;
  width: 65%;
  border-radius: 0px 0px 15px 15px;
}
::v-deep .el-drawer__header {
  margin: 0px;
  padding: 10px 20px 0;
}
::v-deep .el-drawer {
  top: 0;
  height: 70%;
}
.products-table {
  width: 90%;
  margin: auto;
}
::v-deep .el-table::before {
  height: 0;
}
::v-deep .warning-row {
  background: oldlace;
}
.total-money {
  margin: 5%;
  font-size: 1.5rem;
  font-family: fantasy;
}
.bottom-buttons {
  width: 100%;
  position: absolute;
  bottom: 0%;
  float: right;
  padding: 2.5%;
  text-align: right;
}
.name {
  font-size: 1.3em;
  color: #607090;
}
.price {
  font-size: larger;
  position: relative;
  top: 13px;
}
.pagination-container {
  width: 60%;
  position: absolute;
  bottom: 50px;
  text-align: center;
}
</style>
