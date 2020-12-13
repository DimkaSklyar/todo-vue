<template>
  <ul class="list">
    <li
      v-for="list in lists"
      :key="list.id"
      :class="[
        'list__item',
        {
          active: list.id
            ? activeItem === list.id
            : activeItem === null && true,
        },
      ]"
      @click="$emit('on-click', list.id)"
    >
      <i
        v-if="!!list.color"
        class="list__item__icon list__item__icon_dot"
        :style="{ background: list.color.hex }"
      ></i>
      <i
        @click="removeItemList"
        v-if="!!isDeletedItem"
        class="list__item__icon list__item__icon_img_right"
      >
        <img :src="iconDelete" alt="delete"
      /></i>
      <i v-else class="list__item__icon list__item__icon_img_left">
        <img :src="list.icon" alt="" />
      </i>
      {{ list.name }}
    </li>
  </ul>
</template>

<script>
import deleteImage from "../assets/img/delete.png";
import axios from 'axios';
export default {
  name: "List",
  props: {
    lists: Array,
    activeItem: Number || null,
    isDeletedItem: Boolean,
  },
  data() {
    return {
      iconDelete: deleteImage,
    };
  },
  methods: {
    removeItemList: function() {
      axios.delete(`/lists/${this.activeItem}`)
    }
  },
};
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
  margin-bottom: 20px;

  &__item {
    padding: 12px 10px 12px 30px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
    position: relative;

    &.active {
      background: #fff;
    }

    &__icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      &_img_right {
        right: 10px;
        transition: 0.3s;
        &:hover {
          transform: translateY(-50%) scale(1.2);
        }
      }
      &_img_left {
        left: 10px;
      }
      &_dot {
        border-radius: 50%;
        width: 10px;
        height: 10px;
        display: inline-block;
        left: 10px;
      }
    }
    &__icon_delete {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
