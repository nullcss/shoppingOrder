<template>
  <div class="pay" v-model="maindata">
        <van-nav-bar title="支付页面" left-arrow @click-left="onClickLeft" />
        <van-cell-group class="groupItem">
        <van-cell is-link>
            <template slot="title">
            <div class="goods">
                <div class="pic"><img :src="maindata.goodinfo.pic"></div>
                <div class="info">
                    <p class="name">{{maindata.goodinfo.name}}</p>
                    <p class="price">
                        <span class="new">¥ <span>{{maindata.goodinfo.newprice}}</span></span>
                        <span class="old">原价 ¥ <span>{{maindata.goodinfo.oldprice}}</span></span>
                    </p>
                </div>
            </div>
            </template>
        </van-cell>
        <van-cell title="数量">
            <template slot>
            <span class="">
                <van-stepper v-model="maindata.value" />
            </span>
            </template>
        </van-cell>
        <van-cell title="小计">
            <template slot>
            <span class="totelPrice">¥ {{totelPrice}}.00</span>
            </template>
        </van-cell>
        </van-cell-group>
        <van-cell-group class="groupItem">
        <van-cell title="配送方式" is-link :value="maindata.deliver" @click=" deliverPop = true" />
        <van-cell title="支付方式" is-link :value="maindata.payment" @click="paymentPop = true" />
        </van-cell-group>
        <van-popup v-model="deliverPop" position="bottom">
            <van-radio-group v-model="maindata.deliver" @change="deliverPop = false">
                <van-cell-group class="radioList">
                    <van-cell class="item" v-for="(item , index) in deliverList" :key="index"><van-radio :name="item">{{item}}</van-radio></van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-popup>
        <van-cell-group>
        <van-field label="手机号" v-model="maindata.phoneNum" placeholder="请输入手机号" />
        <van-field label="收货地址" v-model="maindata.address" placeholder="请输入收货地址" />
        </van-cell-group>
        <button type="button">1111</button>
        <van-popup v-model="paymentPop" position="bottom">
            <van-radio-group v-model="maindata.payment" @change="paymentPop = false">
                <van-cell-group class="radioList">
                    <van-cell class="item"  v-for="(item,index) in paymentList" :key="index"><van-radio :name="item">{{item}}</van-radio></van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-popup>
        <van-submit-bar
            :price="totelPrice"
            button-text="提交订单"
            @submit="onSubmit"
            />
  </div>
</template>

<script>
export default {
  name: "payment",
  data() {
    return {
        maindata:{
            goodinfo: {
              pic:
                "https://img14.360buyimg.com/n0/jfs/t19675/225/773710352/249018/b643c07c/5aa8c829N4e425fd2.jpg",
              name:
                "联想(Lenovo)拯救者R720 15.6英寸大屏游戏笔记者R720 15.6英寸大屏游戏笔记者R720 15.6英寸大屏游戏笔记本电脑",
              newprice: "6888.00",
              oldprice: "8888.00"
            },
            deliver:"",
            payment:"",
            phoneNum: "",
            address: "",
            value: 1
            
        },
      deliverPop: false,
      paymentPop: false,
      deliverList: ["配送上门", "上门自提"],
      paymentList: ["支付宝", "微信"],

    };
  },
  computed: {
    totelPrice() {
      return this.maindata.value * this.maindata.goodinfo.newprice * 100;
    }
  },
  methods: {
    onClickLeft() {
      Toast("返回上一级");
    },
    onSubmit() {
        this.$dialog.alert({
            title: '提交信息',
            message: this.maindata
        });
        console.log(this.maindata)
    }
  }
};
</script>

<style lang="less" scoped>
.pay {
  width: 100vw;
  height: 100vh;
  background-color: #ededed;
}

.groupItem {
  margin-bottom: 10px;
}
.totelPrice {
  font-size: 16px;
  color: red;
}
.goods {
  display: flex;
  flex-direction: row;
  .pic {
    border: 1px solid #ddd;
    width: 0.7rem;
    height: 0.7rem;
    margin-right: 10px;
    img {
      max-width: 0.7rem;
    }
  }
  .info {
    p {
      margin: 0;
      line-height: 1.2;
      padding-right: 20px;
    }
    .name {
      height: 2.4em;
      overflow: hidden;
      // font-weight: 600;
    }
    .price {
      margin-top: 10px;
      .old {
        margin-left: 50px;
        color: #888;
      }
    }
  }
}
.van-cell__title{
    color: red;
}
</style>

