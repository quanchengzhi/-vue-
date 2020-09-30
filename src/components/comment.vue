<template>
  <div class="comWrapper">
    <div style="display:flex;align-items: center;">
      <div class="comHead">标准洗车</div>
      <div id="startone" class="block clearfix">
        <div class="star_score"></div>
      </div>
    </div>
    <div class="comContent clearfix">
      <textarea
        @input="inputText()"
        name
        id
        cols="30"
        rows="10"
        placeholder="分享你的洗车体验，可以帮助更多的车主"
        maxlength="100"
        v-model="textareaVal"
      ></textarea>
      <span>最多100字</span>
    </div>
    <div class="comPicture">
      <span :class="{usePic:true,thisOpacity:num<0}">
        <input
          ref="file0"
          @change="fang()"
          class="usePic thisOpacity"
          type="file"
          name="cover"
          accept="image/*"
          multiple
        />
      </span>
      <span :class="{usePic:true,thisOpacity:num<1}">
        <input
          ref="file1"
          @change="fang()"
          class="usePic thisOpacity"
          type="file"
          name="cover"
          accept="image/*"
          multiple
        />
      </span>
      <span :class="{usePic:true,thisOpacity:num<2}">
        <input
          ref="file2"
          @change="fang()"
          class="usePic thisOpacity"
          type="file"
          name="cover"
          accept="image/*"
          multiple
        />
      </span>
      <p>相关图片{{num}}/3张</p>
    </div>
    <router-link to="/index" :class="{comBtn:true,comBtn1:changeColor}">提交评价</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      infoOne: false,
      infoTwo: false,
      changeColor: false,
      textareaVal: "",
    };
  },
  mounted() {
    this.scoreFun($("#startone"));
    this.scoreFun($("#starttwo"), {
      fen_d: 22, //每一个a的宽度
      ScoreGrade: 5, //a的个数 10或者
    });
  },
  methods: {
    fang() {
      let el = this.$refs[`file${this.num}`];
      console.log(this.$refs[`file${this.num}`]);
      let oFReader = new FileReader();
      let file = el.files[0];

      oFReader.readAsDataURL(file);
      oFReader.onloadend = function () {
        el.parentElement.style.background = `url(${this.result}) no-repeat center center`;
        el.parentElement.style.backgroundSize = "100% 100%";
      };
      this.num++;
    },
    inputText() {
      this.infoTwo = true;
      if (this.infoOne && this.infoTwo) {
        this.changeColor = true;
      }
    },
    scoreFun(object, opts) {
      let vm = this;
      let defaults = {
        fen_d: 16,
        ScoreGrade: 10,
        nameScore: "fenshu",
        parent: "star_score",
        attitude: "attitude",
      };
      let options = $.extend({}, defaults, opts);
      let countScore = object.find("." + options.nameScore);
      let startParent = object.find("." + options.parent);
      let now_cli;
      let fen_d = options.fen_d;
      let len = options.ScoreGrade;
      startParent.width(fen_d * len);
      let preA = 5 / len;
      for (let i = 0; i < len; i++) {
        let newSpan = $("<a href='javascript:void(0)'></a>");
        newSpan.css({
          left: 0,
          width: fen_d * (i + 1),
          "z-index": len - i,
        });
        newSpan.appendTo(startParent);
      }
      startParent.find("a").each(function (index) {
        $(this).click(function () {
          vm.infoOne = true;
          if (vm.infoOne && vm.infoTwo) {
            vm.changeColor = true;
          }
          now_cli = index;
          show(index, $(this));
        });
        $(this).mouseenter(function () {
          show(index, $(this));
        });
        $(this).mouseleave(function () {
          if (now_cli >= 0) {
            let scor = preA * (parseInt(now_cli) + 1);
            startParent.find("a").removeClass("clibg");
            startParent.find("a").eq(now_cli).addClass("clibg");
            let ww = fen_d * (parseInt(now_cli) + 1);
            startParent.find("a").eq(now_cli).css({
              width: ww,
              left: "0",
            });
            if (countScore) {
              countScore.text(scor);
            }
          } else {
            startParent.find("a").removeClass("clibg");
            if (countScore) {
              countScore.text("");
            }
          }
        });
      });
      function show(num, obj) {
        let n = parseInt(num) + 1;
        let ww = fen_d * n;
        let scor = preA * n;
        object.find("a").removeClass("clibg");
        obj.addClass("clibg");
        obj.css({
          width: ww,
          left: "0",
        });
        countScore.text(scor);
      }
    },
  },
};
</script>

<style>
.comWrapper {
  width: 3.43rem;
  padding: 0 0.16rem;
  margin: 0 auto;
}

.comWrapper .comHead {
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.15rem;
  font-weight: 400;
  color: rgba(8, 16, 26, 1);
}

.comWrapper .comHead span {
  display: inline-block;
  transform: translateY(0.02rem);
  margin-left: 0.16rem;
  width: 0.16rem;
  height: 0.16rem;
  background: url("../assets/img/evaluation_icon_star_nor@2x.png");
  background-size: 0.16rem 0.16rem;
}

.comWrapper .comContent {
  position: relative;
  height: 1.6rem;
  border-top: 1px solid #dfe2e6;
  border-bottom: 1px solid #dfe2e6;
  color: rgba(198, 205, 213, 1);
}

.comWrapper .comContent span {
  position: absolute;
  font-size: 0.12rem;
  bottom: 0.12rem;
  right: 0;
}

.comWrapper .comContent textarea {
  padding: 0.12rem 0;
  width: 3.43rem;
  height: 1.36rem;
  border: none;
  outline: none;
  font-size: 0.15rem;
  font-weight: 400;
}

.comWrapper .comPicture {
  width: auto;
  padding-top: 0.12rem;
  height: 1.45rem;
}

.comWrapper .comPicture .usePic {
  display: inline-block;
  width: 1.12rem;
  height: 1.12rem;
  background: url("../assets/img/img_add\ picture@2x.png") no-repeat;
  background-size: 1.12rem 1.12rem;
  margin-right: 0.023rem;
}

.comWrapper .comPicture p {
  padding-top: 0.04rem;
  font-size: 0.12rem;
  color: rgba(159, 166, 174, 1);
}

.comWrapper .comBtn {
  display: inline-block;
  width: 3.43rem;
  height: 0.45rem;
  line-height: 0.45rem;
  text-align: center;
  margin-top: 0.4rem;
  background: rgba(39, 130, 244, 1);
  opacity: 0.5;
  border-radius: 0.25rem;
  font-size: 0.18rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.comWrapper .comBtn1 {
  opacity: 1;
}
/*星星样式*/

.block {
  margin: 0 0 20px 0;
  padding-top: 15px;
  padding-left: 20px;
  line-height: 21px;
}

.block .star_score {
  float: left;
}

.star_list {
  height: 21px;
  margin: 50px;
  line-height: 21px;
}

.block p,
.block .attitude {
  padding-left: 20px;
  line-height: 21px;
  display: inline-block;
}

.block p span {
  color: #c00;
  font-size: 16px;
  font-family: Georgia, "Times New Roman", Times, serif;
}

.star_score {
  background: url("../assets/img/stark2.png");
  width: 160px;
  height: 21px;
  position: relative;
}

.star_score a {
  height: 21px;
  display: block;
  text-indent: -999em;
  position: absolute;
  left: 0;
}

.star_score a:hover {
  background: url("../assets/img/stars2.png");
  left: 0;
}

.star_score a.clibg {
  background: url("../assets/img/stars2.png");
  left: 0;
}

#starttwo .star_score {
  background: url("../assets/img/starky.png");
}

#starttwo .star_score a:hover {
  background: url("../assets/img/starsy.png");
  left: 0;
}

#starttwo .star_score a.clibg {
  background: url("../assets/img/starsy.png");
  left: 0;
}

/*星星样式*/
.show_number {
  padding-left: 50px;
  padding-top: 20px;
}

.show_number li {
  width: 240px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-right: 5px;
  margin-bottom: 20px;
}

.atar_Show {
  background: url("../assets/img/stark2.png");
  width: 160px;
  height: 21px;
  position: relative;
  float: left;
}

.atar_Show p {
  background: url("../assets/img/stars2.png");
  left: 0;
  height: 21px;
  width: 134px;
}

.show_number li span {
  display: inline-block;
  line-height: 21px;
}
</style>