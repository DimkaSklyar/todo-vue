<template>
  <div id="app">
    <div class="container-app">
      <aside class="sidebar">
        <List
          :lists="listAllTasks"
          :activeItem="activeItem"
          @on-click="handleActiveItem"
        />
        <List
          :lists="lists"
          :activeItem="activeItem"
          @on-click="handleActiveItem"
        />
        <List
          :lists="listAddTask"
          :activeItem="activeItem"
          @on-click="showPopup"
        />
        <Popup v-if="isShowPopup" :lists="listColor" @add-list="handleAddList" />
      </aside>
      <div class="tasklist"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import List from "./components/List.vue";
import Popup from "./components/Popup.vue";
import { LIST_ALL_TASKS, LIST_ADD_TASK } from "./const.js";

export default {
  name: "App",
  data() {
    return {
      lists: [],
      listColor: [],
      activeItem: null,
      listAllTasks: LIST_ALL_TASKS,
      listAddTask: LIST_ADD_TASK,
      isShowPopup: false,
    };
  },
  created() {
    axios
      .get("/lists?_expand=color&_embed=tasks")
      .then((resp) => (this.lists = resp.data));
  },
  mounted() {
    axios.get("/colors").then((resp) => (this.listColor = resp.data));
  },
  methods: {
    handleActiveItem: function(id) {
      this.activeItem = id;
    },
    showPopup: function() {
      this.isShowPopup = !this.isShowPopup;
    },
    handleAddList: function(listObj) {
      this.isShowPopup = false;
      this.lists.push(listObj);
    },
  },
  components: {
    List,
    Popup,
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
.hidden {
  display: none;
}
.btn {
  padding: 10px 0;
  text-align: center;
  background: #4dd599;
  border-radius: 4px;
  width: 100%;
  outline: 0 none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: #fff;
}
</style>
