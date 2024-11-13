<template>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <input type="checkbox" v-model="todo.completed" @change="onUpdateTodo" class="form-check-input">
      <span :class="{ 'text-decoration-line-through': todo.completed }">{{ todo.title }}</span>
      <div class="button-group">
        <button class="btn btn-info btn-sm mr-2" @click="onEditTodo">Edit</button>
        <button class="btn btn-danger btn-sm" @click="onDeleteTodo">Delete</button>
      </div>
    </li>
  </template>
  
  <script>
  export default {
    props: {
      todo: Object
    },
    created() {
      // Log data to check the value of todo.completed
      console.log('Todo data:', this.todo);
    },
    methods: {
      onEditTodo() {
        this.$emit('edit', this.todo);
      },
      onUpdateTodo() {
        this.$emit('update', this.todo);
      },
      onDeleteTodo() {
        this.$emit('delete', this.todo.id);
      }
    }
  }

  </script>
  