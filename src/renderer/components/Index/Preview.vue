<template>
  <div class="responsive_page_frame with_header main-container">

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

                  <div class="playerAvatar profile_header_size online">
                    <div class="playerAvatarAutoSizeInner"><img class="sapicAva" :src="$store.state.user.avatar"></div>
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

              <div class="profile_leftcol">

                <div class="profile_customization_area">

                  <div class="profile_customization">
                    <div class="profile_customization_header">&nbsp;</div>

                    <div class="profile_customization_block">
                      <div class="screenshot_showcase">
                        <div class="screenshot_showcase_primary showcase_slot">
                          <div class="screenshot_showcase_screenshot">
                            <div class="profile_main_artbox" :style="{ 
                              backgroundImage: `url('${$store.state.background}')`,
                              width: `${$store.state.bgSize.w}px`,
                              height: `${$store.state.bgSize.h - 272}px`
                            }"> </div>
                            <!-- <img width="100%" style="max-width: 506px;" :src="$store.state.background"> -->
                          </div>
                          <div class="screenshot_showcase_itemname">
                          &nbsp;
                          </div>
                        </div>
                        <div class="screenshot_showcase_rightcol">
                          <div class="screenshot_showcase_smallscreenshot showcase_slot">
                            <div class="screenshot_showcase_screenshot">
                              <div class="profile_main_artbox_side1" :style="{ 
                                backgroundImage: `url('${$store.state.background}')`,
                                width: `${$store.state.bgSize.w}px`,
                                height: `${$store.state.bgSize.h - 272}px`
                              }"> </div>
                              <!-- <img width="100%" style="max-width: 100px;" :src="$store.state.background"> -->
                            </div>
                          </div>
                          <div class="screenshot_showcase_smallscreenshot screenshot_count">
                            <div class="screenshot_showcase_screenshot"> &nbsp; </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

.profile_header_bg {
  background: rgba(18, 21, 26, .9);
  opacity: .9;
}

.profile_background_overlay_content {
  background-color: #12151A;
  opacity: .9;
}

.profile_main_artbox_side1 {
  width: 100%;
  height: 850px;
  background-position: -1022px -271px;
}

.profile_customization {
  background-color: transparent;
}

.sapicAva{
  border-radius: 5px;
}

.main-container { 
  flex: 0 1 auto;
  user-select: none;
  cursor: default;
  border-radius: 0 0 10px 10px;
}

div {
  box-sizing: content-box;
}

.responsive_page_frame {
  color: #8F98A0;
}

.playerAvatar.online {
	background-color: #57cbde;
	background: linear-gradient( to bottom, rgba(83, 164, 196, 1) 5%, rgba(69, 128, 151, 1) 95%);
	filter: none;
}

.playerAvatar.online img{
	background: linear-gradient( to bottom, #41778f 5%, #3d697b 95%);
}

/* Below is Steam CSS */

div.profile_page {
	position: relative;
	min-width: 950px;
}

div.profile_page {
	background-image: url('https://steamcommunity-a.akamaihd.net/public/images/profile/profile_bg.jpg');
	background-repeat: repeat-x;
	background-color: #262627;
}

div.profile_page.has_profile_background {
	background-color: #000000;
	background-position: center top;
	background-repeat: no-repeat;
}

@media screen and (-webkit-min-device-pixel-ratio:0) {
	div.profile_page.has_profile_background {
		background-position: 49.999% 0;
	}
}

.profile_header_bg {
	position: relative;
	max-width: 1018px;
	min-height: 224px;
	padding-bottom: 16px;
	margin: 0 auto;
	background-repeat: no-repeat;
	background-position: center bottom;
}

.profile_header_bg_texture {
	max-width: 976px;
	min-height: 224px;
	margin: 0 auto;
	background-repeat: no-repeat;
	background-position: center;
}

.profile_header {
	position: relative;
	max-width: 926px;
	margin: 0 auto;
	padding-top: 24px;
}

.profile_header_content {
	position: relative;
	padding-top: 8px;
	color: #898989;
	font-size: 13px;
}

.profile_header_summary {
	overflow: hidden;
	padding-right: 18px;
}

.playerAvatar.profile_header_size {
	position: relative;
	width: 166px;
	height: 166px;
	border-radius: 5px;
}

.playerAvatar.profile_header_size .playerAvatarAutoSizeInner img {
	background: none;
	filter: none;
	display: block;
	padding: 0;
	width: 100%;
	height: 100%;
}

.playerAvatar.profile_header_size .playerAvatarAutoSizeInner {
	position: absolute;
	top: 2px;
	right: 2px;
	bottom: 2px;
	left: 2px;
}

.profile_header .playerAvatar.profile_header_size {
	float: left;
	margin-right: 18px;
}

.profile_header_badgeinfo {
	float: right;
}

.profile_header_badgeinfo_badge_area {
	width: 268px;
}

.profile_header_actions {
	white-space: nowrap;
}

.profile_header .persona_name {
	line-height: 40px;
	font-size: 24px;
	color: #ffffff;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	font-family: "Motiva Sans", Sans-serif;
	font-weight: 200;
	/* thin */
}

.profile_header .profile_header_centered_persona {
	position: absolute;
	left: 186px;
	right: 268px;
	white-space: nowrap;
}

.profile_content {
	position: relative;
	background-image: url('https://steamcommunity-a.akamaihd.net/public/images/profile/profile_content_bg.png');
	background-position: center;
	background-repeat: repeat-y;
	padding: 0 12px 64px 12px;
	width: 926px;
	margin: 0 auto;
	font-size: 13px;
}

.profile_content.has_profile_background {
	background: none;
	margin-top: -14px;
	overflow: hidden;
	padding-top: 14px;
}

.profile_content_inner {
	position: relative;
}

.profile_leftcol {
	width: 636px;
	float: left;
	box-sizing: initial;
}

.profile_customization {
	position: relative;
	background-position: top left;
	background-repeat: no-repeat;
	border-radius: 3px;
	padding: 0 10px 11px 10px;
	margin-bottom: 12px;
	font-size: 13px;
	overflow: hidden;
}

.profile_customization_header {
	font-family: "Motiva Sans", Sans-serif;
	font-weight: 200;
	/* thin */
	color: #5491cf;
	font-size: 20px;
	line-height: 30px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.showcase_slot {
	display: block;
	float: left;
	position: relative;
}

.screenshot_showcase_primary {
	width: 508px;
	max-width: 83%;
	float: left;
}

.screenshot_showcase_screenshot {
	border: 1px solid #000000;
	display: block;
	white-space: nowrap;
	overflow: hidden;
}

.screenshot_showcase_primary .screenshot_showcase_screenshot {
	margin-bottom: 4px;
}

.screenshot_showcase_itemname {
	word-wrap: break-word;
}

.screenshot_showcase_rightcol {
	float: right;
	max-width: 17%;
	width: 102px;
	text-align: center;
}

.screenshot_showcase_smallscreenshot {
	float: none;
	margin-bottom: 11px;
}

.screenshot_showcase_smallscreenshot.screenshot_count {
	display: block;
	height: 57px;
	line-height: 57px;
	background-color: #222223;
	color: #ffffff;
}

.profile_background_holder_content {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 0;
}

.profile_background_image_content {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-position: center -226px;
	background-repeat: no-repeat;
	z-index: 0;
}

.profile_background_overlay_content {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1;
}

@media screen and (max-width: 910px) {

}
</style>

<style scoped src="@/assets/css/motiva_sans.css"></style>