<template>
  <div class="about">
    <div style="background:#eee;text-align: left">
      <Card :bordered="false">
        <p slot="title">分类</p>
        <div>
          <Tag type="dot" v-for="item in cardList" @click.native="searchByCategory(item.categoryId)" color="primary">
            {{item.categoryName}}({{item.count}})
          </Tag>
        </div>
      </Card>
    </div>
    <div class="mt-10 text-left">
      <Card :bordered="false">
        <p slot="title">标签</p>
        <div style="height: 500px">
          <wordcloud
              :data="defaultWords"
              nameKey="tagName"
              valueKey="count"
              :showTooltip="false"
              fontScale="log"
              :fontSize="[40,150]"
              :wordClick="wordClickHandler">
          </wordcloud>
        </div>
      </Card>

    </div>
  </div>
</template>
<script>
import wordcloud from "vue-wordcloud"
import {getTagsAndCategories} from '@/api/api.js'
export default {
  components: {
    wordcloud
  },
  data() {
    return {
      cardList: [],
      defaultWords: []
    };
  },
  computed: {

  },
  methods: {
    // 方法
    wordClickHandler(name, value) {
      // console.log('wordClickHandler', name, value);
      // this.searchByTag()
    },

    getTagsAndCategoriesList() {
      getTagsAndCategories().then(res => {
        // console.log(res)
        this.defaultWords = res.tagsCount
        this.cardList = res.categoriesCount
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
    this.getTagsAndCategoriesList()
  }
}


</script>

<!--<script lang="ts">-->
<!--import {Vue, Provide} from "vue-property-decorator";-->
<!--import Component from 'vue-class-component'-->
<!--import wordcloud from "vue-wordcloud"-->
<!--import {getTagsAndCategories} from '@/api/api.js'-->

<!--// 引入组件-->
<!--@Component({-->
    <!--components: {-->
        <!--wordcloud-->
    <!--}-->
<!--})-->
<!--export default class About extends Vue {-->
    <!--// 数据-->
    <!--@Provide() cardList = []-->
    <!--@Provide() defaultWords = []-->

    <!--// 声明周期钩子-->
    <!--mounted() {-->
        <!--this.getTagsAndCategoriesList()-->
    <!--}-->

    <!--// 方法-->
    <!--goClass(id) {-->
        <!--console.log("......", id)-->
        <!--alert("greeting:");-->
    <!--}-->

    <!--wordClickHandler(name, value) {-->
        <!--console.log('wordClickHandler', name, value);-->
        <!--// this.searchByTag()-->
    <!--}-->

    <!--getTagsAndCategoriesList() {-->
        <!--getTagsAndCategories().then(res => {-->
            <!--console.log(res)-->
            <!--this.defaultWords = res.tagsCount-->
            <!--this.cardList = res.categoriesCount-->
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

</style>
