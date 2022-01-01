<template>
  <div class="todos">
    <Label :initialValue="-1" :labels="labels" @update-label="onUpdateLabel" />
    <Table :todos="todos" :labelValue="labelValue" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Table from "@/components/Table.vue";
import { Todos, todoStorage } from "@/api/storage";
import Label from "@/components/Label.vue";
import { sampleLabels } from "@/api/label";

export default defineComponent({
  name: "Todos",
  components: {
    Table,
    Label,
  },
  setup: (props) => {
    // const labels = {};
    const todos: Todos = todoStorage.fetch();
    const labels = sampleLabels;
    const labelValue = ref(-1);

    const onUpdateLabel = (selected: number) => {
      labelValue.value = selected;
    };

    return {
      todos,
      labels,
      labelValue,
      onUpdateLabel,
    };
  },
  // props: {
  //   todos: Array,
  //   labels: Object,
  // },
});
</script>

<style scoped>
.todos {
  max-width: 640px;
  margin: 0 auto;
}
</style>
