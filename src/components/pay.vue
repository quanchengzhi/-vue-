<template>
  <div class="confirmWrapper">
    <div class="confWrapper">
      <div class="conOrderInfo">
        <p>
          <span>标准洗车券（深圳通用）</span>
          <span>30元</span>
        </p>
        <p class="seeCouponsInfo">
          <span>优惠券</span>
          <span class="userUsed" @click="useCouponShow=!useCouponShow">{{couponName}}</span>
        </p>
        <p>
          <span>订单总价</span>
          <span class="shouldPay">¥ {{totalPrice}}</span>
        </p>
      </div>
      <div class="conPayWays">
        <h2>选择支付方式</h2>
        <p @click="choosePay(index)" v-for="(payType,index) in payTypes" :key="index">
          <span>{{payType}}</span>
          <span :class="{conPayCheck:true,conChecked:hasCheck==index}"></span>
        </p>
      </div>
      <div @click="goToSuccess" class="conPayBtn">立即支付</div>
    </div>
    <div class="useCoupons" v-if="useCouponShow">
      <h2>优惠券</h2>
      <ul class="allUseCoupons" id="allUseCoupons">
        <li
          class="useCoupon"
          v-for="(list,index) in listData"
          :key="index"
          @click="changeUse(index,list)"
        >
          <span>
            <em>¥</em>
            {{list.money}}
          </span>
          <span>
            <p>洗车优惠券</p>
            <p>仅限洗车可用，新人大礼包优惠券</p>
            <p>2019.06.05-2019.07.06</p>
          </span>
          <span>
            <em :class=" {conPayCheck:true,conChecked:thisIndex==index}"></em>
          </span>
        </li>
      </ul>
      <div
        class="noUse"
        @click="thisIndex=listData.length,useCouponShow=!useCouponShow,totalPrice = 30,couponName= '3张可用'"
      >
        <span>不使用优惠券</span>
        <span :class="{noUsed:true,conChecked:thisIndex==listData.length}"></span>
      </div>
    </div>
    <div class="bgGray" v-if="useCouponShow"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      couponName: "3张可用",
      totalPrice: 30,
      useCouponShow: false,
      hasCheck: true,
      payTypes: ["微信支付", "支付宝"],
      listData: [],
      thisIndex: 3,
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    goToSuccess() {
      this.$router.push({
        path: "/paySuccess",
      });
    },
    changeUse(index, list) {
      this.totalPrice = 30;
      this.thisIndex = index;
      this.useCouponShow = !this.useCouponShow;
      this.totalPrice -= list.money;
      this.couponName = `-¥ ${list.money}.00`;
    },
    choosePay(index) {
      this.hasCheck = index;
    },
    getInfo() {
      this.axios.get("/json/useCoupons.json").then((response) => {
        this.listData = response.data;
        console.log(this.listData);
      });
    },
  },
};
</script>

<style>
.confWrapper {
  width: 3.75rem;
  margin: 0 auto;
}

.confWrapper {
  width: 3.43rem;
  padding: 0 0.16rem;
}

.confWrapper .conOrderInfo {
  height: 1.5rem;
  padding-top: 0.08rem;
  margin-left: 0.12rem;
}

.confWrapper .conOrderInfo p {
  width: 3.19rem;
  height: 0.49rem;
  padding-right: 0.12rem;
  font-size: 0.16rem;
  color: rgba(159, 166, 174, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dfe2e6;
}

.confWrapper .conOrderInfo p:nth-of-type(2) span:nth-of-type(2) {
  background: url("../assets/img/icon_on@2x.png") no-repeat right center;
  background-size: 0.2rem 0.18rem;
  padding-right: 0.16rem;
}

.confWrapper .conOrderInfo p span:nth-of-type(2) {
  color: #ff5800;
}

.confWrapper .conOrderInfo p:nth-of-type(1) span:nth-of-type(2) {
  color: #08101a;
}

.confWrapper .conOrderInfo p:nth-of-type(3) {
  border: none;
}

.confWrapper .conPayWays {
  height: 1.5rem;
  padding-top: 0.08rem;
}

.confWrapper .conPayWays h2 {
  height: 0.49rem;
  line-height: 0.49rem;
  padding: 0 0.12rem;
  border-bottom: 1px solid #dfe2e6;
  font-size: 0.16rem;
  font-weight: 500;
  color: rgba(8, 16, 26, 1);
}

.confWrapper .conPayWays p {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.49rem;
  margin-left: 0.12rem;
  padding-right: 0.12rem;
  font-size: 0.15rem;
  font-weight: 400;
  color: rgba(8, 16, 26, 1);
}

.confWrapper .conPayWays p:nth-of-type(1) span:nth-of-type(1) {
  background: url("../assets/img/pay_icon_wechat@2x.png") no-repeat left center;
  background-size: 0.2rem 0.18rem;
  padding-left: 0.3rem;
}

.confWrapper .conPayWays p:nth-of-type(2) span:nth-of-type(1) {
  background: url("../assets/img/pay_icon_alipay@2x.png") no-repeat left center;
  background-size: 0.2rem 0.18rem;
  padding-left: 0.3rem;
}

.confWrapper .conPayWays p span:nth-of-type(2) {
  display: inline-block;
  width: 0.2rem;
  height: 0.2rem;
  border: 1px solid rgba(198, 205, 213, 1);
  border-radius: 50%;
}

.confWrapper .conPayWays p:nth-of-type(1) {
  border-bottom: 1px solid #dfe2e6;
}

.conChecked {
  background: url("../assets/img/icon_box_sel@2x.png") no-repeat !important;
  background-size: 100% !important;
}

.confWrapper .conPayBtn {
  display: inline-block;
  margin-top: 0.4rem;
  width: 3.43rem;
  height: 0.45rem;
  line-height: 0.45rem;
  text-align: center;
  background: rgba(39, 130, 244, 1);
  border-radius: 0.25rem;
  font-size: 0.18rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.useCoupons {
  position: absolute;
  bottom: 0;
  border-radius: 0.16rem 0.16rem 0 0;
  background: rgba(255, 255, 255, 1);
  width: 3.43rem;
  z-index: 999;
  padding: 0 0.16rem;
  margin: 0 auto;
}

.useCoupons h2 {
  width: 100%;
  height: 0.45rem;
  line-height: 0.45rem;
  font-size: 0.16rem;
  font-weight: 500;
  color: rgba(8, 16, 26, 1);
  border-bottom: 1px solid #dfe2e6;
  background: url("../assets/img/top_icon_close@2x.png") no-repeat right center;
  background-size: 0.14rem 0.14rem;
}

.useCoupons .allUseCoupons {
  margin-top: 0.12rem;
  height: 3rem;
  overflow: auto;
}

.useCoupons .useCoupon {
  width: 100%;
  height: 1.08rem;
  background: url("../assets/img/img_bg_coupons@2x.png") no-repeat;
  background-size: 100%;
  display: flex;
  margin-bottom: 0.12rem;
}

.useCoupons .useCoupon span:nth-of-type(1) {
  display: inline-block;
  width: 1.12rem;
  height: 1.08rem;
  line-height: 1.08rem;
  text-align: center;
  font-size: 0.48rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.useCoupons .useCoupon span:nth-of-type(1) em {
  font-size: 0.24rem;
}

.useCoupons .useCoupon span:nth-of-type(2) {
  display: inline-block;
  width: 1.75rem;
  height: 1.08rem;
  padding: 0 0.08rem;
}

.useCoupons .useCoupon span:nth-of-type(2) p:nth-of-type(1) {
  height: 0.21rem;
  font-size: 0.15rem;
  font-weight: 500;
  color: rgba(8, 16, 26, 1);
  line-height: 0.21rem;
  padding-top: 0.12rem;
}

.useCoupons .useCoupon span:nth-of-type(2) p:nth-of-type(2) {
  height: 0.34rem;
  font-size: 0.12rem;
  font-weight: 400;
  color: rgba(8, 16, 26, 1);
  padding-top: 0.08rem;
}

.useCoupons .useCoupon span:nth-of-type(2) p:nth-of-type(3) {
  height: 0.17rem;
  font-size: 0.12rem;
  font-weight: 400;
  color: rgba(159, 166, 174, 1);
  padding-top: 0.03rem;
}

.useCoupons .useCoupon span:nth-of-type(3) {
  display: inline-block;
  width: 0.4rem;
  height: 1.08rem;
  line-height: 1.08rem;
}

.useCoupons .useCoupon span:nth-of-type(3) em {
  width: 0.2rem;
  height: 0.2rem;
  border: 1px solid rgba(198, 205, 213, 1);
  border-radius: 50%;
  margin-left: 0.06rem;
}

.useCoupons .noUse {
  padding: 0 0.12rem;
  margin: 0.08rem 0;
  width: 3.19rem;
  height: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fbff;
}

.useCoupons .noUse span:nth-of-type(2) {
  width: 0.2rem;
  height: 0.2rem;
  border: 1px solid rgba(198, 205, 213, 1);
  border-radius: 50%;
}
</style>