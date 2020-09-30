<template>
  <div>
    <div class="weiWrapper">
      <div class="head">
        <h1>{{typeText}}</h1>
        <p v-if="showPayTime">请在{{time}}分钟内完成支付，超时将会自动取消</p>
        <p v-if="!showPayTime&&refunded">{{refundText}}</p>
      </div>
      <div class="payInfo">
        <h2>标准洗车券（深圳通用）</h2>
        <p>
          <span>总价</span>
          <span>¥57.00</span>
        </p>
        <p>
          <span>优惠</span>
          <span>- ¥5.00</span>
        </p>
        <p>
          <span>支付金额</span>
          <span class="price">¥52.00</span>
        </p>
      </div>
      <div v-if="!showCoupon" class="couponInfo">
        <h2>服务卡券</h2>
        <div v-if="showUsed" class="couponUsed">
          <p class="used">洗车券：2496 4721 7549</p>
          <p>{{usedText}}</p>
        </div>
        <div v-if="!showUsed">
          <p>有效期：2019.12.23至2020.12.23</p>
          <p>支持7座及以下轿车标准洗车一次</p>
        </div>
      </div>
      <div v-if="!showUsed&&!showCoupon" class="vCode">
        <div class="bg">
          <p>向商家出示二维码或券号即可消费</p>
          <p>券号：2496 4721 7549</p>
        </div>
      </div>
      <div v-if="showAllStore" class="vBottom">
        <span>查看深圳所有通用商户</span>
        <span></span>
      </div>
      <div class="orderInfo">
        <h2>订单信息</h2>
        <div class="orderInfoContent fontSizeFourteen">
          <p>
            <span>订单编号</span>
            <span>126793404085757950</span>
          </p>
          <p>
            <span>下单时间</span>
            <span>{{currDate}}</span>
          </p>
          <p v-if="!showTime">
            <span>支付时间</span>
            <span>{{currDate}}</span>
          </p>
        </div>
      </div>
      <a href="tel:0755-23711823" class="callToKefu">
        联系客服
        <em></em>
      </a>
      <div v-if="showBtn&&!allHide" class="noPay">
        <span class="realCancel" @click="cancelOrder=true">取消订单</span>
        <a href="./confirmOrder.html">去支付</a>
      </div>
      <div
        @click="goNext()"
        v-if="!showBtn&&!allHide"
        :class="{bigBtn:true,bigBtn1:bigType,bigBtn2:!bigType}"
      >{{bigBtnText}}</div>
    </div>
    <div v-if="cancelOrder" class="bgGray"></div>
    <div v-if="cancelOrder" class="cancelOrder">
      <p>是否取消订单</p>
      <p>
        <span class="callCancel" @click="cancelOrder=false">取消</span>
        <router-link to="/order">确定</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bigBtnText: "去评价",
      orderType: 0,
      typeText: "待支付",
      bigType: false,
      showTime: true,
      showBtn: true,
      currDate: "",
      time: null,
      showCoupon: true,
      showPayTime: true,
      showUsed: false,
      allHide: false,
      showAllStore: true,
      usedText: "已使用",
      refunded: false,
      refundText: "钱款将于3个工作日内返还至您的付款账户",
      cancelOrder: false,
      path: "/index",
    };
  },
  created() {
    this.getParams();
  },
  mounted() {
    this.changeType();
  },
  computed: {},
  methods: {
    goNext(){
      this.$router.push(this.path)
    },
    getParams() {
      if (this.$route.params) {
        let date = new Date();
        this.orderType = this.$route.params.orderType;
        this.currDate = this.$route.params.currDate;
        this.time = Math.floor(
          (date.getTime() + 1 * 59 * 60 * 1000 - this.$route.params.time) /
            60000
        );
      }
      console.log(this.time);
    },
    changeType() {
      if (this.orderType == 1) {
        this.typeText = "待消费";
        this.showPayTime = false;
        this.showCoupon = false;
        this.showTime = false;
        this.showBtn = false;
        this.showAllStore = false;
        this.bigBtnText = "申请退款";
      } else if (this.orderType == 2) {
        this.typeText = "待评价";
        this.showPayTime = false;
        this.showCoupon = false;
        this.showUsed = true;
        this.showTime = false;
        this.showBtn = false;
        this.bigType = true;
        this.path = "/comment"
      } else if (this.orderType == 3) {
        this.typeText = "已完成";
        this.allHide = true;
        this.showPayTime = false;
        this.showCoupon = false;
        this.showUsed = true;
        this.showTime = false;
      } else if (this.orderType == 4) {
        this.typeText = "已取消";
        this.allHide = true;
        this.showPayTime = false;
        this.showUsed = true;
        this.showTime = false;
        this.showAllStore = false;
      } else if (this.orderType == 5) {
        this.typeText = "退款中";
        this.usedText = "已失效";
        this.showPayTime = false;
        this.showCoupon = false;
        this.showUsed = true;
        this.showTime = false;
        this.showBtn = false;
        this.bigType = true;
        this.allHide = true;
        this.refunded = true;
      } else if (this.orderType == 6) {
        this.typeText = "已退款";
        this.usedText = "已失效";
        this.showPayTime = false;
        this.showCoupon = false;
        this.showUsed = true;
        this.showTime = false;
        this.showBtn = false;
        this.bigType = true;
        this.allHide = true;
        this.refunded = true;
        this.refundText = "钱款已返还至您的付款账户，请注意查收";
      }
    },
  },
};
</script>

<style scoped>
.weiWrapper {
  position: relative;
  background: #f8fbff;
  margin: 0 auto;
  height: 100vh;
}
.weiWrapper .head {
  padding: 0.04rem 0.16rem 0.16rem;
}
.weiWrapper .head h1 {
  padding-top: 0.16rem;
  font-size: 0.2rem;
  font-weight: 500;
  color: #08101a;
}
.weiWrapper .head p {
  font-size: 0.14rem;
  font-weight: 400;
  color: #9fa6ae;
}
.weiWrapper .payInfo {
  width: 3.19rem;
  margin: 0 0.16rem;
  padding: 0 0.12rem;
  height: 1.21rem;
  background: #ffffff;
  border-radius: 0.04rem;
}
.weiWrapper .payInfo h2 {
  font-size: 0.16rem;
  font-weight: 500;
  color: #08101a;
  padding: 0.12rem 0;
}
.weiWrapper .payInfo p {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.04rem;
}
.weiWrapper .payInfo p span:nth-of-type(1) {
  font-size: 0.12rem;
  font-weight: 400;
  color: #9fa6ae;
}
.weiWrapper .payInfo p span:nth-of-type(2) {
  font-size: 0.12rem;
  font-weight: 400;
  color: #08101a;
}
.weiWrapper .payInfo p .price {
  font-size: 0.14rem !important;
  color: #ff5800 !important;
}

.weiWrapper .vBottom {
  height: 0.5rem;
  width: 3.19rem;
  margin: 0.08rem 0.16rem;
  background: #fff;
  padding: 0 0.12rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weiWrapper .vBottom span:nth-of-type(1) {
  font-size: 0.16rem;
  color: rgba(8, 16, 26, 1);
}

.weiWrapper .vBottom span:nth-of-type(2) {
  width: 0.16rem;
  height: 0.16rem;
  font-size: 0.12rem;
  font-weight: 400;
  color: rgba(159, 166, 174, 1);
  background: url("../assets/img/icon_on@2x.png") no-repeat right center;
  background-size: 0.16rem 0.16rem;
}
.weiWrapper .orderInfo {
  width: 3.19rem;
  margin: 0.08rem 0.16rem 0;
  padding: 0 0.12rem;
  background: #fff;
  border-radius: 0.04rem;
}

.weiWrapper .orderInfo h2 {
  font-size: 0.14rem;
  font-weight: 500;
  padding-top: 0.12rem;
  color: rgba(8, 16, 26, 1);
}

.weiWrapper .orderInfo .orderInfoContent {
  width: 3.19rem;
  padding-right: 0.12rem;
  margin-top: 0.12rem;
  border-top: 1px solid #dfe2e6;
}
.weiWrapper .orderInfo .orderInfoContent p:nth-of-type(1) {
  padding-top: 0.12rem;
}
.weiWrapper .orderInfo .orderInfoContent p {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.12rem;
  color: #9fa6ae;
  padding-bottom: 0.12rem;
}

.weiWrapper .orderInfo .orderInfoContent p span:nth-of-type(2) {
  color: #08101a;
}
.weiWrapper .callToKefu {
  border-radius: 0.04rem;
  display: block;
  font-size: 0.16rem;
  height: 0.5rem;
  line-height: 0.5rem;
  color: rgba(8, 16, 26, 1);
  background: #fff;
  width: 3.19rem;
  margin: 0.12rem 0.16rem;
  padding: 0 0.12rem;
  position: relative;
}
.weiWrapper .callToKefu em {
  display: block;
  width: 0.16rem;
  height: 0.16rem;
  position: absolute;
  right: 0.12rem;
  top: 0.17rem;
  background: url("../assets/img/icon_on@2x.png") no-repeat right center;
  background-size: 0.16rem 0.16rem;
}
.weiWrapper .noPay {
  margin-bottom: 0.16rem;
  margin-top: 0.4rem;
}
.weiWrapper .noPay span:nth-of-type(1) {
  margin-left: 0.13rem;
  margin-right: 0.12rem;
}
.weiWrapper .noPay span {
  display: inline-block;
  width: 1.66rem;
  height: 0.45rem;
  line-height: 0.45rem;
  text-align: center;
  border-radius: 0.25rem;
  border: 1px solid rgba(198, 205, 213, 1);
  font-size: 0.18rem;
  font-weight: 500;
  color: #9fa6ae;
  border-radius: 0.25rem;
  border: 1px solid rgba(198, 205, 213, 1);
}

.weiWrapper .noPay a {
  background: rgba(39, 130, 244, 1);
  color: #fff;
  display: inline-block;
  width: 1.66rem;
  height: 0.45rem;
  line-height: 0.45rem;
  text-align: center;
  border-radius: 0.25rem;
  border: 1px solid rgba(198, 205, 213, 1);
  font-size: 0.18rem;
  font-weight: 500;
  border-radius: 0.25rem;
  border: 1px solid rgba(198, 205, 213, 1);
}

.bgGray {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
  opacity: 0.4;
}
.cancelOrder {
  z-index: 999;
  position: absolute;
  top: 3rem;
  left: 0.53rem;
  width: 2.7rem;
  height: 1.06rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.14rem;
}

.cancelOrder p:nth-of-type(1) {
  height: 0.61rem;
  line-height: 0.61rem;
  text-align: center;
  border-bottom: 1px solid rgba(60, 60, 67, 0.29);
  font-size: 0.18rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}

.cancelOrder p:nth-of-type(2) {
  display: flex;
  flex: 1;
}

.cancelOrder p:nth-of-type(2) a {
  display: inline-block;
  width: 1.34rem;
  height: 0.43rem;
  line-height: 0.43rem;
  color: #007aff;
  text-align: center;
}

.cancelOrder p:nth-of-type(2) span {
  display: inline-block;
  width: 1.35rem;
  height: 0.43rem;
  line-height: 0.43rem;
  text-align: center;
  border-right: 1px solid rgba(60, 60, 67, 0.29);
  color: #007aff;
}

.weiWrapper .couponInfo {
  width: 3.19rem;
  padding: 0 0.12rem;
  margin: 0.08rem 0.16rem 0;
  background: #fff;
}

.weiWrapper .couponInfo h2 {
  font-size: 0.2rem;
  font-weight: 500;
  color: rgba(8, 16, 26, 1);
  padding-top: 0.12rem;
}

.weiWrapper .couponInfo p {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.12rem;
  color: #9fa6ae;
  padding-top: 0.04rem;
}
.weiWrapper .couponInfo p:nth-of-type(2) {
  padding-bottom: 0.12rem;
}

.weiWrapper .couponInfo p .overLine {
  position: absolute;
  bottom: 0.07rem;
  width: 1.4rem;
  height: 1px;
  background: #979797;
}
.weiWrapper .vCode {
  border-top: 1px dashed #dfe2e6;
  height: 1.98rem;
  margin-top: 0.12rem;
  width: 3.19rem;
  margin: 0 0.16rem;
  padding: 0.25rem 0.12rem 0;
  background: #fff;
}
.weiWrapper .vCode .bg {
  background: url("../assets/img/code.png") no-repeat center;
  background-size: 1.2rem 1.2rem;
}

.weiWrapper .vCode p:nth-of-type(1) {
  height: 0.17rem;
  line-height: 0.17rem;
  text-align: center;
  font-size: 0.12rem;
  font-weight: 400;
  color: rgba(159, 166, 174, 1);
}

.weiWrapper .vCode p:nth-of-type(2) {
  height: 0.22rem;
  line-height: 0.22rem;
  text-align: center;
  padding-top: 1.4rem;
  font-size: 0.16rem;
  font-weight: 500;
  color: rgba(8, 16, 26, 1);
}
.weiWrapper .bigBtn {
  width: 3.43rem;
  height: 0.45rem;
  line-height: 0.45rem;
  border-radius: 0.25rem;
  font-size: 0.18rem;
  font-weight: 500;
  margin: 0 0.16rem 0.16rem;
  text-align: center;
}
.weiWrapper .bigBtn1 {
  background: #2782f4;
  color: #ffffff;
}
.weiWrapper .bigBtn2 {
  border: 1px solid #c6cdd5;
  color: #9fa6ae;
}
.weiWrapper .couponInfo .couponUsed {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 3.19rem;
}
.weiWrapper .couponInfo .couponUsed .used {
  width: 1.43rem;
  position: relative;
}
.used::after {
  position: absolute;
  top: 0.12rem;
  content: "";
  height: 1px;
  width: 1.4rem;
  background: rgba(151, 151, 151, 1);
}
</style>