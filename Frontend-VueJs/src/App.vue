<template>
  <div class="todo-app container mt-5">
    <h1 class="text-center mb-4">To-Do List</h1>
    
    <div class="input-group mb-4">
      <input type="text" v-model="newTodo" class="form-control" placeholder="Add new task" @keyup.enter="addTodo">
      <div class="input-group-append">
        <button class="btn btn-success" @click="addTodo">Add</button>
      </div>
    </div>
    
    <ul class="list-group">
      <TodoItem 
        v-for="todo in todos" 
        :key="todo.id" 
        :todo="todo" 
        @edit="editTodo" 
        @update="updateTodoStatus" 
        @delete="deleteTodo" 
      />
    </ul>

    <TodoModal 
      v-if="editingTodo" 
      :todo="editingTodo" 
      @save="saveTodo" 
      @close="cancelEdit"
    />
  </div>
</template>

<script>
import { getTodos, createTodo, updateTodo, deleteTodo,updateCom } from './services/todoService';
import TodoItem from './components/TodoItem.vue';
import TodoModal from './components/TodoModal.vue';

export default {
  components: { TodoItem, TodoModal },
  data() {
    return {
      newTodo: '',
      todos: [],
      editingTodo: null
    }
  },
  async created() {
    const response = await getTodos();
    this.todos = response.data;
  },
  methods: {
    async addTodo() {
      if (!this.newTodo.trim()) return;
      const response = await createTodo({ title: this.newTodo, completed: false });
      this.todos.push(response.data);
      this.newTodo = '';
    },
    editTodo(todo) {
      this.editingTodo = { ...todo };
    },
    async saveTodo(updatedTodo) {
      await updateTodo(updatedTodo.id, updatedTodo);
      const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
      this.todos[index] = updatedTodo;
      this.editingTodo = null;
    },
    cancelEdit() {
      this.editingTodo = null;
    },
    async updateTodoStatus(todo) {
      await updateCom(todo.id, { completed: todo.completed });
    },
    async deleteTodo(id) {
      await deleteTodo(id);
      this.todos = this.todos.filter(todo => todo.id !== id);
    }
  }
}
</script>
