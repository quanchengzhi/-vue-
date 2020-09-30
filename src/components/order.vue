<template>
  <div class="oWrapper">
    <mescroll-vue
      id="mescroll"
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <ul class="allOrders" id="allOrders">
        <li class="orders" v-for="(list,index) in listData" :key="index">
          <div @click="goToOrder(list)">
            <div class="head">
              <span>卡券订单</span>
              <span>{{list.type}}</span>
            </div>
            <div class="content clearfix">
              <p>
                购买服务：
                <span>标准洗车</span>
              </p>
              <p>
                订单编号：
                <span>CD123456</span>
              </p>
              <p>
                下单时间：
                <span>{{currDate}}</span>
              </p>
              <p>
                总价：
                <span>¥36.00</span>
              </p>
              <div
                v-if="list.vif"
                @click.stop="goToNext(list)"
                :class="{orderBtn:true,orderBtn0:list.classType==0,orderBtn1:list.classType==1}"
              >{{list.btnText}}</div>
            </div>
          </div>
        </li>
      </ul>
    </mescroll-vue>
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
      time: "",
      currDate: "",
      totalPage: 2,
      mescroll: null,
      mescrollDown: { use: true },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 5,
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
  beforeRouteLeave(to, from, next) {
    if (to.name === "paySuccess") {
      next({ name: "index" });
    } else {
      next(); // 注意：这边next必须要写
    }
  },
  created() {
    this.getDate();
  },
  methods: {
    getDate() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let time = date.getTime();

      if (minute < 10) {
        minute = `0${minute}`;
      }
      if (hour < 10) {
        minute = `0${minute}`;
      }
      this.time = time;
      this.currDate = `${year}-${month}-${day} ${hour}:${minute}`;
    },
    goToOrder(list) {
      this.$router.push({
        path: "/orderDetail",
        name: "orderDetail",
        params: {
          orderType: list.orderType,
          currDate: this.currDate,
          time: this.time,
        },
      });
    },
    goToNext(list) {
      this.$router.push({
        path: `/${list.href}`,
        params: {
          orderType: list.orderType,
        },
      });
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    upCallback(page, mescroll) {
      // 联网请求
      let axios = this.axios;
      axios
        .get("/json/order.json", {
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
          for (
            let i = (page.num - 1) * page.size;
            i < page.num * page.size;
            i++
          ) {
            if (i == arr.length) break;
            this.listData.push(arr[i]);
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
.oWrapper {
  height: 8.12rem;
  background: rgba(248, 251, 255, 1);
}

.oWrapper .mescroll .allOrders {
  width: 3.43rem;
  padding: 0 0.16rem;
}
.oWrapper .mescroll .allOrders .orders {
  margin-top: 0.08rem;
  display: block;
  background: #fff;
  position: relative;
}

.oWrapper .mescroll .allOrders .orders a {
  display: block;
}

.oWrapper .mescroll .allOrders .orders .head {
  margin: 0 0.12rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.38rem;
  border-bottom: 1px solid #dfe2e6;
  font-size: 0.15rem;
}

.oWrapper .mescroll .allOrders .orders .content {
  height: 1.7rem;
  margin: 0 0.12rem;
}

.oWrapper .mescroll .allOrders .orders .content p {
  width: 3.19rem;
  font-size: 0.14rem;
  font-weight: 400;
  color: rgba(159, 166, 174, 1);
  padding-bottom: 0.08rem;
}

.oWrapper .mescroll .allOrders .orders .content p span {
  display: block;
  color: #08101a;
  width: 2.07rem;
  margin-right: 0.42rem;
  float: right;
}

.oWrapper .mescroll .allOrders .orders .content p:nth-of-type(1) {
  padding-top: 0.12rem;
}

.oWrapper .mescroll .allOrders .orders .content .orderBtn {
  float: right;
  width: 0.72rem;
  height: 0.3rem;
  line-height: 0.3rem;
  text-align: center;
  border-radius: 0.18rem;
  font-size: 0.12rem;
  font-weight: 400;
}
.oWrapper .mescroll .allOrders .orders .content .orderBtn0 {
  border: 1px solid rgba(39, 130, 244, 1);
  background: #2782f4;
  color: rgba(255, 255, 255, 1);
}
.oWrapper .mescroll .allOrders .orders .content .orderBtn1 {
  border: 1px solid #c6cdd5;
}
</style>