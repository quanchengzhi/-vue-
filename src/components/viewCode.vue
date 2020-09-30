<template>
  <div class="vWrapper">
    <div class="content">
      <div class="vHead">
        <p>标准洗车券（深圳适用）</p>
        <p>*线下抵扣10元，剩余金额需线下补差价</p>
        <p>有效期：2019.12.23至2020.12.23</p>
      </div>
      <div class="vCode">
        <p>向商家出示二维码或券号即可消费</p>
        <p>券号：2496 4721 7549</p>
      </div>
      <div class="vBottom">
        <span>查看适用网点</span>
        <span>使用前请确认网点信息</span>
      </div>
    </div>
    <div class="vExplain">
      <h2>使用说明</h2>
      <ul>
        <li>1. 到店后出示二维码或券码</li>
        <li>2.请告知商家本卡券由车多提供</li>
        <li>3.支持7座及以下轿车标准洗车一次</li>
        <li>4. 如有疑问请联系车多客服：0755-23711823</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.vWrapper {
  box-sizing: content-box;
  width: 3.43rem;
  padding: 0 0.16rem;
  padding-top: 0.17rem;
  margin: 0 auto;
}

.vWrapper .content {
  width: 3.19rem;
  height: 3.72rem;
  padding: 0 0.12rem;
}

.vWrapper .content .vHead {
  height: 0.97rem;
  border-bottom: 1px dashed #dfe2e6;
}

.vWrapper .content .vHead p {
  padding-top: 0.04rem;
  font-size: 0.12rem;
  font-weight: 400;
  color: #08101a;
}

.vWrapper .content .vHead p:nth-of-type(1) {
  padding-top: 0.12rem;
  font-size: 0.2rem;
  font-weight: 500;
  color: rgba(8, 16, 26, 1);
}

.vWrapper .content .vHead p:nth-of-type(3) {
  color: #9fa6ae;
}

.vWrapper .content .vCode {
  height: 1.98rem;
  background: url("../assets/img/code.png") no-repeat center;
  background-size: 1.2rem 1.2rem;
  padding: 0.25rem 0.7rem 0 0.7rem;
}

.vWrapper .content .vCode p:nth-of-type(1) {
  width: 1.8rem;
  height: 0.17rem;
  line-height: 0.17rem;
  text-align: center;
  font-size: 0.12rem;
  font-weight: 400;
  color: rgba(159, 166, 174, 1);
}

.vWrapper .content .vCode p:nth-of-type(2) {
  width: 1.8rem;
  height: 0.22rem;
  line-height: 0.22rem;
  text-align: center;
  padding-top: 1.4rem;
  font-size: 0.16rem;
  font-weight: 500;
  color: rgba(8, 16, 26, 1);
}

.vWrapper .content .vBottom {
  height: 0.5rem;
  border-top: 1px solid #dfe2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vWrapper .content .vBottom span:nth-of-type(1) {
  font-size: 0.15rem;
  font-weight: 400;
  color: rgba(8, 16, 26, 1);
}

.vWrapper .content .vBottom span:nth-of-type(2) {
  font-size: 0.12rem;
  font-weight: 400;
  color: rgba(159, 166, 174, 1);
  padding-right: 0.16rem;
  background: url("../assets/img/icon_on@2x.png") no-repeat right center;
  background-size: 0.16rem 0.16rem;
}

.vWrapper .vExplain {
  padding-top: 0.12rem;
}

.vWrapper .vExplain h2 {
  font-size: 0.14rem;
  font-weight: 500;
  color: rgba(8, 16, 26, 1);
}

.vWrapper .vExplain ul {
  padding-top: 0.03rem;
}

.vWrapper .vExplain ul li {
  font-size: 0.12rem;
  font-weight: 400;
  color: rgba(159, 166, 174, 1);
  padding-bottom: 0.05rem;
}
</style>