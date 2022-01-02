<template>
  <div id="form">
    <h2>新しい作業の追加</h2>
    <form class="add-form" @submit.prevent="doAdd">
      コメント <input type="text" v-model="newComment" />
      <button type="submit">追加</button>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref, watch } from "vue";
export default defineComponent({
  name: "Form",
  setup: (props, context) => {
    const newComment = ref<string>("");
    const doAdd = () => {
      if (!newComment.value.length) {
        return;
      }

      context.emit("do-add-form", newComment.value);

      newComment.value = "";
    };

    return {
      newComment,
      doAdd,
    };
  },
});
</script>

<style scoped></style>
