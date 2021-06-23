import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const imgLoadedListenerMixin = {
  data() {
    return {
      imgLoadedCallback: null,
      newRefresh: null
    }
  },
  mounted() {
    //监听图片加载完成。调用newRefresh更新可滚动距离。
    this.newRefresh = debounce(this.$refs.scroll.refresh, 10);
    this.imgLoadedCallback = () => {
      this.newRefresh();
      // console.log(this.$route.path);
    };
    this.$bus.$on("imgLoaded", this.imgLoadedCallback);
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop,
  },
  methods: {
    //返回顶部。操作子组件，调用子组件的方法。
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 800);
    },
  }
}
