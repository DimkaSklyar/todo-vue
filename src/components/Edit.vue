<template>
  <div class="edit-popup">
    <form @submit.prevent="$emit('on-edit', text)">
      <input
        ref="inputForm"
        class="input-form"
        type="text"
        v-model="text"
        placeholder="Введите текст"
        required
      />
      <fieldset>
        <button type="submit" class="btn">Изменить</button>
        <button
          type="reset"
          class="btn btn_cancel"
          @click="$emit('close-popup')"
        >
          Отмена
        </button>
      </fieldset>
    </form>
    <i class="btn_close">
      <img :src="closeImage" alt="close" @click="$emit('close-popup')" />
    </i>
  </div>
</template>
<script>
import closeImage from "../assets/img/close.png";
export default {
  name: "Edit",
  props: {
    editableText: String,
  },
  data() {
    return {
      text: this.editableText,
      closeImage,
    };
  },
  mounted() {
    if (this.$refs.inputForm) {
      this.$refs.inputForm.focus();
    }
  },
};
</script>
<style lang="scss" scoped>
.edit-popup {
  position: absolute;
  top: 40px;
  left: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 18px;
  z-index: 99;
  min-width: 400px;
}
fieldset {
  .btn {
    margin-right: 10px;
  }
}
</style>
