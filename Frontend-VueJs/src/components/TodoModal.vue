<template>
    <div v-if="todo" class="modal show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit To-Do</h5>
          </div>
          <div class="modal-body">
            <input v-model="editedTodo.title" type="text" class="form-control" placeholder="Edit title" />
            <div class="form-check mt-3">
              <input type="checkbox" v-model="editedTodo.completed" class="form-check-input">
              <label class="form-check-label">Completed</label>
            </div>
            <p v-if="isTitleEmpty" class="text-danger mt-2">Title cannot be empty!</p>
          </div>
          <div class="modal-footer">
            <button @click="saveChanges" class="btn btn-primary" :disabled="isTitleEmpty">Save</button>
            <button @click="$emit('close')" class="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['todo'],
    data() {
      return {
        editedTodo: { ...this.todo }
      }
    },
    computed: {
      isTitleEmpty() {
        return !this.editedTodo.title.trim();
      }
    },
    methods: {
      saveChanges() {
        if (!this.isTitleEmpty) this.$emit('save', this.editedTodo);
      }
    }
  }
  </script>
  