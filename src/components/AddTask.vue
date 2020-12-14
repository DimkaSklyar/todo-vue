<template>
  <div class="add-task">
    <form
      v-if="toggleVisible"
      class="add-task__form"
      @submit.prevent="handleAddTask"
    >
      <input
        ref="inputForm"
        class="input-form"
        type="text"
        required
        placeholder="Текст задачи"
        v-model="textTask"
      />
      <fieldset class="add-task__btn_wrap">
        <button type="submit" class="btn">Добавить задачу</button>
        <button type="reset" class="btn btn_cancel" @click="onVisibleForm">
          Отмена
        </button>
      </fieldset>
    </form>
    <div v-else class="add-task__btn" @click="onVisibleForm">
      <img :src="addImage" alt="add" />
      <p>Новая задача</p>
    </div>
  </div>
</template>
<script>
import addImage from "../assets/img/add.png";
import axios from "axios";
export default {
  name: "AddTask",
  props: {
    listTasks: Object,
  },
  data() {
    return {
      addImage,
      toggleVisible: false,
      textTask: "",
    };
  },
  updated() {
    if (this.$refs.inputForm) {
      this.$refs.inputForm.focus();
    }
  },
  methods: {
    handleAddTask: function () {
      const newTask = {
        listId: this.listTasks.id,
        text: this.textTask,
        completed: false,
      };
      axios
        .post(`/tasks/`, newTask)
        .then(({ data }) => {
          this.$root.$children[0].handleAddTask(this.listTasks.id, data);
          this.onVisibleForm();
        })
        .catch(() => alert("Ошибка добавления новой задачи :("));
    },
    onVisibleForm: function () {
      this.toggleVisible = !this.toggleVisible;
      this.textTask = "";
    },
  },
};
</script>
<style lang="scss" scoped>
.add-task {
  &__btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    p {
      font-family: "Lato", sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.15px;
      color: #b4b4b4;
    }
    img {
      width: 14px;
      height: 14px;
      margin-left: 4px;
      margin-right: 11px;
    }
  }
  &__btn_wrap {
    button {
      margin-right: 10px;
    }
  }
}
</style>
