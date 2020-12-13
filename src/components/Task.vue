<template>
  <li class="task__item">
    <input
      type="checkbox"
      name="task"
      :id="Itemtask.id"
      :checked="Itemtask.completed"
    />
    <label :for="Itemtask.id"><img :src="completeImage" alt="" /></label>
    <p :class="{ completed: Itemtask.completed }">{{ Itemtask.text }}</p>
  </li>
</template>
<script>
import completeImage from "../assets/img/complete.png";
export default {
  name: "Task",
  props: {
    Itemtask: Object,
  },
  data() {
    return {
      completeImage,
    };
  },
};
</script>
<style lang="scss" scoped>
.task__item {
  display: flex;
  margin-bottom: 20px;
  label {
    width: 20px;
    height: 20px;
    border: 2px solid #e8e8e8;
    border-radius: 50%;
    display: flex;
    cursor: pointer;
    position: relative;
    justify-content: center;
    align-items: center;
    transition: 0.15s;
    &:hover {
      background: #f2f2f2;
      border: 2px solid #f2f2f2;
    }
    &:hover img {
      filter: invert(50%);
    }
    img {
      line-height: 20px;
    }
  }
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"]:checked {
    & + label {
      background: #4dd599;
      border: 2px solid #4dd599;
      transition: 0.15s;
      & + p {
        text-decoration: line-through;
      }
      &:hover img {
        filter: invert(0);
      }
      &:hover {
        background: darken(#4dd599, 10%);
        border-color: darken(#4dd599, 10%);
      }
    }
  }
  p {
    border: none;
    font-family: "Lato", sans-serif;
    font-size: 16px;
    line-height: 19px;
    color: #000;
    font-weight: 500;
    display: inline-block;
    margin-left: 10px;
  }
}
</style>