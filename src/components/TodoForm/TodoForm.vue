<script setup lang="ts">
import { ref } from "vue";
import { useCreateTodo } from "../composables/useTodos";

const newTodoTitle = ref("");
const isoDate = new Date().toISOString().slice(0, 10);
const newTodoDate = ref(isoDate);

const create = useCreateTodo();

const handleCreate = () => {
    create.mutate({
        title: newTodoTitle.value,
        date: newTodoDate.value,
    }),
        (newTodoTitle.value = ""),
        (newTodoDate.value = isoDate);
};
</script>

<template>
    <form class="form">
        <input
            type="text"
            v-model="newTodoTitle"
            placeholder="Введите задачу..."
            class="input"
            required
        />
        <input type="date" v-model="newTodoDate" class="date" />
        <button
            type="submit"
            class="btn"
            @click="handleCreate"
            :disabled="!newTodoTitle.trim()"
        >
            Создать
        </button>
    </form>
</template>

<style scoped>
.form {
    display: flex;
    align-items: center;
    gap: 1rem;
}
.input {
    outline: none;
    padding: 0.5rem;
    border: none;
    border-bottom: 1px solid #ccc;
}
.input:focus {
    border-bottom: 1px solid black;
}
.date {
    outline: none;
    border: none;
}
.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
}
</style>
