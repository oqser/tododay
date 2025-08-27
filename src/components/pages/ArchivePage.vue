<script setup>
import { ref, computed } from 'vue'
import { useTodos } from '../composables/useTodos'
import TodoItem from '../TodoList/TodoItem.vue'

const currentPage = ref(1)
const itemsPerPage = ref(10)
const currentSort = ref('-date')

const { data: todosData } = useTodos(currentPage, itemsPerPage, currentSort)

const todos = computed(() => {
    if (!todosData.value) return []
    return [...todosData.value.items]
})

const completeTodos = computed(() => {
    return todos.value.filter((todo) => todo.archive)
})
</script>
<template>
    <div class="list">
        <TodoItem v-for="todo in completeTodos" :key="todo.id" :todo="todo" />
    </div>
</template>
<style scoped></style>
