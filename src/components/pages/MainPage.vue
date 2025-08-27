<script setup lang="ts">
import { computed, ref } from 'vue'
import TodoForm from '../TodoForm/TodoForm.vue'
import TodoItem from '../TodoList/TodoItem.vue'
import { useTodos } from '../composables/useTodos'

const currentPage = ref(1)
const itemsPerPage = ref(10)
const currentSort = ref('-date')

const { data: todosData } = useTodos(currentPage, itemsPerPage, currentSort)

const todos = computed(() => {
    if (!todosData.value) return []
    return [...todosData.value.items]
})

const incompleteTodos = computed(() => {
    return todos.value.filter((todo) => !todo.archive)
})

const paginationMeta = computed(
    () =>
        todosData.value?.meta || {
            total_items: 0,
            total_pages: 1,
            current_page: 1,
            per_page: itemsPerPage.value,
            remaining_count: 0,
        }
)

const handlePageChange = (page: number) => {
    currentPage.value = page
}

const handlePerPageChange = (perPage: number) => {
    itemsPerPage.value = perPage
}
</script>

<template>
    <div class="content">
        <TodoForm />
        <div class="list">
            <TodoItem
                v-for="todo in incompleteTodos"
                :key="todo.id"
                :todo="todo"
            />
        </div>
    </div>
</template>

<style scoped>
.content {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}
.list {
    box-sizing: border-box;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-direction: column;
    background-color: bisque;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 2rem;
}
</style>
