const STORAGE_KEY = "todos-vuejs-demo";
export const todoStorage = {
  uid: 0,
  fetch: (): Todos => {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach((todo: Todo, index: number) => {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: (todos: Todos): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

export interface Todo {
  id: number;
  comment: string;
  status: number;
}

export type Todos = Array<Todo>;
