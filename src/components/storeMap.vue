<template>
  <div>
    <div
      :class="{'swiper-container':true,chageImgContainer:true,showHide:imgHide}"
      @click="imgHide=false"
    >
      <div class="swiper-wrapper chageImg">
        <img
          v-for="(src,index) in srcs"
          style="height:2.5rem;overflow:hidden"
          :key="index"
          class="swiper-slide thisImg"
          :src="src"
          alt
        />
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>-->
      <!-- 如果需要滚动条 -->
      <!-- <div class="swiper-scrollbar"></div> -->
    </div>
    <div class="mapWrapper">
      <span class="clearfix enlarge" @click="imgHide=true">
        <em>3张</em>
      </span>
      <div class="mapHead">
        <div class="storeInfo">
          <span class="storeCon">
            <p>中泰汽车美容护理中心</p>
            <p>
              <span>5.0</span>
              <span>
                7399
                <em class="gray">单</em>
              </span>
            </p>
            <p>
              <em class="gray">营业时间：</em>
              <em>06:00-20:00</em>
            </p>
          </span>
        </div>
        <div class="positionInfo">
          <textarea name id cols="30" disabled="false" rows="10">广东省深圳市宝安区西乡盐田宝安大道4004号旭生大厦21楼号旭生大厦21楼号旭生大厦21楼   距您400m</textarea>
          <span class="tips goThere" @click="chooseHide=true">去这里</span>
          <a class="tips" href="tel:00000000000">联系商家</a>
        </div>
      </div>
      <div class="storeMap" id="storeMap">
        <el-amap vid="amap" :plugin="plugin" :zoom="zoom" :center="center">
          <el-amap-marker :position="center" :icon="icon" :label="storeName" vid="amapMarker"></el-amap-marker>
        </el-amap>
      </div>
      <div class="mapToKefu"></div>
      <div class="chooseMap" style="z-index:1" v-if="chooseHide">
        <div class="gaode">高德地图</div>
        <div class="baidu">百度地图</div>
        <div class="quxiao" @click="chooseHide=false">取消</div>
      </div>
      <div class="bgBlack" v-if="imgHide||chooseHide" @click="imgHide=false"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  data() {
    return {
      icon: require("../assets/img/map_icon_store_sel.png"),
      imgHide: false,
      chooseHide: false,
      srcs: [
        require("../assets/img/bg4.jpg"),
        require("../assets/img/bg5.jpg"),
        require("../assets/img/bg6.jpg"),
      ],
      storeName: "中泰汽车美容护理中心",
      center: [113.86366299999997, 22.583792],
      zoom: 16,
      nearbyInfo: [], // 周边信息---高德反馈（周边建筑信息）
      addressInfo: "", // 城市信息---高德反馈（省市区、adcode）
      plugin: [
        {
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 100, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "RB", //定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：fnp
          extensions: "all",
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                console.log(result);
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                }
              });
            },
          },
        },
      ],
    };
  },
  mounted() {
    new Swiper(".swiper-container", {
      loop: true, // 循环模式选项
      autoplay: true, //自动循环
      // 如果需要分页器
      pagination: ".swiper-pagination",
      // 如果需要前进后退按钮
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
      // 如果需要滚动条
      scrollbar: ".swiper-scrollbar",
    });
  },
  methods: {},
};
</script>

<style scoped>
.mapWrapper {
  width: 3.75rem;
  height: 100%;
  margin: 0 auto;
}

.mapWrapper .mapHead {
  width: 3.59rem;
  height: 1.82rem;
  padding-left: 0.16rem;
}

.mapWrapper .mapHead .storeInfo {
  height: 0.9rem;
  padding: 0.12rem 0;
  border-bottom: 1px solid #dfe2e6;
  display: flex;
}

.mapWrapper .enlarge {
  display: inline-block;
  width: 1.07rem;
  height: 0.9rem;
  background: url("../assets/img/bg1.jpg");
  position: absolute;
  top: 0.12rem;
  left: 0.16rem;
}

.mapWrapper .enlarge em {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0.2rem;
  height: 0.17rem;
  font-size: 0.12rem;
  color: rgba(255, 255, 255, 1);
  line-height: 0.17rem;
}

.mapWrapper .mapHead .storeInfo .storeCon {
  display: inline-block;
  width: 1.6rem;
  height: 0.9rem;
  padding-left: 1.15rem;
}

.mapWrapper .mapHead .storeInfo .storeCon p:nth-of-type(1) {
  height: 0.22rem;
  padding-bottom: 0.12rem;
}

.mapWrapper .mapHead .storeInfo .storeCon p:nth-of-type(2) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.2rem;
  padding-top: 0.12rem;
}

.mapWrapper .mapHead .storeInfo .storeCon p:nth-of-type(2) span:nth-of-type(1) {
  width: 0.21rem;
  height: 0.2rem;
  background: url("../assets/img/list_icon_star_sel@2x.png") no-repeat left
    center;
  background-size: 0.12rem 0.12rem;
  padding-left: 0.14rem;
}

.mapWrapper .mapHead .storeInfo .storeCon p:nth-of-type(2) span:nth-of-type(2) {
  width: 0.51rem;
  height: 0.2rem;
  font-size: 0.14rem;
  color: rgba(8, 16, 26, 1);
  line-height: 0.2rem;
}

.mapWrapper .mapHead .storeInfo .storeCon p:nth-of-type(3) {
  height: 0.2rem;
  font-size: 0.14rem;
  color: rgba(159, 166, 174, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.05rem;
}

.mapWrapper .mapHead .positionInfo {
  height: 0.51rem;
  padding: 0.08rem 0;
}

.mapWrapper .mapHead .positionInfo textarea {
  border: none;
  width: 2.3rem;
  height: 0.51rem;
  font-size: 0.12rem;
  line-height: 0.17rem;
  background: url("../assets/img/list_icon_adress@2x.png") no-repeat left 5%;
  background-size: 0.1rem 0.12rem;
  padding-left: 0.12rem;
}

.mapWrapper .mapHead .positionInfo .tips {
  display: inline-block;
  width: 0.5rem;
  height: 0.51rem;
  line-height: 0.51rem;
  text-align: center;
  font-size: 0.12rem;
  color: rgba(8, 16, 26, 1);
  vertical-align: top;
  transform: scale(0.75);
}

.mapWrapper .mapHead .positionInfo span {
  background: url("../assets/img/icon_taxi@2x.png") no-repeat center -10%;
  background-size: 0.21rem 0.21rem;
}

.mapWrapper .mapHead .positionInfo a {
  background: url("../assets/img/icon_iphone@2x.png") no-repeat center -10%;
  background-size: 0.21rem 0.21rem;
}

.mapWrapper .storeMap {
  height: 6.3rem;
}
.mapWrapper .chooseMap {
  position: fixed;
  bottom: 0.2rem;
  left: 0.36rem;
}
.mapWrapper .chooseMap div {
  width: 3rem;
  height: 0.4rem;
  margin-bottom: 0.1rem;
  line-height: 0.4rem;
  background: rgba(255, 255, 255, 0.9);
  text-align: center;
  border-radius: 0.25rem;
}
.mapWrapper .chooseMap .quxiao {
  margin-top: 0.5rem;
}
.mapWrapper .storeMap .amap-marker-label {
  display: none;
  border: none;
}
.swiper-container {
  position: absolute;
  width: 3.43rem;
  height: 3.43rem;
  top: 0.12rem;
  left: 0.16rem;
  visibility: hidden;
}
.showHide {
  visibility: visible;
}
.explain {
  position: absolute;
  bottom: 0.2rem;
  right: 0;
}
</style>