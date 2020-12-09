<template>
  <ul class="list">
    <li
      v-for="list in lists"
      :key="list.id"
      :class="['list__item', { active: activeItem === list.id }]"
      @click="$emit('on-click', list.id)"
    >
      <i
        v-if="!!list.color"
        class="list__item__icon"
        :style="{ background: list.color.hex }"
      ></i>
      <i v-else>
        <img :src="list.icon" alt="" />
      </i>
      {{ list.name }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "List",
  props: {
    lists: Array,
    activeItem: Number || null,
  },
};
</script>

<style lang="scss" scoped>
.list {
  list-style: none;

  &__item {
    padding: 12px 10px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;

    &.active {
      background: #fff;
    }

    &__icon {
      border-radius: 50%;
      width: 10px;
      height: 10px;
      display: inline-block;
    }
    i {
      margin-right: 10px;
    }
  }
}
</style>
