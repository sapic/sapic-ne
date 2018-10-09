<template lang="pug">
.backgrounds_container
    button.hover-button
        p Inventory
    - for (let a=0; a < 20; a++)
        .invetory-item
</template>

<style lang="stylus" scoped>
@import "../../assets/css/color"

.backgrounds_container
    position absolute
    bottom -175px
    right 0
    width calc(100% - 250px)
    height 200px
    background $color-main
    transition bottom 300ms ease-in-out
    overflow scroll
    .invetory-item
        width 150px
        height 70px
        background $color-black
        float left 
        margin 2px
        background url(https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/312510/7551c0e127ea5e79a8106287b124e41b61f982f5.jpg)
        background-size cover
    .hover-button
        position relative
        outline none 
        cursor pointer
        width 100%
        height 25px
        right 9px
        border-radius 10px 0 0 0
        background $color-main
        border-style none
        p
            bottom 5px
            color $color-white
            position relative
    &:hover
        bottom 0
</style>
