<template lang="pug">
.backgrounds_container
    button.hover-button
        p invetory
    - for (let a=0; a < 10; a++)
        .invetory-item
</template>

<style lang="stylus">

$color-1 = #12151a
$color-2 = #000
$color-3 = #08090b
$color-4 = #1c2129
$color-5 = #fff
$color-6 = rgba(0,0,0,0.4)
$color-7 = #36bbf7
$color-8 = #702df9
$color-9 = #272d38

.backgrounds_container
    position absolute
    bottom -200px
    right 0
    width calc(100% - 250px)
    height 200px
    background $color-1
    transition bottom 300ms ease-in-out
    .invetory-item
        width 150px
        height 70px
        background $color-2
        float left 
        margin 2px
        background url(https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/312510/7551c0e127ea5e79a8106287b124e41b61f982f5.jpg)
        background-size cover
    .hover-button
        position absolute
        float right
        outline none 
        cursor pointer
        width 100px
        height 25px
        bottom 200px
        right 9px
        position absolute
        border-radius 10px 0 0 0
        background $color-1
        border-style none
        p
            bottom 5px
            color $color-5
            position relative
    &:hover
        bottom 0
</style>

// Needs to be added to routing