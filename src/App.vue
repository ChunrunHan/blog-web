<template>
  <div id="app">
    <Layout>
      <Header class="header flex">
        <div class="header-logo">RAIN-BlOG</div>
        <div>
          <div class="menu-show">
            <Menu mode="horizontal" theme="light" active-name="1" style="width: calc(100vw - 300px);">
              <MenuItem name="1" to="/">
                <Icon type="ios-paper"/>
                全部文章
              </MenuItem>
              <MenuItem name="2" to="/about">
                <Icon type="ios-people"/>
                分类标签
              </MenuItem>
            </Menu>
          </div>
          <div class="icon-show" style="width: calc(100vw - 300px);text-align: right">
            <Dropdown trigger="click" placement="bottom">
              <Icon type="md-menu" size="40" style="margin-right: 10px;"/>
              <!--<div style="position: absolute;right: 0px">-->
              <DropdownMenu slot="list" class="dropMenu">
                <DropdownItem>
                  <MenuItem name="1" to="/">
                    <Icon type="ios-paper"/>
                    全部文章
                  </MenuItem>
                </DropdownItem>
                <DropdownItem>
                  <MenuItem name="2" to="/about">
                    <Icon type="ios-people"/>
                    分类标签
                  </MenuItem>
                </DropdownItem>
              </DropdownMenu>
              <!--</div>-->

            </Dropdown>

          </div>
        </div>
      </Header>
      <Layout>
        <div class="slider-positon">
          <Sider ref="side1" collapsible :collapsed-width="0" width="300" v-model="isCollapsed" hide-trigger
                 class="sider">
            <div @mouseleave="show2 = false" @mouseover="show2 = true">
              <Avatar src="http://hanchunrun.cn/me.jpeg"
                      :class="{'avatar':true,'animated':true,'bounceIn':show2}"/>
            </div>
            <div class="desc name">RAIN</div>
            <div class="desc">千学万学，学做真人。</div>
            <div class="search">
              <Input search enter-button placeholder="根据标题搜索" v-model="keyword" @on-search="search"/>
              <div class="flex jc-between sider-icon">
                <Tooltip content="github" placement="top">
                  <i @mouseleave="icon1 = false" @mouseover="icon1 = true" @click="go($event)"
                     data-url="https://github.com/ChunrunHan"
                     :class="{'fa fa-github fa-5x animated':true,'col-git swing':icon1}"></i>
                </Tooltip>
                <Tooltip content="gitee" placement="top">
                  <i @mouseleave="icon2 = false" @mouseover="icon2 = true" @click="go($event)"
                     data-url="https://gitee.com/hanchunrun"
                     :class="{'fa fa-gratipay fa-5x animated':true,'col-xin heartBeat':icon2}"></i>
                </Tooltip>
                <Tooltip content="web" placement="top">
                  <i @mouseleave="icon3 = false" @mouseover="icon3 = true" @click="go($event)" data-url="http://admin.rainrain.xin"
                     :class="{'fa fa-html5 fa-5x animated':true,'col-h5 rubberBand':icon3}"></i>
                </Tooltip>

              </div>
            </div>
            <div>
              <img @click="addPrise" @mouseleave="prise = false" @mouseover="prise = true" src="./assets/prise.png"
                   alt=""
                   :class="{'prise animated':true,'jello':prise}">
              <div class="priseNum">{{priseNum}}</div>
            </div>

          </Sider>
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}"
                type="md-arrow-round-back" size="30"></Icon>
        </div>
        <Content style="background: #f0f0f0;height: calc(100vh - 60px);">
          <div class='container-wrapper'>
            <div class="banner">
              <img src="http://hanchunrun.cn/bg.png/webp" alt="">
              <div class="text-wrapper">
                <p>{{currentQuotes}}</p>
              </div>
            </div>
            <div class="selection">
              <router-view/>
            </div>
            <div class="footer flex">
              <div class="footer-item">
                <div>关于本站</div>
                <div>Theme by Rain</div>
                <div>备案号：鲁ICP备17037204号-2</div>
              </div>
              <div class="footer-item">
                <div>友情链接</div>
                <div @click="go($event)" data-url="https://www.jskou.com/">技术寇博客</div>
                <div @click="go($event)" data-url="http://fe.jskou.com/">前端艺术家</div>
              </div>
              <div class="footer-item">
                <div>联系方式</div>
                <div>QQ: 534123074</div>
                <div>wx: wxhzff</div>
              </div>
            </div>
          </div>
        </Content>
      </Layout>

    </Layout>

  </div>
</template>

<script>
import util from './util/util.js'
import { getPriseNum, addPriseNum } from '@/api/api.js'

export default {
  components: {},
  data() {
    return {
      isCollapsed: false,
      show2: false,
      icon1: false,
      icon2: false,
      icon3: false,
      prise: false,
      quotes: ['要一个完成，不要千万个开始', 'Whatever is worth doing is worth doing well', '你可能会迟到，但时间不会', '学习。是为了成为一个有温度懂情趣会思考的人', '行动是理想最高贵的表达', 'Action speaks louder than words'],
      currentQuotes: '',
      priseNum: 0,
      keyword:''
    };
  },
  computed: {
    rotateIcon() {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    go(e) {
      let url = e.target.dataset.url
      if (url === 'reload') {
        window.location.reload();
        return
      }
      util.jump(url)
    },
    getPrise() {
      getPriseNum().then(res => {
        this.priseNum = res
      })
    },
    addPrise() {
      let { priseNum } = this
      addPriseNum().then(res => {
        console.log(res)
        if(res){
          // this.priseNum = priseNum + 1
          this.getPrise()
        }
      })
    },
    search(){
      // alert(this.keyword)
      this.$router.push({path: '/', query: {keyword: this.keyword}});
    }
  },
  mounted() {
    var len = 6;//提示文字数，为了例子简单，所以只设6段文字
    var rnd = Math.floor(Math.random() * len);
    this.currentQuotes = this.quotes[rnd]
    this.getPrise();
  }
}


</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
}

.col-git {
  color: #2d8cf0;
}

.col-xin {
  color: #f44336;
}

.col-h5 {
  color: #f27032;
}

.header {
  padding: 0px !important;
  background: white !important;
  height: 60px !important;

  .header-logo {
    font-size: 40px;
    font-weight: 900;
    width: 300px;
    text-align: center;
    height: 60px;
    line-height: 60px;
    background: url(http://hanchunrun.cn/bg.png/webp) no-repeat;
    background-origin: border-box;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}



.menu-icon {
  transition: all .3s;
  position: fixed;
  left: 300px;
  padding: 5px;
  text-align: center;
  vertical-align: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 100%;
  top: 74px;
  color: white;
  z-index: 11111;
}

.rotate-icon {
  transform: rotate(-180deg);
  left: 0px;
}

.slider-positon {
  position: relative;
}

.icon-show {
  display: none;
}

.dropMenu {
  position: absolute;
  right: 0px;
  top: -4px;
  text-align: center;
  background: white;
}

.ivu-icon-md-menu:hover {
  color: dodgerblue;
}

.sider {
  background: #ffffff !important;
  height: calc(100vh - 60px);
  z-index: 100;
  color: #515a6e;

  .avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 50px auto 0;
    box-shadow: 0 0 5px 0.5px #999;
  }

  .desc {
    margin-top: 10px;
    text-align: center;
  }

  .name {
    font-size: 30px;
    font-weight: 700;
  }

  .search {
    width: 80%;
    margin: 30px auto 0;
  }

  .prise {
    width: 50px;
    height: 50px;
    margin-top: 50px;
    margin-bottom: 10px;
  }

  .priseNum {
    font-size: 20px;
    background: url(http://hanchunrun.cn/bg.png) no-repeat;
    background-origin: border-box;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .sider-icon {
    margin-top: 60px;
  }

}

.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 200px;
  background: #3c3c3c;
  padding: 20px 0;
}

.footer .footer-item {
  width: 30%;
  text-align: center;
  color: #fff;

  div {
    font-size: 14px;
    margin-top: 10px;
    color: #999;
    cursor: default;
  }
  div:first-child {
    color: #fff;
    font-weight: 700;
    font-size: 18px;
  }
}

.container-wrapper {
  /*min-height: calc(100vh - 260px);*/
  /*background: #f0f0f0;*/
  .banner {
    width: 100%;
    max-height: 400px;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
    }
    .text-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 0 20%;
      background: rgba(0, 0, 0, .3);
      text-align: center;
      color: #fff;
      p {
        font-size: 30px;
        line-height: 30px;
        font-family: Teko, sans-serif;
        text-shadow: 3px 3px 5px #3e3e3e;
        font-weight: 700;
        font-style: italic;
      }
    }
  }
  .selection {
    position: relative;
    max-width: 1200px;
    margin: auto;
    padding: 10px;
    min-height: calc(100vh - 560px);
  }
}

@media screen and (max-width: 920px) {
  .slider-positon {
    position: absolute;
  }
  .menu-show {
    display: none;
  }

  .icon-show {
    display: inline-block;
  }
  .footer {
    flex-direction: column;
    .footer-item {
      padding-bottom: 5px;
      border-bottom: 1px solid #999;
    }
  }

  .container-wrapper {
    /*min-height: calc(100vh - 260px);*/
    /*background: #f0f0f0;*/
    .selection {
      position: relative;
      max-width: 1200px;
      margin: auto;
      padding: 10px;
      min-height: calc(100vh - 496px);
    }
  }

}

.ivu-avatar>img{
  height: auto !important;
}
</style>
