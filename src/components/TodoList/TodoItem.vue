<script setup lang="ts">
import type { Todo } from "@/types/Todo";
import ActionButtons from "./ActionButtons.vue";
import { computed, ref } from "vue";
import { useDeleteTodo, useUpdateTodo } from "../composables/useTodos";
import { formatDate } from "@/utils/dateFormatter";
import { useConfirmDialog } from "../../components/composables/useConfirmDialog";
import { useCloseActions } from "../../utils/useCloseActions";

const props = defineProps<{
    todo: Todo;
}>();

const isEditing = ref(false);
const editFormRef = ref<HTMLFormElement | null>(null);
const formState = ref({
    title: props.todo.title,
    date: props.todo.date,
});

const { open } = useConfirmDialog();
const update = useUpdateTodo();
const remove = useDeleteTodo();

// update
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

// delete
const handleRemove = async () => {
    const confirmed = await open({
        title: "Удаление элемента",
        message: `Вы уверены, что хотите удалить ${props.todo.title}? Это действие нельзя отменить.`,
        confirmText: "Удалить",
        cancelText: "Отмена",
        variant: "danger",
    });

    if (confirmed) {
        remove.mutate({
            id: props.todo.id,
            title: props.todo.title,
        });
    }
};

// cancel
const resetForm = () => {
    formState.value = { ...props.todo };
};
const cancelEditing = () => {
    if (!isEditing.value) return;
    resetForm();
    isEditing.value = false;
};
useCloseActions(isEditing, cancelEditing, editFormRef);

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
    align-items: center;
    gap: 1rem;
    justify-content: space-between;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 2rem;
    background-color: rgba(255, 255, 255, 0.8);
}
.todo-view {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
    width: 100%;
    border: 6px solid transparent;
}

.todo-edit-form {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: space-between;
    width: 100%;
}
.todo-edit-form input {
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 1rem;
    padding: 4px 10px;
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;

    outline: none;
}

.action-buttons {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}
.title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
