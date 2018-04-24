<template lang="pug">
  .menu__window
    .menu__window-buttons
      .menu__window-button(@click="$store.dispatch('downloadZip')")
        .menu__window-button-text Download ZIP
      
      .menu__window-button(@click="$store.dispatch('randomBackground')")
        .menu__window-button-text Random BG
      
      .menu__window-button(@click="$store.dispatch('getCurrentBg')")
        .menu__window-button-text Get this BG

      a(href="https://discord.gg/jnqnHuX" class="menu__window-discord" target="_blank")
        img.menu__window-discord.discord-img(
          src="https://discordapp.com/api/guilds/304986224467378177/widget.png?style=banner2"
        )

      .menu__window-section-container

        .menu__window-button-header
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
    }
  }
}
</script>

<style scoped lang="stylus">
.menu__window
  height 100%
  width 250px
  background #363F49
  flex-shrink 0
  user-select none

  &-section-container
    padding-top 10px
    padding-bottom 10px

  &-button-header
    border 1px solid gray 
    border-radius 5px
    position relative
    left 16px
    width 220px
    height 15px
    padding 15px 10px
    margin-top 5px
    text-align center
    cursor default

  &-discord
    left 8px
    width 220px
    height 52px
    position relative
    margin-top 5px
    border-radius 5px

  &-button
    transition: background-color 0.25s ease
    border 1px solid gray 
    border-radius 5px
    position relative
    left 16px
    width 220px
    height 20px
    padding 20px 10px
    cursor pointer
    margin-top 5px
    text-align center
    transition: filter 0.25s ease

    &:hover
      transition: filter 0.25s ease
      filter: drop-shadow( 0px 3px 10px black);
      transition: background-color 0.25s ease
      background-color #5f6873

    &-text
      position relative
      bottom: 11px
      text-shadow: 0px 4px 10px black;
      color #ffffff

  &-scale
    &__container
      display flex
      flex-direction row
      flex-wrap wrap
      justify-content space-between
      padding-left 16px
      padding-right 14px

    &__input
      display none

      &:checked
        & + label
          background #101922

    &__label
      transition: all 0.25s ease
      border 1px solid gray 
      border-radius 5px
      cursor pointer
      margin-top 5px
      text-align center
      width 48%
      flex 0 0 auto
      padding 10px

      &:hover
        background #5f6873

    &__button
      bottom: 11px
      text-shadow: 0px 4px 10px black;
      color #ffffff

.discord-img
  transition: box-shadow 0.25s ease
  
  &:hover
    box-shadow 0px 3px 10px black
    transition: box-shadow 0.25s ease
</style>
