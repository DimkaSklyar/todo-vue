<template >
  <div>
    <article class="tasks">
      <h1 class="tasks__title" :style="{ color: listTasks.color.hex }">
        {{ listTasks.name }}
      </h1>
      <hr color="#F2F2F2" />
      <ul class="tasks__list">
        <Task v-for="task in listTasks.tasks" :key="task.id" :Itemtask="task" />
        <AddTask :listTasks="listTasks" />
      </ul>
    </article>
  </div>
</template>
<script>
import Task from "./Task.vue";
import AddTask from "./AddTask.vue";
export default {
  name: "TaskList",
  props: ["listTasks"],
  components: {
    Task,
    AddTask,
  },
};
</script>
<style lang="scss" scoped>
.tasks {
  padding-bottom: 40px;
  &__title {
    font-weight: bold;
    font-size: 32px;
    font-family: "Montserrat", sans-serif;
  }

  hr {
    margin: 20px 0 30px;
  }
}
</style>