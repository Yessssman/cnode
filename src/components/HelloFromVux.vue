<template>
  <div>
   <h6>测试actionsheet</h6>
    <actionsheet v-model="show" :menus="menus" show-cancel theme="android" @on-click-menu="myclick"></actionsheet>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import { Actionsheet } from 'vux'

export default {
  components: {
    Actionsheet
  },
  data () {
    return {
      show: true,
      menus: {
        menu1: '分享到朋友圈',
        menu2: '分享到新浪微博'
      }
    }
  },
  methods: {
    myclick: function (menukey, menuitem) {
      console.log(menukey)
      console.log(menuitem)
    }
  }
}
</script>

<style>

</style>
