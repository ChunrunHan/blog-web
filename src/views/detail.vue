<template>
  <div class="about">
    <div>
      <div>
        <Card class="title" :bordered="false">
          <p>{{article.title}}<span class="date">{{article.createTime}}</span></p>
        </Card>
        <div class="bar">
         <div>
           分类：<Tag @click.native="searchByCategory(article.classid)" type="border" color="primary">{{article.classname}}</Tag>
           标签：<Tag @click.native="searchByTag(tag.id)" v-for="tag in article.lableArry" :key="tag.id" color="primary">{{tag.name}}</Tag>
         </div>
          <div>
            <em style="font-size: 20px;">阅读量 {{article.reading}}</em>
          </div>
        </div>
        <div class="container">
          <mavonEditor class="markdown" codeStyle="dark" :value="article.content" :toolbarsFlag="toolbarsFlag" :subfield="toolbarsFlag" defaultOpen="preview"></mavonEditor>
          <div class="toc">
          </div>
        </div>
      </div>
      <Spin size="large" fix v-if="loading"></Spin>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import wordcloud from 'vue-wordcloud'
import {getArticleDetailByid} from '@/api/api.js'
import util from '@/util/util.js'
export default {
  components: {
    mavonEditor,
    wordcloud
  },
  data() {
    return {
      toolbarsFlag: false,
      loading: false,
      article: {},
      tocShow: true,
      cardList: []
    };
  },
  computed: {

  },
  methods: {
    // 方法
    getArticleDetail(id) {
      getArticleDetailByid(id).then(res => {
        // console.log(res)
        this.article = res
        this.loading = false
        this.$nextTick(() => {
          util.genToc('.v-show-content', '.toc')
        })
      })
    },

    searchByCategory(classid) {
      this.$router.push({path: '/', query: {classid: classid}});
    },

    searchByTag(tagid) {
      this.$router.push({path: '/', query: {tagid: tagid}});
    }
  },
  mounted() {
    this.loading = true
    // console.log(this.$route.query.articleId)
    // let id = this.$route.params.articleId
    let id = this.$route.query.articleId
    this.getArticleDetail(id)
  }
}


</script>

<!--<script lang="ts">-->
<!--import { mavonEditor } from 'mavon-editor'-->
<!--import 'mavon-editor/dist/css/index.css'-->
<!--import {Component, Vue, Provide} from "vue-property-decorator";-->
<!--import wordcloud from 'vue-wordcloud'-->
<!--import {getArticleDetailByid} from '@/api/api.js'-->
<!--import util from '@/util/util.js'-->

<!--// 引入组件-->
<!--@Component({-->
    <!--components: {-->
        <!--wordcloud,-->
        <!--mavonEditor-->
    <!--}-->
<!--})-->
<!--export default class About extends Vue {-->
    <!--// 数据-->
    <!--@Provide() toolbarsFlag = false-->
    <!--@Provide() cardList = [1, 2, 3, 4, 5, 6, 7, 8, 9]-->
    <!--@Provide() defaultWords = []-->
    <!--loading = false-->
    <!--article = {}-->
    <!--tocShow = true-->

    <!--// 声明周期钩子-->
    <!--mounted() {-->
        <!--this.loading = true-->
        <!--console.log(this.$route.query.articleId)-->
        <!--// let id = this.$route.params.articleId-->
        <!--let id = this.$route.query.articleId-->
        <!--this.getArticleDetail(id)-->
    <!--}-->

    <!--// 方法-->
    <!--goTagList(id) {-->
        <!--console.log("......", id)-->
        <!--alert("greeting:");-->
    <!--}-->

    <!--wordClickHandler(name, value) {-->
        <!--console.log('wordClickHandler', name, value);-->
    <!--}-->

    <!--getArticleDetail(id) {-->
        <!--getArticleDetailByid(id).then(res => {-->
            <!--console.log(res)-->
            <!--this.article = res-->
            <!--this.loading = false-->
            <!--this.$nextTick(() => {-->
                <!--util.genToc('.v-show-content', '.toc')-->
            <!--})-->
        <!--})-->
    <!--}-->

    <!--searchByCategory(classid) {-->
        <!--this.$router.push({path: '/', query: {classid: classid}});-->
    <!--}-->

    <!--searchByTag(tagid) {-->
        <!--this.$router.push({path: '/', query: {tagid: tagid}});-->
    <!--}-->

<!--}-->
<!--</script>-->
<style scoped lang="scss">
.title{
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  z-index: 111111;
}
.date{
  float: right;
  font-size: 14px;
    color: #999;
    font-weight: normal;
}
.bar{
  z-index: 111111;
  background: #fff;
  padding: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container{
  display: flex;
}
.toc{
  color: #2185d0;
  width: 200px;
  height: 100%;
  background: #fff;
  padding: 10px;
  margin-left: 10px;
  font-size: 14px;
  z-index: 111111;
}
.markdown{
  flex: 1;
  height:100%
}
@media screen and (max-width: 920px)  {
  .toc {display: none}
  .date{
    display: block;
    float: none;
    margin-top: 10px;
  }
  .container{
    position:static
  }



}

.ivu-spin-fix{
  position: relative;
}


</style>
