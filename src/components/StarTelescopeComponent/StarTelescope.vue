<template>
  <div class="star-tele">
    <div class="star-right-corner">
      <div @click="changeBoy(1)">
        <el-avatar class="avatar" :src="zyltx"></el-avatar>
      </div>
      <div @click="changeBoy(2)">
        <el-avatar class="avatar" :src="bytx"></el-avatar>
      </div>
    </div>
    <el-row class="top-bar">
      <el-col :span="9">
        <div class="month-changer">
          <el-date-picker
            v-model="listQuery.month"
            type="monthrange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            value-format="yyyy-MM"
            @change="select"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="8">
        <el-select v-model="listQuery.city" placeholder="请选择活动地点" @change="select" clearable>
          <el-option
            v-for="item in cities"
            :key="item.index"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <div class="order-changer">
          排序：
          <el-radio-group v-model="reverse">
            <el-radio :label="false">倒序</el-radio>
            <el-radio :label="true">正序</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities.slice((curPage-1)*pageSize,curPage*pageSize)"
        :key="index"
        size="large"
        :icon="activity.icon"
      >
        <div class="tele-items">
          <i class="tele-items-img el-icon-time"></i>
          {{activity.time}}
        </div>
        <div class="tele-items" v-if="activity.city || activity.location">
          <i class="tele-items-img el-icon-location-outline"></i>
          {{activity.city}}&nbsp;{{activity.location}}
        </div>
        <div class="tele-items">
          <i class="tele-items-img el-icon-news"></i>
          {{activity.name}}
        </div>
        <div class="tele-items" v-if="activity.pic !== []">
          <el-row>
            <el-col
              :span="6"
              v-for="(adr,index) in activity.pic"
              :key="index"
              :offset="index > 0 ? 1 : 0"
            >
              <el-card>  
                <a :href="adr" target="_blank" title="查看最大化图片">
                  <el-image slot="reference" :src="adr" fit="fill" style="cursor:pointer"></el-image>
                </a>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <el-divider></el-divider>
      </el-timeline-item>
    </el-timeline>
    <div class="pagination-container">
      <el-pagination
        background
        :hide-on-single-page="true"
        :current-page="curPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="activities.length"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import starTelescope from "./StarTelescope.js";
export default starTelescope;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "./StarTelescope.scss";
</style>
