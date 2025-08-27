<script setup lang="ts">
import { computed } from "vue";

type ActionButton = {
    type: "button" | "submit";
    class: string;
    icon?: string;
    handler?: () => void;
    alt: string;
};

const props = defineProps<{
    isEditing: boolean;
}>();

const emit = defineEmits<{
    (e: "edit"): void;
    (e: "save"): void;
    (e: "cancel"): void;
    (e: "delete"): void;
    (e: "done"): void;
}>();

const actionButtons = computed<ActionButton[]>(() =>
    props.isEditing
        ? [
              {
                  type: "button",
                  class: "delete-button",
                  icon: "trash",
                  handler: () => emit("delete"),
                  alt: "Delete",
              },
              {
                  type: "submit",
                  class: "save-button",
                  icon: "save",
                  alt: "Save",
              },

              {
                  type: "button",
                  class: "cancel-button",
                  icon: "times",
                  handler: () => emit("cancel"),
                  alt: "Cancel",
              },
          ]
        : [
              {
                  type: "button",
                  class: "edit-button",
                  icon: "pencil",
                  handler: () => emit("edit"),
                  alt: "Edit",
              },
              {
                  type: "button",
                  class: "done-button",
                  icon: "check",
                  handler: () => emit("done"),
                  alt: "Done",
              },
          ]
);
</script>

<template>
    <div class="actions">
        <template v-for="action in actionButtons" :key="action.class">
            <button
                :type="action.type"
                :class="action.class"
                @click="action.handler"
                :alt="action.alt"
            >
                <span
                    :src="action.icon"
                    :class="`pi pi-${action.icon}`"
                    :alt="action.alt"
                ></span>
            </button>
        </template>
    </div>
</template>

<style scoped>
button {
    display: flex;
    align-items: center;
    cursor: pointer;
    border: none;
    background-color: inherit;
    padding: 0;
    margin: 0;
}
.pi {
    font-size: 1rem;
}

.pi-check {
    color: green;
}

.pi-trash {
    color: red;
}
</style>
