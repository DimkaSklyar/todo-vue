<template>
  <div class="popup">
    <form class="form-add-task" @submit.prevent="addList">
      <input
        v-model="nameList"
        class="input-form"
        type="text"
        name="name"
        id="name"
        placeholder="Название папки"
        required
      />
      <ul class="form-add-task__choose-option">
        <li
          v-for="color in lists"
          :key="color.id"
          class="label-form label-form_radio"
          :style="{ background: color.hex }"
          @click="selectedColor(color.id)"
          :class="{ active: color.id == selectColor }"
        ></li>
      </ul>
      <button type="submit" class="btn btn-w-100">Добавить</button>
    </form>
    <i class="btn_close">
      <img :src="closeImage" alt="" @click="$emit('close-popup')" />
    </i>
  </div>
</template>

<script>
import axios from "axios";
import closeImage from "../assets/img/close.png";

export default {
  name: "Popup",
  props: {
    lists: Array,
  },
  data() {
    return {
      selectColor: this.lists[0].id,
      nameList: "",
      closeImage,
    };
  },
  methods: {
    addList: function () {
      const obj = {
        name: this.nameList,
        colorId: this.selectColor,
      };
      axios.post("/lists", obj).then(({ data }) => {
        const color = this.lists.find((c) => c.id === this.selectColor);
        const listObj = { ...data, color, tasks: [] };
        this.$emit("add-list", listObj);
      });
    },
    selectedColor: function (id) {
      this.selectColor = id;
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  width: 235px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 18px;
  position: absolute;
  .form-add-task {
    .input-form {
      background: #ffffff;
      border: 1px solid #efefef;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 7px 11px;
      font-size: 14px;
      width: 100%;
      margin-bottom: 15px;
    }
    &__choose-option {
      border: none;
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      list-style: none;
      .label-form_radio {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        cursor: pointer;
        &.active {
          border: 2px solid #525252;
          transform: scale(1.1);
        }
      }
    }
  }
  .btn_close {
    position: absolute;
    right: -10px;
    top: -10px;
    cursor: pointer;
  }
}
</style>
