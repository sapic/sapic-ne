<template lang="pug">
  .menu__window
    .menu__window-buttons
      .menu__window-button.menu__window-button-download(@click="$store.dispatch('downloadZip')")
        .menu__window-button-text Download ZIP
      
      .menu__window-button(@click="$store.dispatch('randomBackground')")
        .menu__window-button-text Random BG
      
      .menu__window-button(@click="$store.dispatch('getCurrentBg')")
        .menu__window-button-text Get this BG

      .menu__window-section-container
        
      input.menu__window-button.textbox.noclick#urltextbox(placeholder="Paste a background URL here", v-model="bgURL")

      .menu__window-item-discord(@click="$store.dispatch('openDiscord')")
          img.menu__window-discord(
            src="https://discordapp.com/api/guilds/304986224467378177/widget.png?style=banner2"
          )

      .menu__window-section-container

        .menu__window-button.noclick.small
          .menu__window-button-text Zoom Scale:

        .menu__window-scale__container
          input.menu__window-scale__input(
            name="scale"
            type="radio"
            value="50"
            v-model="previewScale"
            id="scale50"
          )
          label(for="scale50").menu__window-scale__label
            .menu__window-scale__button 50%

          input.menu__window-scale__input(
            name="scale"
            type="radio"
            value="75"
            v-model="previewScale"
            id="scale75"
          )
          label(for="scale75").menu__window-scale__label 
            .menu__window-scale__button 75%

          input.menu__window-scale__input(
            name="scale"
            type="radio"
            value="100"
            v-model="previewScale"
            id="scale100"
          ) 
          label(for="scale100").menu__window-scale__label
            .menu__window-scale__button 100%

          input.menu__window-scale__input(
            name="scale"
            type="radio"
            value="125"
            v-model="previewScale"
            id="scale125"
          )
          label(for="scale125").menu__window-scale__label
            .menu__window-scale__button 125%
    .menu__window-credits
      .menu__window-credits-text Made with ❤️ by TrueCarry and The Oddball

</template>

<script>
export default {
  computed: {
    previewScale: {
      get () {
        return this.$store.state.previewScale
      },
      set (value) {
        this.$store.commit('setPreviewScale', value)
      }
    },
    bgURL: {
      set (value) {
        if (value.match(/\.(?:jpeg|jpg|png)$/i)) {
          this.$store.commit('setBackgroundURL', value)
        }
      },
      get () {
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.menu__window
  height 100%
  width 250px
  background #12151A
  flex-shrink 0
  user-select none
  display flex
  flex-direction column
  align-items center

  &-section-container
    margin-top 10px

  &-discord
    margin 10px 10px 0 10px
    transition: filter 0.25s ease
    text-align center
    display flex
    cursor pointer
    height 55px
    border-radius 3px

    &:hover
      filter: drop-shadow( 0px 3px 10px black)
      transition: filter 0.25s ease

  &-button
    background-color #08090b
    transition: background-color 0.25s ease
    border-radius 3px
    cursor pointer
    margin 10px 10px 0 10px
    text-align center
    display flex
    align-items center
    justify-content center

    &:hover
      transition: background-color 0.25s ease
      background-color #1c2129

    &-text
      bottom: 11px
      font-size 17px
      font-weight 300
      color #ffffff
      margin 15px 0

    &.noclick
      cursor default
      filter initial 
      background-color #08090b

    &.textbox
      cursor text
      width 232px
      height 30px
      color #ffffff
      border none
      outline none
      padding-top: 5px;
      padding-bottom: 5px;

    &.small
      .menu__window-button-text
        margin 4px
        font-size 14px

    &-download
      background linear-gradient( to bottom, #799905 5%, #536904 95%)

      &:hover
       background linear-gradient( to bottom, #b6d908 5%, #80a006 95%);
  
  &-item
    transition: background-color 0.25s ease
    cursor pointer
    margin 10px 10px 0 10px
    text-align center
    transition: filter 0.25s ease
    display flex
    align-items center
    justify-content center

    &:hover
      transition: filter 0.25s ease
      filter: drop-shadow( 0px 3px 10px black);
      transition: background-color 0.25s ease
      background-color #1c2129

    &-text
      bottom: 11px
      color #ffffff
      margin 0

  &-scale
    &__container
      display flex
      flex-direction row
      flex-wrap wrap
      justify-content space-between
      padding 0 10px

    &__input
      display none

      &:checked
        & + label
          background #272d38
          cursor default

    &__label
      transition: all 0.25s ease
      background-color #08090b
      border-radius 3px
      cursor pointer
      margin-top 5px
      text-align center
      width 38%
      flex 0 0 auto
      padding 12px

      &:hover
        background #1c2129

    &__button
      bottom: 11px
      text-shadow: 0px 4px 10px black;
      color #ffffff

  &-credits
    position absolute 
    bottom 0

    &-text
      color #ffffff
      font-size 11px
      margin-bottom 5px
</style>
