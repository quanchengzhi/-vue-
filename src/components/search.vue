<template>
  <div>
    <div class="sWrapper">
      <div class="sSearch">
        <span class="sFrame">
          <input @input="searchInfo" v-model="searchVal" type="text" name placeholder="搜索你感兴趣的门店" />
          <span class="empty thisHide"></span>
        </span>
        <router-link to="/index" class="sCancel">取消</router-link>
      </div>
    </div>
    <ul v-if="seen" class="allSStores" id="allSStores">
      <li v-for="list in searchList" :key="list.index" class="sStore clearfix" id="sStore">
        <span class="iconStore"></span>
        <router-link to="#" class="storeInfo">
          <p>{{list.name}}</p>
          <p>
            <span>{{list.position}}</span>
            <span>{{list.distance}}</span>
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      seen: false,
      searchVal:"",
      listData:[],
      searchList:[]
    };
  },
  mounted(){
    this.getStoreInfo();
  },
  methods: {
    searchInfo(){
      if(this.searchVal){
        this.seen = true;
        this.searchList = [];
        for(let info of this.listData){
          console.log(info.name)
          if(info.name.indexOf(this.searchVal) != -1){
            this.searchList.push(info);
          }
        }
      }else{
        this.seen = false;
      }
    },
    getStoreInfo() {
      let axios = this.axios;
      axios
        .get("/json/search.json")
        .then((response) => {
          // 请求的列表数据
          let arr = response.data;
          this.listData = this.listData.concat(arr);
        })
    },
  },
};
</script>

<style>
.sWrapper {
  width: 3.43rem;
  padding: 0 0.16rem;
  padding-top: 0.08rem;
  margin: 0 auto;
}

.sWrapper .sSearch {
  position: relative;
}

.sWrapper .sFrame {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 2.9rem;
  height: 0.39rem;
  line-height: 0.39rem;
  margin-right: 0;
  border-radius: 0.2rem;
  border: 1px solid rgba(223, 226, 230, 1);
}

.sWrapper .sFrame input {
  font-size: 0.15rem;
  color: rgba(8, 16, 26, 1);
  margin-left: 0.16rem;
}

.sWrapper .sFrame span {
  display: inline-block;
  width: 0.16rem;
  height: 0.17rem;
  margin-right: 0.12rem;
  background: url("../assets/img/icon_del@2x.png") no-repeat center;
  background-size: 0.16rem 0.17rem;
}

.sWrapper .sSearch .sCancel {
  position: absolute;
  font-size: 0.15rem;
  display: inline-block;
  width: 0.3.2rem;
  height: 0.21rem;
  color: rgba(8, 16, 26, 1);
  right: 0;
  top: 0.1rem;
}

.allSStores {
  width: 3.75rem;
  margin: 0 auto;
  margin-top: 0.07rem;
  border-top: 1px solid #dfe2e6;
}

.allSStores .sStore {
  position: relative;
  height: 0.66rem;
}

.allSStores .sStore .storeInfo {
  display: inline-block;
  width: 3.35rem;
  height: 0.54rem;
  margin-left: 0.4rem;
  margin-top: 0.12rem;
  border-bottom: 1px solid #dfe2e6;
}

.allSStores .sStore .storeInfo p:nth-of-type(1) {
  margin-bottom: 0.04rem;
  font-size: 0.16rem;
  font-weight: 500;
  color: rgba(8, 16, 26, 1);
}

.allSStores .sStore .storeInfo p:nth-of-type(2) {
  font-size: 0.12rem;
  color: #9fa6ae;
  display: flex;
  justify-content: space-between;
}

.allSStores .sStore .storeInfo p:nth-of-type(2) span:nth-of-type(2) {
  padding-right: 0.16rem;
}

.allSStores .sStore .iconStore {
  position: absolute;
  top: 0.16rem;
  left: 0.16rem;
  display: inline-block;
  width: 0.16rem;
  height: 0.16rem;
  background: url("../assets/img/icon_store@2x.png") no-repeat;
  background-size: 0.16rem 0.16rem;
}
</style>
