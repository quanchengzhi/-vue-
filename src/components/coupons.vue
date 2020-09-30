<template>
  <div class="coWrapper">
    <div class="head clearfix">
      <div class="choose">
        <span
          v-for="(menu,index) in couponMenu"
          :class="{checked:thisIndex == index}"
          :key="index"
          @click="changeIndex(index)"
        >{{menu}}</span>
      </div>
    </div>
    <div class="mescroll" id="mescroll">
      <mescroll-vue
        id="mescroll"
        ref="mescroll"
        :down="mescrollDown"
        :up="mescrollUp"
        @init="mescrollInit"
      >
        <ul class="allCoupons" id="allCoupons">
          <li class="xiCoupons" v-for="(list,index) in listData" :key="index">
            <div @click="goToCouponDetail(list.used)">
              <div :class="{bg:true,bg0:list.used==0,bg1:list.used==1,bg2:list.used==2}">
                <div>
                  <p>{{list.name}}</p>
                  <p>2019.06.05-2019.07.06</p>
                </div>
                <em v-if="list.used==0" @click.stop="goToPay()">去使用</em>
              </div>
            </div>
          </li>
        </ul>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  components: {
    MescrollVue,
  },
  data() {
    return {
      thisIndex: 0,
      couponMenu: ["全部", "已使用", "已过期"],
      totalPage: 3,
      mescroll: null,
      mescrollDown: { use: true },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 10,
        },
        toTop: {
          //配置回到顶部按钮
          src: require("../assets/img/mescroll-totop.png"), //默认滚动到1000px显示,可配置offset修改
          offset: 300,
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
  computed: {},
  methods: {
    goToCouponDetail(used) {
      this.$router.push({
        path: "/viewCode",
        name: "viewCode",
        params: {
          type: used,
        },
      });
    },
    goToPay() {
      this.$router.push({
        path: "/pay",
      });
    },
    changeIndex(index) {
      this.thisIndex = index;
      this.mescroll.resetUpScroll();
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    upCallback(page, mescroll) {
      // 联网请求
      let axios = this.axios;
      axios
        .get("/json/coupons.json", {
          params: {
            num: page.num, // 页码
            size: page.size, // 每页长度
          },
        })
        .then((response) => {
          // 请求的列表数据
          let arr = response.data;
          // 如果是第一页需手动置空列表
          if (page.num == 1) this.listData = [];
          // 把请求到的数据添加到列表
          if (this.thisIndex == 0) {
            for (
              let i = (page.num - 1) * page.size;
              i < page.num * page.size;
              i++
            ) {
              if (i == arr.length) break;
              console.log(this.thisIndex);
              if (this.thisIndex == 0) {
                this.listData.push(arr[i]);
              }
            }
          } else {
            for (let i = 0; i < arr.length; i++) {
              if (this.thisIndex == 1) {
                if (arr[i].used == 1) {
                  this.listData.push(arr[i]);
                }
              } else if (this.thisIndex == 2) {
                if (arr[i].used == 2) {
                  this.listData.push(arr[i]);
                }
              }
            }
          }

          console.log(this.listData);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            this.showLi = true;
            mescroll.endByPage(this.listData.length, this.totalPage);
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
.coWrapper {
  width: 3.43rem;
  height: 100%;
  padding: 0 0.16rem;
  margin: 0 auto;
}

.coWrapper .head {
  width: 100%;
  height: 0.45rem;
  position: relative;
}

.coWrapper .head .choose {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 0.15rem;
  font-weight: bold;
}

.coWrapper .head .choose span {
  position: relative;
  display: inline-block;
  width: 0.5rem;
  height: 0.21rem;
  text-align: center;
}

.coWrapper .head .choose .checked {
  color: #2782f4ff;
}

.coWrapper .head .choose .checked::after {
  content: " ";
  display: inline-block;
  width: 0.2rem;
  height: 2px;
  background: #2782f4ff;
  position: absolute;
  bottom: -0.01rem;
  left: 0.15rem;
}

.coWrapper .mescroll {
  position: fixed;
  top: 0.45rem;
  bottom: 0;
  height: auto;
}

.coWrapper .mescroll .allCoupons .xiCoupons {
  display: block;
}

.coWrapper .mescroll .allCoupons .xiCoupons .bg {
  margin-bottom: 0.08rem;
  width: 3.43rem;
  height: 1.08rem;
  background-size: 100% !important;
  background-repeat: no-repeat !important;
  display: flex;
}
.coWrapper .mescroll .allCoupons .xiCoupons .bg0 {
  background: url("../assets/img/my_service_ticket2@2x.png");
}
.coWrapper .mescroll .allCoupons .xiCoupons .bg1 {
  background: url("../assets/img/img_bg_coupons_overdue (2).png");
}
.coWrapper .mescroll .allCoupons .xiCoupons .bg2 {
  background: url("../assets/img/img_bg_coupons_overdue.png");
}

.coWrapper .mescroll .allCoupons .xiCoupons .bg div {
  width: 1.4rem;
  height: 1.08rem;
  padding-top: 0.31rem;
  padding-left: 1.2rem;
}

.coWrapper .mescroll .allCoupons .xiCoupons .bg em {
  display: block;
  width: 0.56rem;
  height: 0.2rem;
  background: rgba(255, 88, 0, 1);
  border-radius: 0.15rem;
  font-size: 0.12rem;
  color: rgba(255, 255, 255, 1);
  line-height: 0.2rem;
  text-align: center;
  margin-top: 0.45rem;
  margin-left: 0.15rem;
}

.coWrapper .mescroll .allCoupons .xiCoupons p:nth-of-type(1) {
  font-size: 0.15rem;
  font-weight: 600;
  padding-bottom: 0.08rem;
  color: rgba(8, 16, 26, 1);
}

.coWrapper .mescroll .allCoupons .xiCoupons p:nth-of-type(2) {
  font-size: 0.12rem;
  font-weight: 400;
  color: rgba(159, 166, 174, 1);
}
</style>