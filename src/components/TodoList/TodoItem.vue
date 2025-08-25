<script setup lang="ts">
import type { Todo } from "@/types/Todo";
import ActionButtons from "./ActionButtons.vue";
import { computed, ref } from "vue";
import { useDeleteTodo, useUpdateTodo } from "../composables/useTodos";
import { formatDate } from "@/utils/dateFormatter";

const props = defineProps<{
    todo: Todo;
}>();

const isEditing = ref(false);
const editFormRef = ref<HTMLFormElement | null>(null);
const formState = ref({
    title: props.todo.title,
    date: props.todo.date,
});

const update = useUpdateTodo();
const remove = useDeleteTodo();

const handleUpdate = () => {
    if (
        formState.value.title !== props.todo.title ||
        formState.value.date !== props.todo.date
    ) {
        update.mutate({
            id: props.todo.id,
            ...formState.value,
        });
    }
    isEditing.value = false;
};

const handleRemove = () => {
    remove.mutate({
        id: props.todo.id,
        title: props.todo.title,
    });
};

const resetForm = () => {
    formState.value = { ...props.todo };
};

const cancelEditing = () => {
    if (!isEditing.value) return;
    resetForm();
    isEditing.value = false;
};

const fullDate = computed(() => formatDate(props.todo.date, "DD.MM.YYYY"));
const longDate = computed(() => formatDate(props.todo.date, "DD.month"));
</script>
<template>
    <div class="item">
        <form
            v-if="isEditing"
            ref="editFormRef"
            class="todo-edit-form"
            @submit.prevent="handleUpdate"
        >
            <input
                class="title"
                type="text"
                v-model="formState.title"
                required
            />
            <input class="date" type="date" v-model.date="formState.date" />
            <ActionButtons
                class="action-buttons"
                :isEditing="isEditing"
                @edit="isEditing = true"
                @cancel="cancelEditing"
                @delete="handleRemove"
            />
        </form>
        <div v-else class="todo-view">
            <div class="title" :title="todo.title">{{ todo.title }}</div>
            <div class="date" :date="todo.date" :title="fullDate">
                {{ longDate }}
            </div>
            <ActionButtons
                class="action-buttons"
                :isEditing="isEditing"
                @edit="isEditing = true"
                @cancel="cancelEditing"
                @delete="handleRemove"
            />
        </div>
    </div>
</template>
<style scoped>
.item {
    box-sizing: border-box;
    width: 60vh;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 1rem;
    background-color: #fff;
}
.todo-view {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
    width: 100%;
}
.todo-edit-form {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
    width: 100%;
}

.action-buttons {
    display: flex;
    flex-direction: row;
    gap: 0.2rem;
}
.title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0.1rem;
}
</style>
