<template>
  <div class="wrapper clearfix">
    <mescroll-vue
      id="mescroll"
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <div class="search" v-if="firstHide">
        <router-link to="/cityChoose" class="positionPic ellipsis">{{locakCity}}</router-link>
        <router-link to="/search" class="frame">
          <span class="searchPic"></span>
          <input type="text" readonly placeholder="搜索你感兴趣的门店" />
        </router-link>
      </div>
      <div class="menu" v-if="firstHide">
        <router-link to="/coupons" class="icon_coupons">我的洗车券</router-link>
        <router-link to="/order" class="icon_order">我的订单</router-link>
      </div>
      <div class="coupons" v-if="firstHide">
        <p>
          <span>标准洗车券 (全城通用)</span>
          <span>
            <i>¥</i>30
          </span>
        </p>
        <p>支持7座及以下轿车标准洗车1次</p>
        <router-link to="/pay">立即购买</router-link>
      </div>
      <div class="store">
        <h2>适用以下329家门店</h2>
        <div class="storeMenu">
          <span :class="changeBgImg" @click="beFirstChecked($event)">{{thisCountry}}</span>
          <span
            v-for="(menu,index) in menuList"
            :key="menu.index"
            :class="{otherChoose:true,checked:thisIndex == index}"
            @click="beChecked(index)"
          >{{menu.text}}</span>
          <router-link to="/storeMap" class="mapIcon">地图选店</router-link>
        </div>
        <ul class="cityAreas" v-if="secondHide" @touchmove.prevent>
          <li
            v-for="country in countrys"
            :key="country.index"
            @click="changeCountry($event)"
          >{{country.name}}</li>
        </ul>
      </div>
      <ul class="allStoreInfo" id="allStoreInfo" v-if="showLi">
        <li v-for="list in listData" :key="list.index" class="storeInfo">
          <router-link :to="list.href">
            <span class="storePic"></span>
            <span class="storeText">
              <p>{{list.name}}</p>
              <p>
                <span>{{list.score}}</span>
                <span>
                  {{list.number}}
                  <em class="gray">单</em>
                </span>
              </p>
              <p>
                <span class=".ellipsis">
                  {{list.position}}
                  <em>2.4km</em>
                </span>
              </p>
            </span>
          </router-link>
        </li>
      </ul>
      <div class="img clearfix">
        <a href="tel:0755-23711823"></a>
        <p class="toTop" @click="toTop()"></p>
      </div>
      <div class="bgBlack" v-if="secondHide"></div>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  name: "index",
  components: {
    MescrollVue,
  },
  data() {
    return {
      locakCity: "深圳市",
      menuList: [{ text: "销量最多" }, { text: "好评最多" }],
      thisIndex: 3,
      chooseDownGray: false,
      chooseDown: true,
      chooseUp: false,
      checked: true,
      firstHide: true,
      secondHide: false,
      showLi: false,
      thisCountry: "全市",
      countrys: [
        { name: "全市" },
        { name: "罗湖区" },
        { name: "福田区" },
        { name: "南山区" },
        { name: "宝安区" },
        { name: "龙岗区" },
        { name: "盐田区" },
        { name: "龙华区" },
      ],
      totalSize: 9,
      mescroll: null,
      mescrollDown: { use: true },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 7,
        },
        isBounce: false,
      },
      listData: [], // 列表数据
      beforeRouteEnter(to, from, next) {
        // 如果没有配置顶部按钮或isBounce,则beforeRouteEnter不用写
        next((vm) => {
          // 滚动到原来的列表位置,恢复顶部按钮和isBounce的配置
          vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter();
        });
      },
      beforeRouteLeave(to, from, next) {
        // 如果没有配置顶部按钮或isBounce,则beforeRouteLeave不用写
        // 记录列表滚动的位置,隐藏顶部按钮和isBounce的配置
        this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave();
        next();
      },
    };
  },
  created() {
    this.getParams();
  },
  computed: {
    changeBgImg: function () {
      return {
        cityChooseDown: this.chooseDown,
        cityChooseUp: this.chooseUp,
        cityChooseDownGray: this.chooseDownGray,
        checked: this.checked,
      };
    },
  },
  mounted() {},
  methods: {
    
    getParams() {
      if (this.$route.params.city) {
        this.locakCity = this.$route.params.city;
      }
    },
    changeCountry(event) {
      this.mescrollDown.use = true;
      this.mescroll.resetUpScroll();
      this.firstHide = true;
      this.secondHide = false;
      this.chooseDown = true;
      this.chooseUp = false;
      this.checked = true;
      this.thisCountry = event.target.innerText;
    },
    toTop() {
      let top = document.getElementById("mescroll").scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.getElementById(
          "mescroll"
        ).scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 20);
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      console.log(this.mescroll);
    },
    beFirstChecked() {
      this.thisIndex = 3;
      if (this.firstHide) {
        this.mescrollDown.use = false;
        this.firstHide = false;
        this.secondHide = true;
        this.chooseDownGray = false;
        this.chooseDown = false;
        this.chooseUp = true;
        this.checked = true;
      } else {
        this.mescrollDown.use = true;
        this.firstHide = true;
        this.secondHide = false;
        this.chooseDownGray = false;
        this.chooseDown = true;
        this.chooseUp = false;
      }
    },
    beChecked(index) {
      console.log(index);
      this.mescrollDown.use = true;
      this.mescroll.resetUpScroll();
      this.firstHide = true;
      this.secondHide = false;
      this.chooseDown = false;
      this.chooseUp = false;
      this.chooseDownGray = true;
      this.checked = false;
      this.thisIndex = index;
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      // 联网请求
      let axios = this.axios;
      axios
        .get("/json/store.json", {
          params: {
            num: page.num, // 页码
            size: page.size, // 每页长度
          },
        })
        .then((response) => {
          // 请求的列表数据
          let arr = response.data;
          if (page.num == 1) this.listData = [];
          for (
            let i = (page.num - 1) * page.size;
            i < page.num * page.size;
            i++
          ) {
            if (i == arr.length) break;
            this.listData.push(arr[i]);
          }
          console.log(this.listData);
          // 如果是第一页需手动置空列表

          // 把请求到的数据添加到列表
          // this.listData = this.listData.concat(arr);

          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            this.showLi = true;
            mescroll.endBySize(this.listData.length, this.totalSize);
          });
        })
        .catch(() => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },
  },
};
</script>

<style>
.wrapper {
  width: 3.75rem;
  position: relative;
  margin: 0 auto;
  height: 100%;
  background: rgba(248, 251, 255, 1);
}

.wrapper .search {
  width: 3.43rem;
  height: 0.45rem;
  display: flex;
  align-items: center;
  background: #fff;
  padding: 0 0.16rem;
}

.wrapper .search .positionPic {
  display: inline-block;
  background: url("../assets/img/icon_adress@2x.png");
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 0.16rem 0.16rem;
  padding-left: 0.17rem;
  font-size: 0.15rem;
}

.wrapper .search .frame {
  background: url("../assets/img/icon_serach@2x.png") no-repeat 0.08rem 0.07rem;
  background-size: 0.16rem 0.16rem;
  display: flex;
  height: 0.3rem;
  align-items: center;
  margin-left: 0.16rem;
  border-radius: 0.15rem;
  border: 1px solid #dfe2e6ff;
}

.wrapper .search .frame input {
  font-size: 0.15rem;
  margin:0.1rem 0.16rem 0.06rem 0.27rem;
  width: auto;
}

.wrapper .menu {
  width: 3.43rem;
  margin: 0.08rem 0.16rem 0.16rem 0.16rem;
  height: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 0.16rem;
  color: rgba(8, 16, 26, 1);
  background: #fff;
}

.wrapper .menu .icon_coupons {
  margin-left: 0.32rem;
  padding-left: 0.22rem;
  background: url("../assets/img/icon_coupons@2x.png");
  background-repeat: no-repeat;
  background-size: 0.2rem 0.2rem;
}

.wrapper .menu .icon_order {
  margin-right: 0.5rem;
  padding-left: 0.22rem;
  background: url("../assets/img/icon_order@2x.png");
  background-repeat: no-repeat;
  background-size: 0.2rem 0.2rem;
}

.wrapper .coupons {
  width: 3.43rem;
  height: 1.2rem;
  margin: 0 0.16rem;
  background: url("../assets/img/img_card@2x.png");
  background-size: 100%;
  background-repeat: no-repeat;
}

.wrapper .coupons p:nth-of-type(1) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.2rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  padding: 0.12rem 0.16rem 0;
}

.wrapper .coupons p:nth-of-type(1) i {
  font-size: 0.14rem;
  font-weight: normal;
  padding-right: 0.04rem;
}

.wrapper .coupons p:nth-of-type(2) {
  font-size: 0.12rem;
  color: rgba(255, 225, 201, 1);
  padding-left: 0.16rem;
  padding-top: 0.04rem;
}

.wrapper .coupons a {
  display: inline-block;
  width: 0.9rem;
  height: 0.3rem;
  line-height: 0.3rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.18rem;
  text-align: center;
  color: rgba(255, 88, 0, 1);
  font-size: 0.14rem;
  font-weight: 500;
  margin-left: 0.16rem;
  margin-top: 0.17rem;
}

.wrapper .store {
  width: 3.43rem;
  padding: 0 0.16rem;
  padding-bottom: 0.11rem;
  z-index: 999;
  background: #fff;
  position: relative;
}

.wrapper .store h2 {
  font-size: 0.2rem;
  font-weight: 500;
  color: rgba(8, 16, 26, 1);
  padding-top: 0.24rem;
}

.wrapper .store .storeMenu {
  padding-top: 0.12rem;
  width: 3.43rem;
  height: 0.2rem;
  line-height: 0.2rem;
  font-size: 0.14rem;
  color: rgba(159, 166, 174, 1);
  display: flex;
  justify-content: space-between;
}

.wrapper .store .storeMenu .checked {
  color: #2782f4;
}

.wrapper .store .storeMenu span {
  display: inline-block;
}

.wrapper .store .storeMenu .cityChooseDown {
  background: url("../assets/img/icon_down_sel@2x.png") no-repeat right center;
  background-size: 0.16rem 0.16rem;
  padding-right: 0.16rem;
}
.wrapper .store .storeMenu .cityChooseDownGray {
  background: url("../assets/img/icon_down_sel_gray@2x.png") no-repeat right
    center;
  background-size: 0.16rem 0.16rem;
  padding-right: 0.16rem;
}
.wrapper .store .storeMenu .cityChooseUp {
  background: url("../assets/img/icon_up_sel@2x.png") no-repeat right center;
  background-size: 0.16rem 0.16rem;
  padding-right: 0.16rem;
}
.wrapper .store .storeMenu .mapIcon {
  background: url("../assets/img/icon_map@2x.png");
  background-repeat: no-repeat;
  background-position: right center;
  padding-right: 0.16rem;
  background-size: 0.16rem 0.16rem;
  color: rgba(159, 166, 174, 1);
}

.wrapper .mescroll {
  position: fixed;
  top: 0;
  bottom: 0;
  height: auto;
}

.wrapper .allStoreInfo {
  background: #fff;
  width: 3.43rem;
  padding: 0 0.16rem;
}

.wrapper .allStoreInfo .storeInfo a {
  border-top: 1px solid #dfe2e6;
  padding: 0.12rem 0;
  display: flex;
  justify-content: space-between;
}

.wrapper .storeInfo span {
  display: inline-block;
}

.wrapper .storeInfo .storePic {
  width: 1.07rem;
  height: 0.89rem;
  background: #0ff;
}

.wrapper .storeInfo .storeText {
  width: 2.28rem;
}

.wrapper .storeInfo .storeText p:nth-of-type(1) {
  font-size: 0.16rem;
  font-weight: medium;
  color: rgba(8, 16, 26, 1);
}

.wrapper .storeInfo .storeText p:nth-of-type(2) {
  font-size: 0.14rem;
  padding-top: 0.1rem;
}

.wrapper .storeInfo .storeText p:nth-of-type(2) span:nth-of-type(1) {
  background: url("../assets/img/list_icon_star_sel@2x.png") no-repeat left 45%;
  background-size: 0.12rem 0.12rem;
  padding-left: 0.14rem;
}

.wrapper .storeInfo .storeText p:nth-of-type(2) span:nth-of-type(2) {
  padding-left: 0.53rem;
}

.wrapper .storeInfo .storeText p:nth-of-type(3) {
  font-size: 0.14rem;
  color: #9fa6ae;
  padding-top: 0.18rem;
}

.wrapper .storeInfo .storeText p:nth-of-type(3) span {
  background: url("../assets/img/list_icon_adress@2x.png") no-repeat left center;
  background-size: 0.12rem 0.12rem;
  padding-left: 0.14rem;
}

.wrapper .storeInfo .storeText p:nth-of-type(3) span em {
  padding-left: 0.12rem;
}

.gray {
  color: #9fa6ae !important;
}

.wrapper .img a {
  background: url("../assets/img/img_service@2x.png") no-repeat center;
  background-size: 100%;
  width: 0.66rem;
  height: 0.62rem;
  position: fixed;
  bottom: 1.66rem;
  right: 0.12rem;
}

.wrapper .img p {
  background: url("../assets/img/icon_top@2x.png") no-repeat center;
  background-size: 100%;
  width: 0.62rem;
  height: 0.52rem;
  position: fixed;
  bottom: 1rem;
  right: 0.12rem;
}

.store .cityAreas {
  width: 3.43rem;
  padding: 0 0.16rem;
  font-size: 0.15rem;
  position: absolute;
  top: 0.93rem;
  left: 0;
  background: #fff;
  z-index: 999;
}

.store .cityAreas li {
  height: 0.49rem;
  line-height: 0.49rem;
  color: rgba(8, 16, 26, 1);
  font-weight: 500;
  border-top: 1px solid #dfe2e6;
}

.bgBlack {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
  opacity: 0.4;
}
</style>

