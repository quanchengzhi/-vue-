<template>
  <div class="payWrapper">
    <div class="img_over"></div>
    <div class="toDingDan" @click="gotoOrder()">查看订单</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
    gotoOrder() {
      this.$router.push({
        path: "/order",
      });
    },
  },
};
</script>

<style scoped>
.payWrapper {
  width: 3.43rem;
  padding: 0 0.16rem;
  margin: 0 auto;
  overflow: hidden;
}

.payWrapper .img_over {
  width: 2.52rem;
  height: 1.41rem;
  margin-top: 1.12rem;
  margin-left: 0.46rem;
  background: url("../assets/img/img_over@2x.png") no-repeat center;
  background-size: 100%;
}

.payWrapper .toDingDan {
  display: inline-block;
  margin-top: 1.5rem;
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
</style>