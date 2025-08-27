<script setup lang="ts">
import { useConfirmDialog } from "../composables/useConfirmDialog";

const { isOpen, options, confirm, cancel } = useConfirmDialog();
</script>

<template>
    <teleport to="body">
        <div v-if="isOpen" class="confirm-dialog-overlay" @click.self="cancel">
            <div class="confirm-dialog">
                <div class="dialog-header">
                    <h3>{{ options.title }}</h3>
                </div>

                <div class="dialog-body">
                    <p>{{ options.message }}</p>
                </div>

                <div class="dialog-actions">
                    <button @click="cancel" class="btn btn-secondary">
                        {{ options.cancelText }}
                    </button>
                    <button
                        @click="confirm"
                        :class="['btn', `btn-${options.variant}`]"
                    >
                        {{ options.confirmText }}
                    </button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<style scoped>
.confirm-dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.confirm-dialog {
    background: white;
    border-radius: 12px;
    padding: 24px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.dialog-header {
    margin-bottom: 16px;
}

.dialog-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.25rem;
}

.dialog-body {
    margin-bottom: 24px;
}

.dialog-body p {
    margin: 0;
    color: #666;
    line-height: 1.5;
}

.dialog-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
}

.btn {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
}

.btn-secondary {
    background: #f0f0f0;
    color: #333;
}

.btn-secondary:hover {
    background: #e0e0e0;
}

.btn-primary {
    background: #007bff;
    color: white;
}

.btn-primary:hover {
    background: #0056b3;
}

.btn-success {
    background: #28a745;
    color: white;
}

.btn-success:hover {
    background: #1e7e34;
}

.btn-warning {
    background: #ffc107;
    color: #212529;
}

.btn-warning:hover {
    background: #e0a800;
}

.btn-danger {
    background: #dc3545;
    color: white;
}

.btn-danger:hover {
    background: #bd2130;
}
</style>
