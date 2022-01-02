<template>
  <div class="todos">
    <Label :initialValue="-1" :labels="labels" @update-label="onUpdateLabel" />
    <Table :todos="todos" :labelValue="labelValue" ref="table" />
    <Form @do-add-form="onAddTodo" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, render } from "vue";
import Table from "@/components/Table.vue";
import { Todos, todoStorage } from "@/api/storage";
import Label from "@/components/Label.vue";
import { sampleLabels } from "@/api/label";
import Form from "@/components/Form.vue";

export default defineComponent({
  name: "Todos",
  components: {
    Table,
    Label,
    Form,
  },
  setup: (props) => {
    // const labels = {};
    const todos: Todos = todoStorage.fetch();
    const labels = sampleLabels;
    const labelValue = ref(-1);

    const onUpdateLabel = (selected: number) => {
      labelValue.value = selected;
    };

    const table = ref<InstanceType<typeof Table>>();

    const onAddTodo = (comment: string) => {
      table.value?.reactiveTodos.push({
        id: todoStorage.uid++,
        comment: comment,
        status: 0,
      });
    };

    return {
      table,
      todos,
      labels,
      labelValue,
      onUpdateLabel,
      onAddTodo,
    };
  },
});
</script>

<style scoped>
.todos {
  max-width: 640px;
  margin: 0 auto;
}
</style>
