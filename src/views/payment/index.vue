<template>
  <div class="payment">
    <head-top goBack="true" headerTitle="支付页面" color="blue"></head-top>
    <section class="address" @click="push">
      <div class="left fr">
        <span class="location_icon">
          <i class="iconfont">&#xe70e;</i>
        </span>
        <div class="add_address" v-if="choosedAddress">请添加联系人</div>
        <div class="add_address" v-else>
            <div class="addressInfo fc">
                <span>{{chooseAddressInfo.name}} - {{chooseAddressInfo.tel}}</span>
                <span class="text">{{chooseAddressInfo.city}} {{chooseAddressInfo.area}}</span>
            </div>
        </div>
      </div>
      <div class="right">
        <i class="iconfont">&#xe7de;</i>
      </div>
    </section>
    <section class="payCon">
      <div class="goodDetial item">
        <div class="goodMain">
          <img :src="maindata.goodinfo.pic" alt="" class="goodPic">
          <div class="goodInfo fc">
            <span class="goodTitle">{{maindata.goodinfo.name}}</span>
            <span class="goodPrice">
               <span class="new"> ¥ {{maindata.goodinfo.newprice}}</span>
            <span class="old">原价
                  ¥ {{maindata.goodinfo.oldprice}}</span>
            </span>
          </div>
        </div>
        <span><i class="iconfont">&#xe7de;</i></span>
      </div>
      <div class="goodNum item">
        <span class="title">数量</span>
        <span><van-stepper v-model="maindata.goodNum" /></span>
      </div>
      <div class="total item">
        <span class="title">小计</span>
        <span class="price">¥ <span>{{totlePrice}}</span></span>
      </div>
    </section>
    <section class="payCon">
        <div class="item" @click="showSongFun">
        <span class="title">配送方式</span>
        <span>
            <span>{{maindata.songway}}</span>
            <i class="iconfont">&#xe7de;</i>
        </span>
      </div>
      <div class="item" @click="showPayFun">
        <span class="title">支付方式</span>
        <span>
            <span>{{maindata.payway}}</span>
            <i class="iconfont">&#xe7de;</i>
        </span>
      </div>
    </section>
    <transition name="fade">
      <div class="cover" v-if="showPay" @click="showPayFun"></div>
    </transition>
    <transition name="slid_up">
        <div class="PayWay" v-if="showPay">
        <header>支付方式</header>
        <ul>
            <li class="PayWayItem" :class="{choose: item.payWayname == maindata.payway}" v-for="item in psywaylist" @click="choosePayway(item)"
            :key="item.payWayId">
            <span>{{item.payWayname}}</span>
            <span><i class="iconfont">&#xe619;</i></span>
            </li>
        </ul>
        </div>
        <!-- <div class="addAddress" v-if="showaddAddress">
        <van-address-list v-model="chosenAddressId" :list="addressInfoList" @add="onAdd" @edit="onEdit" @select="chooseAddress" />
        </div> -->
    </transition>

    <transition name="fade">
      <div class="cover" v-if="showSong" @click="showSongFun"></div>
    </transition>
    <transition name="slid_up">
        <div class="PayWay" v-if="showSong">
        <header>配送方式</header>
        <ul>
            <li class="PayWayItem" :class="{choose: item.name == maindata.songway}" v-for="item in songlist" @click="chooseSongway(item)"
            :key="item.Id">
            <span>{{item.name}}</span>
            <span><i class="iconfont">&#xe619;</i></span>
            </li>
        </ul>
        </div>
        <!-- <div class="addAddress" v-if="showaddAddress">
        <van-address-list v-model="chosenAddressId" :list="addressInfoList" @add="onAdd" @edit="onEdit" @select="chooseAddress" />
        </div> -->
    </transition>
    <div class="button" @click="submit">提交订单</div>
  </div>
</template>

<script>
  import headTop from 'components/header/header'
  import {
    Stepper,
    AddressList
  } from "vant";
  export default {
    name: "payment",
    data() {
      return {
        value: 1,
        maindata: {
          goodinfo: {
            pic: "https://img14.360buyimg.com/n0/jfs/t19675/225/773710352/249018/b643c07c/5aa8c829N4e425fd2.jpg",
            name: "联想(Lenovo)拯救者R720 15.6英寸大屏游戏笔记者R720 15.6英寸大屏游戏笔记者R720 15.6英寸大屏游戏笔记本电脑",
            newprice: "6888.00",
            oldprice: "8888.00"
          },
          goodNum:1,
          payway: '',
          songway:''
        },
        showPay: false,
        showSong: false,
        psywaylist: [{
            payWayId: 1,
            payWayname: '支付宝'
          },
          {
            payWayId: 2,
            payWayname: '微信'
          }
        ],
        songlist: [{
            Id: 1,
            name: '配送上门'
          },
          {
            Id: 2,
            name: '上门自提'
          }
        ],
        showaddAddress: false,
        chosenAddressId: '',
        chooseAddressInfo:{}
      };
    },
    components: {
      [Stepper.name]: Stepper,
      [AddressList.name]: AddressList,
      headTop
    },
    computed: {
        addressInfoList() {
            return this.$store.state.newaddress
        },
        choosedAddress() {
            let newaddress = this.$store.state.newaddress
            if(JSON.stringify(newaddress) == "{}"){
                return true
            }else{
                this.chooseAddressInfo = newaddress
                return false
            }
        },
        totlePrice() {
            return this.maindata.goodNum * this.maindata.goodinfo.newprice;
        }
    },
    methods: {
      push() {
        this.$router.push("/choose")
      },
      showPayFun() {
        this.showPay = !this.showPay;
      },
      showSongFun() {
          this.showSong = !this.showSong;
      },
      choosePayway(item) {
        this.maindata.payway = item.payWayname;
        this.showPay = !this.showPay;
      },
      chooseSongway(item) {
        this.maindata.songway = item.name;
        this.showSong = !this.showSong;
      },
      chooseAddress(item) {
          this.maindata.addressInfo = item
          this.choosedAddress = false
          this.showaddAddress = false
      },
      submit() {
          this.maindata.totlePrice = this.totlePrice
          this.$store.commit("submitInfo",this.maindata)
          this.$router.push("/order")
          console.log(this.$store.state.submitInfo)

      }
    }
  };

</script>

<style lang="less" scoped>
  .address {
    min-height: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: url("../../assets/img/address_bottom.png") #fff left bottom repeat-x;
    background-size: auto 0.03rem;
    padding: 0 10px;
    .left {
      align-items: center;
      .location_icon {
        .iconfont {
          color: #333;
          font-size: 0.2rem;
          margin-right: 6px;
        }
      }
      .addressInfo{
          .text{
              margin-top: 6px;
              font-size: 0.13rem;
          }
      }
    }
  }

  .payCon {
    margin-top: 10px;
    padding: 0 10px;
    background-color: #fff;
    .item {
      border-bottom: 1px solid #f5f5f5;
      min-height: 0.6rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        color: #999;
        font-size: 0.14rem;
      }
      &:last-child {
        border: none;
      }
      .price {
        color: red;
      }
    }
    .goodDetial {
      padding: 10px 0;
      .goodMain {
        display: flex;
        justify-content: space-between;
        .goodPic {
          width: 80px;
          height: 80px;
          margin-right: 10px;
        }
        .goodInfo {
          font-size: 0.14rem;
          padding-right: 20px;
          justify-content: space-between;
          .goodTitle {
            height: 3.6em;
            overflow: hidden;
          }
          .goodPrice {
            display: flex;
            justify-content: space-between;
            vertical-align: bottom;
            align-items: flex-end;
            line-height: 1;
          }
          .new {
            font-size: 0.16rem;
          }
          .old {
            color: #999;
          }
        }
      }
    }
  }

  .cover {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .3);
    position: fixed;
    top: 0;
    z-index: 10;
  }

  .PayWay {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    z-index: 99;
    width: 100%;
    min-height: 2rem;
    header {
      background-color: #fafafa;
      font-size: 0.16rem;
      text-align: center;
      line-height: 0.4rem;
    }
    .PayWayItem {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      line-height: 0.6rem;
      .iconfont {
        font-size: 0.20rem;
        color: #eee;
      }
    }
    .choose {
      .iconfont {
        color: #3fd5bc;
      }
    }
  }



  .addAddress {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    position: fixed;
    top: 0;
    z-index: 999;
  }

</style>

