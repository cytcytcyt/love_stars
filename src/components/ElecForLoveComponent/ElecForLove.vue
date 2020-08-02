<template>
  <div>
    <el-button-group>
      <el-button type="warning" plain @click="show=1">
        <i class="el-icon-tickets"></i>文字
      </el-button>
      <el-button type="warning" plain @click="show=2">
        <i class="el-icon-picture"></i>图片
      </el-button>
      <el-button type="warning" plain @click="show=1">
        <i class="el-icon-document">长文章</i>
      </el-button>
    </el-button-group>
    <el-row class="publish-container" v-if="show===1">
      <el-input placeholder="请输入标题" v-model="shortArticle.title">
        <template slot="prepend">标题:</template>
      </el-input>
      <el-input
        type="textarea"
        placeholder="请输入短文"
        v-model="shortArticle.article"
        maxlength="500"
        show-word-limit
      />
      <el-input placeholder="请选择标签">
        <template slot="prepend">
          <i class="el-icon-price-tag"></i>
        </template>
        <el-tag
          slot="prefix"
          v-for="tag in selectedTags"
          :key="tag.name"
          closable
          :type="tag.type"
          @close="handleClose(tag)"
        >{{tag.name}}</el-tag>
      </el-input>
      <el-row class="tags-for-choice">
        <el-tag
          v-for="tag in tags"
          :key="tag.name"
          :type="tag.type"
          @click="handleChoose(tag)"
        >{{tag.name}}</el-tag>
      </el-row>
      <el-row class="bottom-buttons">
        <el-button @click="publishShortArticle">发表</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-row>
    </el-row>
    <publish-picture v-if="show===2"></publish-picture>
  </div>
</template>

<script>
import axios from "axios";
import PublishPicture from "./PublishPictureComponent/PublishPicture";

export default {
  name: "ElecForLove",
  components: {
    PublishPicture,
  },
  data() {
    return {
      shortArticle: {
        title: "",
        article: "",
        tag: [],
      },
      tags: [
        { name: "小甜文", type: "info", id: 1 },
        { name: "校园文", type: "info", id: 2 },
        { name: "穿越文", type: "info", id: 3 },
        { name: "师生文", type: "info", id: 4 },
        { name: "年下", type: "info", id: 5 },
        { name: "年上", type: "info", id: 6 },
        { name: "白宇", type: "info", id: 7 },
      ],
      selectedTags: [],
      show: 1,
    };
  },
  methods: {
    handleClose(tag) {
      this.tags.forEach((item) => {
        if (item.id === tag.id) item.type = "info";
      });
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
      this.shortArticle.tag.splice(this.shortArticle.tag.indexOf(tag.name), 1);
    },
    handleChoose(tag) {
      if (tag.type === "info") {
        tag.type = "warning";
        this.selectedTags.push({ ...tag });
        this.shortArticle.tag.push(tag.name);
      }
    },
    publishShortArticle() {
      console.log("publish");
      axios
        .post("http://localhost:8088/api/publishShortArticle", {
          nameId: 1,
          title: this.shortArticle.title,
          article: this.shortArticle.article,
          isShort: 1,
          tags: this.shortArticle.tag,
        })
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: "发表成功啦！",
              type: "success",
            });
          }
        });
    },
    cancle() {
      this.shortArticle = {
        title: "",
        article: "",
        tag: [],
      };
    },
  },
};
</script>

<style scoped>
.el-button-group {
  display: flex;
  padding: 30px 10%;
}
.el-button--warning.is-plain {
  width: 40%;
  height: 70px;
  font-size: x-large;
}
.publish-container {
  width: 90%;
  margin: auto;
}
/deep/ .el-textarea__inner {
  height: 200px;
}
.tags-for-choice {
  padding: 2%;
  margin: auto;
}
/deep/.el-input-group__prepend {
  height: 70px;
}
/deep/.el-input__inner {
  height: 70px;
}
.el-tag {
  padding-right: 20px;
  padding-left: 20px;
  margin: 10px;
}
.bottom-buttons {
  margin: auto;
  width: fit-content;
}
.el-button {
  margin: 20px 80px 0px;
}
</style>
