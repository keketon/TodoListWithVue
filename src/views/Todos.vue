<template>
  <div class="todos">
    <Table :todos="todos" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Table from "@/components/Table.vue";
import { Todos } from "@/api/storage";

export default defineComponent({
  name: "Todos",
  components: {
    Table,
  },
  setup: (props) => {
    // const labels = {};
    const todos: Todos = [
      {
        id: 1,
        comment: "おいっすー^^;",
        status: 0,
      },
    ];
    return {
      todos,
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
