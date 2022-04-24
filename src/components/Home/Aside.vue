<template>
  <el-aside style="flex-basis: 12.5%">
    <div class="aside">
      <el-row>
        <el-col :span="24" v-for="v in this.routes" :key="v.id">
          <div
              class="router"
              v-bind:class="{ active: isActive(v.routerName) }"
              @click="redirectTo(v.routerName)"
          >
            <SvgIcon
                :icon-class="v.iconClass"
                :class="`${v.iconClass}-icon`"
            ></SvgIcon>
            <span>{{ v.title }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-aside>
</template>

<script>
import MenuBiz from "@/biz/Menu";

export default {
  name: "HomeAside",
  data() {
    return {
      routes: [],
    };
  },
  beforeMount() {
    this.initMenus();
  },
  mounted() {
    console.log("侧边连跳转的路由", this.routes);
  },
  computed: {},
  methods: {
    redirectTo(routeName) {
      if (this.$route.name === routeName) return false;
      this.$router.push({name: routeName});
    },
    isActive(routeName) {
      return routeName === this.$route.meta.routeName;
    },
    async initMenus() {
      this.routes = await MenuBiz.getMainMenuItems();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.el-aside {
  box-shadow: 2px 0px 10px rgb(0 0 0 / 10%);
}

.aside {
  background: $aside-background;
  height: 100%;

  .el-row {
    $height: 37px;
    box-sizing: content-box;
    height: $height;
    line-height: $height;
    $pad: 16px;
    padding: {
      left: $pad;
      right: $pad;
    }
    margin-bottom: 20px;

    &:first-child {
      padding: {
        top: 20px;
      }
    }

    &:last-child {
      margin-bottom: 0;
    }

    margin-bottom: 20px;
  }
}

.el-col {
  text-align: left;

  [class$="-icon"] {
    min-height: 20px;
    display: inline-block;
    margin-right: 9px;
    transform: scale(1.5) translateX(-80px);
  }

  [class$="-icon"] {
    filter: drop-shadow(#636d7e 80px 0);
  }

  .active {
    background: $aside-active-background;
    color: white;

    [class$="-icon"] {
      filter: drop-shadow(white 80px 0);
    }
  }

  div {
    padding-left: 20px;
    border-radius: 4px;
  }
}

.router {
  display: flex;
  align-items: center;
}
</style>
