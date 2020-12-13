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
          :isDeletedItem="true"
          @on-click="handleActiveItem"
          @delete-item="handleDeleteItem"
        />
        <List :lists="listAddTask" @on-click="toggleShowPopup" />
        <Popup
          v-if="isShowPopup"
          :lists="listColor"
          @add-list="handleAddList"
          @close-popup="toggleShowPopup"
        />
      </aside>
      <div class="tasklist">
        <TaskList
          v-for="(taks, index) in tasks"
          :key="index"
          :listTasks="taks"
          @add-task="handleAddTask"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import List from "./components/List.vue";
import Popup from "./components/Popup.vue";
import TaskList from "./components/TaskList.vue";
import { LIST_ALL_TASKS, LIST_ADD_TASK } from "./const.js";

export default {
  name: "App",
  data() {
    return {
      lists: [],
      listColor: [],
      tasks: [],
      activeItem: null,
      listAllTasks: LIST_ALL_TASKS,
      listAddTask: LIST_ADD_TASK,
      isShowPopup: false,
    };
  },
  created() {
    axios.get("/lists?_expand=color&_embed=tasks").then((resp) => {
      this.lists = resp.data;
      this.tasks = resp.data;
    });
  },
  mounted() {
    axios.get("/colors").then((resp) => (this.listColor = resp.data));
  },
  methods: {
    handleActiveItem: function (id) {
      this.activeItem = id;

      this.tasks = this.activeItem
        ? this.lists.filter((item) => item.id === id)
        : this.lists;
    },
    toggleShowPopup: function () {
      this.isShowPopup = !this.isShowPopup;
    },
    handleAddList: function (listObj) {
      this.isShowPopup = false;
      this.lists.push(listObj);
    },
    handleDeleteItem: function (id) {
      const newLIst = this.lists.filter((item) => item.id !== id);
      this.lists = newLIst;
    },
    handleAddTask: function () {
      console.log(1);
    },
  },
  components: {
    List,
    Popup,
    TaskList,
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
  height: 530px;
  max-height: 530px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.sidebar {
  background: #e5e5e5;
  width: 200px;
  border-right: 1px solid #f1f1f1;
  padding: 20px;
  flex-basis: 200px;
}

.tasklist {
  background: #fff;
  padding: 55px;
  overflow: auto;
  flex: 1;
}
.hidden {
  display: none;
}
.btn {
  padding: 10px 20px;
  text-align: center;
  background: #4dd599;
  border-radius: 4px;
  outline: 0 none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: #fff;
  &-w-100 {
    width: 100%;
  }
  &_cancel {
    background: #f4f6f8;
    color: #9c9c9c;
  }
}
fieldset {
  border: none;
}
.input-form {
  background: #ffffff;
  border: 1px solid #efefef;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 7px 11px;
  font-size: 14px;
  width: 100%;
  margin-bottom: 15px;
  &::placeholder {
    font-family: "Lato", sans-serif;
    font-style: normal;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.15px;

    color: #c7c7c7;
  }
}
</style>
