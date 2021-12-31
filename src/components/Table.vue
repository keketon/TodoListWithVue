<template>
  <div id="table">
    <!-- TODO: 独立させる -->
    <div id="label">
      <label v-for="label in options" v-bind:key="label.value">
        <input type="radio" v-model="current" v-bind:value="label.value" />{{
          label.label
        }}
      </label>

      <!-- <div>{{ computedTodos.length }} 件を表示中</div> -->
    </div>

    <table>
      <thead>
        <tr>
          <th class="id">ID</th>
          <th class="comment">コメント</th>
          <th class="state">状態</th>
          <th class="button">-</th>
        </tr>
      </thead>
      <tbody v-for="item in computedTodos" v-bind:key="item.id">
        <th>{{ item.id }}</th>
        <td>{{ item.comment }}</td>
        <td class="state">
          <button @click="doChangeState(item)">
            {{ computedLabels[item.status] }}
          </button>
        </td>
        <td class="button">
          <button @click.meta="doRemove(item)">削除</button>
        </td>
      </tbody>
    </table>

    <!-- TODO: 独立させる -->
    <div id="form">
      <h2>新しい作業の追加</h2>
      <form class="add-form" @submit.prevent="doAdd">
        コメント <input type="text" v-model="newComment" />
        <button type="submit">追加</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Todo, todoStorage } from "@/api/storage";
import { sampleLabels } from "@/api/label";
import { computed, defineComponent, PropType, reactive, ref, watch } from "vue";

export default defineComponent({
  name: "Table",
  props: {
    todos: Array as PropType<Array<Todo>>,
    labels: Object,
  },
  setup: (props) => {
    const reactiveTodos = reactive<Array<Todo>>(props.todos ?? []);
    const doChangeState = (todo: Todo) => {
      todo.status = todo.status ? 0 : 1;
    };
    const doRemove = (todo: Todo) => {
      const index = reactiveTodos.indexOf(todo);
      reactiveTodos.splice(index, 1);
    };

    const newComment = ref<string>("");
    const doAdd = () => {
      if (!newComment.value.length) {
        return;
      }

      reactiveTodos.push({
        id: todoStorage.uid++,
        comment: newComment.value,
        status: 0,
      });
      newComment.value = "";
    };

    const current = ref(-1);

    watch(
      reactiveTodos,
      (newValue) => {
        todoStorage.save(newValue);
      },
      { deep: true }
    );

    const computedTodos = computed(() => {
      return reactiveTodos.filter((el) => {
        return current.value < 0 ? true : current.value === el.status;
      });
    });

    const labels = sampleLabels;

    const computedLabels = computed(() => {
      return labels.reduce(function (prv, cur) {
        return Object.assign(prv, { [cur.value]: cur.label });
      }, {});
    });

    return {
      computedTodos,
      doChangeState,
      doRemove,
      doAdd,
      newComment,
      options: sampleLabels,
      computedLabels,
      current,
    };
  },
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
thead th {
  border-bottom: 2px solid #0099e4; /*#d31c4a */
  color: #0099e4;
}
th,
th {
  padding: 0 8px;
  line-height: 40px;
}
thead th.id {
  width: 50px;
}
thead th.state {
  width: 100px;
}
thead th.button {
  width: 60px;
}
tbody td.button,
tbody td.state {
  text-align: center;
}
tbody tr td,
tbody tr th {
  border-bottom: 1px solid #ccc;
  transition: all 0.4s;
}
tbody tr.done td,
tbody tr.done th {
  background: #f8f8f8;
  color: #bbb;
}
tbody tr:hover td,
tbody tr:hover th {
  background: #f4fbff;
}
button {
  border: none;
  border-radius: 20px;
  line-height: 24px;
  padding: 0 8px;
  background: #0099e4;
  color: #fff;
  cursor: pointer;
}
input {
  margin-right: 8px;
}
</style>
