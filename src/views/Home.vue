<template>
  <div class="home">
    <div class="card-list" v-for="item in articleList">
      <Card :bordered="false">
        <p slot="title" class="title">{{item.title}}<span class="date">{{item.createTime}}</span></p>
        <p>
          <mavonEditor class="markdown" codeStyle="dark" :value="item.content" :toolbarsFlag="toolbarsFlag"
                       :subfield="toolbarsFlag" defaultOpen="preview"></mavonEditor>
        </p>
        <div class="read-list">
          <span class="read-more" @click="goDetail(item.id)">阅读全文>></span>
        </div>
        <div>
          分类
          <Tag color="primary" type="border" @click.native="searchByCategory(item.classid)">{{item.classname}}</Tag>
          标签
          <Tag v-for="tag in item.lableArry" @click.native="searchByTag(tag.id)" color="primary">{{tag.name}}</Tag>
        </div>
      </Card>
    </div>
    <div class="empty" v-if="!articleList.length">没有相应的文章</div>
    <Page transfer style="z-index: 11;" :current="page" :total="total" @on-change="pageChange" show-elevator show-total/>
  </div>
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import {getArticleList, searchByCategoryId, searchByTagId} from '@/api/api.js'
export default {
  components: {
    mavonEditor
  },
  data() {
    return {
      toolbarsFlag: false,
      page: 1,
      total: 10,
      classid: '',
      tagid: '',
      keyword: '',
      articleList: []
    };
  },
  computed: {

  },
  watch:{   //监听路由变化
    $route:{
      handler: function(to, from){
        console.log('监听路由变化',to )
        console.log(to.query)
        this.changeRouter(to)
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    changeRouter(route) {
      // console.log(route)
      // console.log("请求路由啊!!!!!!")
      this.page = 1
      this.route = route;
      if (route.query.keyword) {
        // console.log("请求关键字")
        this.keyword = route.query.keyword
        this.greet(route.query.keyword)
      } else if (route.query.classid) {
        // console.log("请求分类的文章")
        this.classid = route.query.classid;
        this.getArticleByClassid(route.query.classid)
      } else if (route.query.tagid) {
        // console.log("请求标签的文章")
        this.tagid = route.query.tagid;
        this.getArticleByTagid(route.query.tagid)
      } else {
        // console.log('获取所有文章')
        this.greet()
      }
    },
    // 方法
    greet(keyword = '') {
      this.classid = '';
      this.tagid = ''
      let page = this.page
      getArticleList({page, keyword}).then(res => {
        // console.log(res)
        this.total = res.count
        res.list.forEach(item =>{
          item.content = item.content.replace(/.jpg/g,'.jpg/indexImg')
        })
        this.articleList = res.list
      })
    },
    goDetail(id) {
      // console.log(id)
      // this.$router.push({ name: 'detail', params: { articleId: id }})
      this.$router.push({path: '/detail', query: {articleId: id}});
    },

    pageChange(val) {
      // console.log("页面改变了。。。。",val)
      this.page = val;
      let {route} = this
      if (route.query.keyword) {
        // console.log("请求关键字")
        this.keyword = route.query.keyword
        this.greet(route.query.keyword)
      } else if (route.query.classid) {
        // console.log("请求分类的文章")
        this.classid = route.query.classid;
        this.getArticleByClassid(route.query.classid)
      } else if (route.query.tagid) {
        // console.log("请求标签的文章")
        this.tagid = route.query.tagid;
        this.getArticleByTagid(route.query.tagid)
      } else {
        // console.log('获取所有文章')
        this.greet()
      }

    },

    searchByCategory(classid) {
      this.$router.push({path: '/', query: {classid: classid}});
    },

    searchByTag(tagid) {
      this.$router.push({path: '/', query: {tagid: tagid}});
    },

    getArticleByClassid(classid) {
      let {page} = this;
      searchByCategoryId(classid, page).then(res => {
        // console.log(res)
        this.total = res.count
        this.articleList = res.list
      })
    },

    getArticleByTagid(tagid) {
      let {page} = this;
      searchByTagId(tagid, page).then(res => {
        // console.log(res)
        this.total = res.count
        this.articleList = res.list
      })
    }
  },
  mounted() {
    // console.log("加载啊。。。。。。",this.$route.query)
    this.changeRouter(this.$route)
  }
}


</script>

<!--<script lang="ts">-->
<!--import {Component, Vue, Provide, Watch} from "vue-property-decorator";-->
<!--import {mavonEditor} from 'mavon-editor'-->
<!--import 'mavon-editor/dist/css/index.css'-->
<!--import {getArticleList, searchByCategoryId, searchByTagId} from '@/api/api.js'-->
<!--// 引入组件-->
<!--@Component({-->
    <!--components: {-->
        <!--mavonEditor-->
    <!--}-->
<!--})-->
<!--export default class Home extends Vue {-->
    <!--// 数据-->
    <!--//@Provide() source = logo; // 图片动态url 赋值-->
    <!--@Provide() toolbarsFlag = false-->
    <!--page = 1-->
    <!--total = 10-->
    <!--classid = ''-->
    <!--tagid = '';-->
    <!--keyword = ''-->
    <!--articleList = []-->

    <!--// 声明周期钩子-->
    <!--mounted() {-->
        <!--// alert(process.env.NODE_ENV)-->
        <!--//   alert(process.env.BASE_URL)-->
        <!--// this.$Message.info('这是一条普通的提醒');-->
        <!--// console.log('参数', this.$route.query.keyword)-->
        <!--// if(this.classid)-->
        <!--// this.greet();-->
    <!--}-->

    <!--@Watch('$route', {immediate: true})-->
    <!--private changeRouter(route: Route) {-->
        <!--console.log(route)-->
        <!--console.log("请求路由啊!!!!!!")-->
        <!--this.page = 1-->
        <!--if (route.query.keyword) {-->
            <!--console.log("请求关键字")-->
            <!--this.keyword = route.query.keyword-->
            <!--this.greet(route.query.keyword)-->
        <!--} else if (route.query.classid) {-->
            <!--console.log("请求分类的文章")-->
            <!--this.classid = route.query.classid;-->
            <!--this.getArticleByClassid(route.query.classid)-->
        <!--} else if (route.query.tagid) {-->
            <!--console.log("请求标签的文章")-->
            <!--this.tagid = route.query.tagid;-->
            <!--this.getArticleByTagid(route.query.tagid)-->
        <!--} else {-->
            <!--console.log('获取所有文章')-->
            <!--this.greet()-->
        <!--}-->

    <!--}-->

    <!--beforeRouteEnter(to: Route, from: Route, next: () => void): void {-->
        <!--console.log('beforeRouteEnter');-->
        <!--next();-->
    <!--}-->

    <!--beforeRouteUpdate(to: Route, from: Route, next: () => void): void {-->
        <!--console.log('beforeRouteUpdate');//暂时不生效，版本问题-->
        <!--next();-->
    <!--}-->

    <!--beforeRouteLeave(to: Route, from: Route, next: () => void): void {-->
        <!--console.log('beforeRouteLeave');-->
        <!--next();-->
    <!--}-->

    <!--// // 计算属性-->
    <!--// get computedMsg() {-->
    <!--//     return "computed " + this.msg;-->
    <!--// }-->

    <!--// 方法-->
    <!--greet(keyword = '') {-->
        <!--this.classid = '';-->
        <!--this.tagid = ''-->
        <!--let page = this.page-->
        <!--getArticleList({page, keyword}).then(res => {-->
            <!--console.log(res)-->
            <!--this.total = res.count-->
            <!--this.articleList = res.list-->
        <!--})-->
    <!--}-->

    <!--goDetail(id) {-->
        <!--console.log(id)-->
        <!--// this.$router.push({ name: 'detail', params: { articleId: id }})-->
        <!--this.$router.push({path: '/detail', query: {articleId: id}});-->
    <!--}-->

    <!--pageChange(val) {-->
        <!--console.log(val)-->
    <!--}-->

    <!--searchByCategory(classid) {-->
        <!--this.$router.push({path: '/', query: {classid: classid}});-->
    <!--}-->

    <!--searchByTag(tagid) {-->
        <!--this.$router.push({path: '/', query: {tagid: tagid}});-->
    <!--}-->

    <!--getArticleByClassid(classid) {-->
        <!--let {page} = this;-->
        <!--searchByCategoryId(classid, page).then(res => {-->
            <!--// console.log(res)-->
            <!--this.total = res.count-->
            <!--this.articleList = res.list-->
        <!--})-->
    <!--}-->

    <!--getArticleByTagid(tagid) {-->
        <!--let {page} = this;-->
        <!--searchByTagId(tagid, page).then(res => {-->
            <!--// console.log(res)-->
            <!--this.total = res.count-->
            <!--this.articleList = res.list-->
        <!--})-->
    <!--}-->
<!--}-->
<!--</script>-->
<style scoped>
.card-list {
  text-align: left;
  margin: 15px 0px;
}

.markdown {
  min-height: 0;
}

.read-list {
  text-align: right;
  margin: 10px 0px;
}

.read-more {
  background: #a5c0e3;
  color: #fff;
  padding: 5px;
  cursor: pointer;
}

.empty {
  text-align: center;
  font-size: 18px;
  color: #999;
  margin-bottom: 10px
}

.title{
    font-size: 24px;
    height: 24px;
    line-height: 24px;
    padding-left: 5px;
    cursor: pointer;
    border-left: 3px solid transparent;
    display: inline-block;
    width: 100%;
    color: #17233d;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.date{
    float: right;
    font-size: 14px;
    font-weight: 400;
    color: #999;
}
</style>
