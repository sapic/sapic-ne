<template lang="pug">
.backgrounds_container
    button.hover-button
        p Inventory
    .inventory-list
        - for (let a=0; a < 20; a++)
             .invetory-item
</template>

<style lang="stylus" scoped>
@import "../../assets/css/color"

.backgrounds_container
    position absolute
    bottom -175px
    right 9 px
    width calc(100% - 259px)
    height 200px
    background $color-main
    transition all 0.25s ease-in-out
    overflow-y hidden
    overflow-x hidden

    .inventory-list
        position relative
        background $color-black
        top 0px
        opacity 0
        transition all 0.25s ease-in-out
        .invetory-item
           width 150px
           height 70px
           border-radius 5px
           background $color-black
           float left
           margin 2px
           background url(https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/312510/7551c0e127ea5e79a8106287b124e41b61f982f5.jpg)
           background-size cover

    .hover-button
        position fixed
        width calc(100% - 259px)
        outline none
        cursor pointer
        height 25px
        right 18px
        border-radius 10px 0 0 0
        background $color-main
        border-style none
        p
            bottom 9px
            color $color-white
            position relative
            transition all 0.25s ease-in-out
    &:hover
        bottom 0
        overflow-y scroll
        .inventory-list
            opacity 1
        .hover-button
            p
                color transparent
</style>

<script>
export default {
  computed: {
    /* eslint-disable */
    bgURL: {
      set (value) {
        if (value.match(/\.(?:jpeg|jpg|png)$/i)) {
          this.$store.commit('setBackgroundURL', value)
        }
      },
      get () {
      }
    }
    /* eslint-enable */
  }
}
</script>
