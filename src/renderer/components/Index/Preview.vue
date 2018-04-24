<template>
  <div class="responsive_page_frame with_header main-container">
    <div class="responsive_header">
      <div class="responsive_header_content">
        <div id="responsive_menu_logo">
          <img src="https://steamcommunity-a.akamaihd.net/public/shared/images/responsive/header_menu_hamburger.png" height="100%">
          <div class="responsive_header_notification_badge_ctn">
            <div class="responsive_header_notification_badge notification_count_total_ctn has_notifications">
              <span class="notification_count">4</span>
            </div>
          </div>
        </div>
        <div class="responsive_header_logo">
          <img src="https://steamcommunity-a.akamaihd.net/public/shared/images/responsive/header_logo.png" height="36" border="0" alt="STEAM">
        </div>
      </div>
    </div>

    <div class="responsive_page_content_overlay">

    </div>

    <div class="responsive_fixonscroll_ctn nonresponsive_hidden ">
    </div>

    <div class="responsive_page_content">

      <div class="responsive_page_template_content">

        <div class="no_header profile_page has_profile_background " :style="{ backgroundImage: `url('${$store.state.background}')` }">

          <div class="profile_header_bg">

            <div class="profile_header_bg_texture">

              <div class="profile_header">

                <div class="profile_header_content">

                  <div class="profile_header_centered_persona">
                    <div class="persona_name" style="font-size: 24px;">
                      <span class="actual_persona_name">{{ $store.state.user.screenName }}</span>
                    </div>
                  </div>

                  <div class="playerAvatar profile_header_size in-game">
                    <div class="playerAvatarAutoSizeInner"><img :src="$store.state.user.avatar"></div>
                  </div>

                  <div class="profile_header_badgeinfo">

                    <div class="profile_header_badgeinfo_badge_area">
                    </div>

                    <div class="profile_header_actions">
                    </div>
                  </div>

                  <div class="profile_header_summary">
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div class="profile_content has_profile_background">

            <div class="profile_background_holder_content">
              <div class="profile_background_overlay_content"></div>
              <div class="profile_background_image_content" :style="{ backgroundImage: `url('${$store.state.background}')` }">
              </div>
            </div>
            <div class="profile_content_inner">

              <div class="profile_rightcol"></div>

              <div class="profile_leftcol">

                <div class="profile_customization_area">

                  <div class="profile_customization">
                    <div class="profile_customization_header">Artwork Showcase</div>

                    <div class="profile_customization_block">
                      <div class="screenshot_showcase">
                        <div class="screenshot_showcase_primary showcase_slot ">
                          <a class="screenshot_showcase_screenshot modalContentLink" href="">
                            <div class="profile_main_artbox" :style="{ 
                              backgroundImage: `url('${$store.state.background}')`,
                              width: `${$store.state.bgSize.w}px`,
                              height: `${$store.state.bgSize.h - 272}px`
                            }"> </div>
                            <!-- <img width="100%" style="max-width: 506px;" :src="$store.state.background"> -->
                          </a>
                          <div class="screenshot_showcase_itemname">
                          &nbsp;
                          </div>
                          <div class="screenshot_showcase_stats">
                            <span class="screenshot_showcase_stat" title="Up Votes">
                              <img class="screenshot_showcase_staticon" src="https://steamcommunity-a.akamaihd.net/public/images/sharedfiles/icons/icon_rate.png"> 1 </span>
                          </div>
                        </div>
                        <div class="screenshot_showcase_rightcol">
                          <div class="screenshot_showcase_smallscreenshot showcase_slot ">
                            <a class="screenshot_showcase_screenshot modalContentLink" href="">
                              <div class="profile_main_artbox_side1" :style="{ 
                                backgroundImage: `url('${$store.state.background}')`,
                                width: `${$store.state.bgSize.w}px`,
                                height: `${$store.state.bgSize.h - 272}px`
                              }"> </div>
                              <!-- <img width="100%" style="max-width: 100px;" :src="$store.state.background"> -->
                            </a>
                          </div>
                          <a class="screenshot_showcase_smallscreenshot screenshot_count" href="">
                            <div class="screenshot_showcase_screenshot"> &nbsp; </div>
                          </a>
                        </div>
                        <div style="clear: both;"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style="clear: both;"></div>
            </div>
          </div>

        </div>

      </div>
    </div>

    <div class="bgPreloader" :style="{
      position: 'fixed',
      opacity: 0
    }">
      <img :src="background.steamUrl" v-for="background in nextBackgrounds" v-bind:key="background.url">
      <img :src="$store.state.background" ref="currentBgHolder" @load="imageUpdated">
    </div>

  </div>
</template>

<script>
export default {
  computed: {
    nextBackgrounds () {
      return this.$store.state.nextRandomBackgrounds
    }
  },
  methods: {
    imageUpdated () {
      if (this.$refs.currentBgHolder.naturalHeight && this.$refs.currentBgHolder.naturalWidth) {
        this.$store.commit('setBgSize', {
          w: this.$refs.currentBgHolder.naturalWidth,
          h: this.$refs.currentBgHolder.naturalHeight
        })
      }
    }
  }
}
</script>

<style scoped>
.profile_main_artbox {
  width: 100%;
  height: 850px;
  background-position: -508px -271px;
}

.profile_main_artbox_side1 {
  width: 100%;
  height: 850px;
  background-position: -1022px -271px;
}

.main-container { 
  flex: 0 1 auto;
  user-select: none;
  cursor: default;
}

div {
  box-sizing: content-box;
}

.responsive_page_frame {
  color: #8F98A0;
}
</style>

<style scoped src="@/assets/css/buttons.css"></style>
<style scoped src="@/assets/css/globalv2.css"></style>
<style scoped src="@/assets/css/header.css"></style>
<style scoped src="@/assets/css/modalContent.css"></style>
<style scoped src="@/assets/css/motiva_sans.css"></style>
<style scoped src="@/assets/css/profilev2.css"></style>
<style scoped src="@/assets/css/shared_global.css"></style>
<style scoped src="@/assets/css/shared_responsive.css"></style>
<style scoped src="@/assets/css/stickers.css"></style>