<template>
  <div class="wrapper">
    <title-bar />
    <section class="body__wrapper">
      <menu-window />
      <div class="preview__window">
        <div 
        class="zoom_out" 
        :style="{
          transform: `scale(${scalePercent})`,
          width: `calc(100% / ${scalePercent}) !important`,
          height: `calc(100% / ${scalePercent}) !important`,
        }"
        >
          <preview class="" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'

import Preview from './Index/Preview'
import TitleBar from './Index/TitleBar'
import MenuWindow from './Index/MenuWindow'

export default {
  components: {
    Preview,
    TitleBar,
    MenuWindow
  },
  data () {
    return {
      animatedScale: this.$store.state.previewScale
    }
  },
  computed: {
    scalePercent () {
      return this.animatedScale / 100
    },
    previewScale () {
      return this.$store.state.previewScale
    }
  },
  watch: {
    previewScale: function (newValue) {
      console.log('new preview scale', newValue)
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      let that = this

      new TWEEN.Tween({tweeningValue: this.animatedScale})
        .to({tweeningValue: this.previewScale}, 375)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function (o, n, q) {
          that.animatedScale = o.tweeningValue
        })
        .start()

      animate()
    }
  }
}
</script>

<style scoped lang="stylus">
.body__wrapper {
  height calc(100% - 30px)
  display flex
  flex-direction row
  background-color #12151A
}

.preview__window {
  height 100%
  flex 1 1 auto
  overflow-y scroll
  overflow-x hidden
  border-top-left-radius 20px
  background black
}

.zoom_out
  margin: 0;
  transform-origin: 0 0;

  // &_50
  //   transform: scale(.5);

  //   width: calc(100% / .5) !important
  //   height calc(100% / .5) !important

  // &_75
  //   transform-origin: 0 0;
  //   transform: scale(.75);
  //   width: calc(100% / .75) !important
  //   height calc(100% / .75) !important

  // &_100
  //   transform-origin: 0 0;
  //   transform: scale(1);
  //   width: calc(100% / 1) !important
  //   height calc(100% / 1) !important

  // &_125
  //   transform-origin: 0 0;
  //   transform: scale(1.25);
  //   width: calc(100% / 1.25) !important
  //   height calc(100% / 1.25) !important

.wrapper {
  display: flex
  flex-direction column
}

.hidden {
  display:none
}
</style>

<style>
button, a {
  -webkit-app-region: no-drag;
}

html, body {
  height: 100%;
}

body {
  margin: 0;
  font-family: "Product Sans";
}


#app {
  height: 100%;
}

.layout_wrapper, .wrapper {
  height: 100%;
}

::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: #12151A;
  transition: background-color 0.25s ease;
}
::-webkit-scrollbar-thumb:hover {
  transition: background-color 0.25s ease;
  background-color: #1c2129;
}
::-webkit-scrollbar-thumb:active {
  background: #272d38;
}
::-webkit-scrollbar-track {
  background: #666666;
}
::-webkit-scrollbar-track:hover {
  background: #666666;
}
::-webkit-scrollbar-track:active {
  background: #333333;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
