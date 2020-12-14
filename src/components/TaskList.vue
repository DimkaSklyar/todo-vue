<template>
  <div>
    <article class="tasks">
      <h1 class="tasks__title" :style="{ color: listTasks.color.hex }">
        {{ listTasks.name }}
        <i @click="onActiveEdit"><img :src="editImage" alt="edit"/></i>
        <Edit
          v-if="activeEdit"
          :editableText="listTasks.name"
          @close-popup="onActiveEdit"
          @on-edit="onEdit"
        />
      </h1>
      <hr color="#F2F2F2" />
      <ul class="tasks__list">
        <Task
          v-for="task in listTasks.tasks"
          :key="task.id"
          :Itemtask="task"
          @on-delete="onDelete"
        />
        <AddTask :listTasks="listTasks"/>
      </ul>
    </article>
  </div>
</template>
<script>
import Task from "./Task.vue";
import AddTask from "./AddTask.vue";
import Edit from "./Edit.vue";
import axios from "axios";
import editImage from "../assets/img/edit.png";
export default {
  name: "TaskList",
  props: ["listTasks"],
  data() {
    return {
      editImage,
      activeEdit: false,
    };
  },
  methods: {
    onActiveEdit: function() {
      this.activeEdit = !this.activeEdit;
    },
    onEdit: function(text) {
      axios
        .patch(`/lists/${this.listTasks.id}`, { name: text })
        .then(() => {
          this.listTasks.name = text;
          this.onActiveEdit();
        })
        .catch(() => alert("Возникла ошибка при обновление. :("));
    },
    onDelete: function(id) {
      axios
        .delete(`/tasks/${id}`)
        .then(() => {
          this.listTasks.tasks = this.listTasks.tasks.filter(
            (item) => item.id !== id
          );
        })
        .catch(() => alert("Ошибка удаление задачи. :("));
    },
  },
  components: {
    Task,
    AddTask,
    Edit,
  },
};
</script>
<style lang="scss" scoped>
.tasks {
  padding-bottom: 40px;
  &__title {
    position: relative;
    font-weight: bold;
    font-size: 32px;
    font-family: "Montserrat", sans-serif;
    i {
      cursor: pointer;
      img {
        transition: 0.15s;
      }
      &:hover img {
        transform: scale(1.2);
      }
    }
  }

  hr {
    margin: 20px 0 30px;
  }
}
</style>
