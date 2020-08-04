<template>
  <el-row class="publish-container">
    <el-input placeholder="请输入标题" v-model="uploadContent.name">
      <template slot="prepend">标题:</template>
    </el-input>
    <div class="form-item">
      <input
        readonly
        type="text"
        placeholder="请上传图片"
        v-model="this.uploadContent.file.name"
        autocomplete="off"
      />
      <input
        id="fileInput"
        type="file"
        name="filename"
        accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
        @change="getFile($event)"
        size="30"
      />
      <label for="fileInput" class="file-btn">上传图片</label>
    </div>
    <el-input placeholder="请选标签">
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
      <el-button @click="publishUploadContent">发表</el-button>
      <el-button @click="cancle">取消</el-button>
    </el-row>
  </el-row>
</template>

<script>
// import axios from "axios";

import axios from "axios";

export default {
  name: "PublishPicture",
  data() {
    return {
      uploadContent: {
        name: "",
        file: "",
        tag: [],
      },
      tags: [
        { name: "Q版", type: "info", id: 1 },
        { name: "沈巍", type: "info", id: 2 },
        { name: "罗浮生", type: "info", id: 3 },
        { name: "镇魂", type: "info", id: 4 },
        { name: "重启", type: "info", id: 5 },
        { name: "舞台", type: "info", id: 6 },
        { name: "白宇", type: "info", id: 7 },
      ],
      selectedTags: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  methods: {
    handleClose(tag) {
      this.tags.forEach((item) => {
        if (item.id === tag.id) item.type = "info";
      });
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
      this.uploadContent.tag.splice(
        this.uploadContent.tag.indexOf(tag.name),
        1
      );
    },
    handleChoose(tag) {
      if (tag.type === "info") {
        tag.type = "warning";
        this.selectedTags.push({ ...tag });
        this.uploadContent.tag.push(tag.name);
      }
    },
    // handleRemove(file) {
    //     console.log(file);
    // },
    // handlePictureCardPreview(file) {
    //     this.dialogImageUrl = file.url;
    //     this.dialogVisible = true;
    //     this.uploadContent.file=file
    //     console.log('file',file)
    // },
    // beforeAvatarUpload(file){
    //     // eslint-disable-next-line no-debugger
    //     debugger
    //     console.log('beforeAvatarUpload',file)
    // },
    getFile(event) {
      this.uploadContent.file = event.target.files[0];
      console.log("this.uploadContent.file", this.uploadContent.file);
    },
    publishUploadContent() {
      let formData = new FormData();
      formData.append("name", "c");
      formData.append("tags", this.uploadContent.tag);
      formData.append("file", this.uploadContent.file);
      console.log(formData.get("file"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post("http://localhost:8088/api/publishPicture", formData, config)
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
      this.uploadContent = {
        name: "",
        file: "",
        tag: [],
      };
    },
  },
};
</script>

<style scoped>
.publish-container {
  width: 90%;
  margin: auto;
}
.tags-for-choice {
  padding: 2%;
  margin: auto;
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
.form-item {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
}

.form-item label {
  width: 126px;
  text-align: right;
}

.form-item span {
  color: #ff3228;
}

.form-item input {
  width: 90%;
  height: 40px;
  line-height: 40px;
  border: 1px solid #cccccc;
  padding-left: 14px;
  box-sizing: border-box;
}

/* 这是原生的input框，给他透明隐藏，然后定位让文件上传的按钮覆盖它 */
#fileInput {
  width: 120px;
  margin-left: 8px;
  filter: Alpha(opacity=0);
  -moz-opacity: 0;
  opacity: 0;
  position: absolute;
  right: 37px;
  z-index: 2;
}
/* 这是主要的，文件上传按钮的样式 */
.file-btn {
  width: 120px;
  height: 40px;
  background: rgba(230, 242, 255, 1);
  border: 1px solid rgba(167, 210, 255, 1);
  border-radius: 2px;
  text-align: center !important;
  line-height: 40px;
  color: #333333;
  position: relative;
  top: 0;
  left: 0;
}
/* 单行文字截断，展示文件名的input框用的 */
#applyLicense {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
