<template>
  <div id="app">
    <div class="container-app">
      <aside class="sidebar">
        <template v-if="lists.length">
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
        </template>
        <List :lists="listAddTask" @on-click="toggleShowPopup" />
        <Popup
          v-if="isShowPopup"
          :lists="listColor"
          @add-list="handleAddList"
          @close-popup="toggleShowPopup"
        />
      </aside>
      <div class="tasklist">
        <template v-if="lists.length && activeItem">
          <TaskList :listTasks="activeItem" @add-task="handleAddTask" />
        </template>
        <template v-else-if="lists.length">
          <div v-for="(tasks, i) in lists" :key="i">
            <TaskList :listTasks="tasks" @add-task="handleAddTask" />
          </div>
        </template>
        <h1 v-else class="empty-header">Задачи отсутствуют</h1>
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
      activeItem: null,
      listAllTasks: LIST_ALL_TASKS,
      listAddTask: LIST_ADD_TASK,
      isShowPopup: false,
    };
  },
  created() {
    axios.get("/lists?_expand=color&_embed=tasks").then((resp) => {
      this.lists = resp.data;
    });
  },
  mounted() {
    axios.get("/colors").then((resp) => (this.listColor = resp.data));
  },
  methods: {
    handleActiveItem: function(id) {
      this.activeItem = this.lists.find((list) => list.id === id);
    },
    toggleShowPopup: function() {
      this.isShowPopup = !this.isShowPopup;
    },
    handleAddList: function(listObj) {
      this.isShowPopup = false;
      this.lists.push(listObj);
    },
    handleDeleteItem: function(id) {
      const newList = this.lists.filter((item) => item.id !== id);
      if (newList.length === 0) {
        this.activeItem = null;
      }
      this.lists = newList;
    },
    handleAddTask: function(id, obj) {
      this.lists.find((list) => list.id === id).tasks.push(obj);
    },
    handleCoplitedTask: function(task) {
      axios
        .patch(`/tasks/${task.id}`, { completed: !task.completed })
        .catch(() => alert("Ошибка обновления задачи :("));
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
.empty-header {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 39px;
  color: #c9d1d3;
  white-space: nowrap;
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
  position: relative;
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
  &_close {
    position: absolute;
    right: -10px;
    top: -10px;
    cursor: pointer;
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
