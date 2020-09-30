<template>
  <div class="lgWrapper">
    <div class="welcome">
      <h1>
        你好，
        <br />欢迎来到车多
      </h1>
    </div>
    <div class="logInfo">
      <p>
        <input
          @input="hasVal();hasPhone()"
          v-model="mobile"
          :class="{telNum:true}"
          type="tel"
          maxlength="11"
          placeholder="请输入手机号"
        />
      </p>
      <p>
        <input
          @input="hasVal()"
          v-model="password"
          class="codeNum"
          type="tel"
          maxlength="6"
          placeholder="请输入手机验证码"
        />
        <span
          :class="{getCode:true,font_gray:changeGray,hasTelNum:hasphone}"
          @click="getCode()"
        >{{getCodeText}}</span>
      </p>
    </div>
    <div :class="{login:true,realLogin:seen}" @click="toIndex()">
      <input type="submit" value="登录" />
    </div>
    <div class="lgBottom">
      登录即表示您同意
      <em>《车多服务协议》</em>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      mobile: "",
      password: "",
      seen: false,
      hasphone: false,
      countdown: 3,
      getCodeText: "获取验证码",
      changeGray: false,
    };
  },
  methods: {
    toIndex() {
      let reg = /^\d{11}$/,
        reg2 = /^\d{6}$/;
      if (reg.test(this.mobile) && reg2.test(this.password)) {
        this.$router.push("/index");
      }
    },
    hasVal() {
      if (this.mobile && this.password) {
        this.seen = true;
      } else {
        this.seen = false;
      }
    },
    hasPhone() {
      let reg = /^\d{11}$/;
      if (reg.test(this.mobile)) {
        this.hasphone = true;
      } else {
        this.hasphone = false;
      }
    },
    setTime() {
      if (this.countdown == 0) {
        this.changeGray = false;
        this.getCodeText = "重新发送";
        this.countdown = 3;
        return false;
      } else {
        this.changeGray = true;
        this.getCodeText = `(已发送${this.countdown}s)`;
        this.countdown--;
      }
      setTimeout( () => {
        this.setTime();
      }, 1000);
    },
    getCode() {
      if (this.hasphone == true) {
        this.setTime();
      }
    },
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lgWrapper {
  width: 3.15rem;
  padding: 0 0.3rem;
  margin: 0 auto;
}

.lgWrapper .welcome {
  padding-top: 0.6rem;
}

.lgWrapper .welcome h1 {
  font-size: 0.24rem;
  font-weight: 500;
  color: rgba(8, 16, 26, 1);
}

.lgWrapper .logInfo {
  padding-top: 0.43rem;
}

.lgWrapper .logInfo p {
  height: 0.37rem;
  line-height: 0.37rem;
  padding: 0.08rem 0;
  border-bottom: 1px solid #dfe2e6;
}

.lgWrapper .logInfo p input {
  width: 2.3rem;
  font-size: 0.15rem;
}

.lgWrapper .logInfo .getCode {
  font-size: 0.15rem;
  float: right;
  color: rgba(39, 130, 244, 1);
  opacity: 0.7;
}
.lgWrapper .logInfo .hasTelNum {
  opacity: 1;
}

.lgWrapper .login {
  margin-top: 1.62rem;
}

.lgWrapper .login input {
  width: 3.15rem;
  height: 0.45rem;
  background: rgba(39, 130, 244, 1);
  border-radius: 0.25rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  font-size: 0.18rem;
  opacity: 0.5;
}
.lgWrapper .realLogin input {
  opacity: 1;
}

.lgWrapper .lgBottom {
  position: fixed;
  bottom: 0.2rem;
  width: 2.03rem;
  height: 0.17rem;
  line-height: 0.17rem;
  padding: 0 0.56rem;
  font-size: 0.12rem;
  color: #9fa6ae;
}

.lgWrapper .lgBottom em {
  color: #2782f4;
}
.font_gray {
  color: #9fa6ae !important;
}
</style>
