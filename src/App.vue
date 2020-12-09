<template>
  <div id="app">
    <div class="container-app">
      <aside class="sidebar">
        <List
          :lists="allListTasks"
          :activeItem="activeItem"
          @on-click="handleActiveItem"
        />
        <List
          :lists="lists"
          :activeItem="activeItem"
          @on-click="handleActiveItem"
        />
      </aside>
      <div class="tasklist"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import List from "./components/List.vue";
import menuImage from './assets/img/menu.png';

export default {
  name: "App",
  data() {
    return {
      lists: [],
      activeItem: null,
      allListTasks: [{
        name: 'Все задачи',
        icon: menuImage
      }]
    };
  },
  created() {
    axios
      .get("http://localhost:3004/lists?_expand=color&_embed=tasks")
      .then((resp) => (this.lists = resp.data));
  },
  methods: {
    handleActiveItem: function (id) {
      this.activeItem = id;
    },
  },
  components: {
    List,
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  font-weight: normal;
}
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.container-app {
  display: flex;
  width: 750px;
  min-height: 530px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.sidebar {
  background: #e5e5e5;
  width: 200px;
  border-right: 1px solid #f1f1f1;
  padding: 20px;
}

.tasklist {
  background: #fff;
}
</style>
