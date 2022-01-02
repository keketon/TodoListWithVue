<template>
  <div id="label">
    <label v-for="label in labels" :key="label.value">
      <input type="radio" :value="label.value" v-model="current" />{{
        label.label
      }}
    </label>
  </div>
</template>

<script lang="ts">
import { Label } from "@/api/label";
import { defineComponent, PropType, ref, watch } from "vue";

export default defineComponent({
  name: "Label",
  props: {
    initialValue: {
      type: Number,
      required: true,
    },
    labels: {
      type: Object as PropType<Array<Label>>,
      required: true,
    },
  },
  setup: (props, context) => {
    const current = ref(props.initialValue);
    watch(current, () => {
      context.emit("update-label", current.value);
    });
    return {
      current,
    };
  },
});
</script>
