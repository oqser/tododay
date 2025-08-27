import { ref, type Ref, provide, inject, type InjectionKey } from 'vue';

export interface ConfirmDialogOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary' | 'success' | 'warning';
  data?: any;
}

export interface ConfirmDialogContext {
  isOpen: Ref<boolean>;
  options: Ref<ConfirmDialogOptions>;
  open: (options: ConfirmDialogOptions) => Promise<boolean>;
  confirm: () => void;
  cancel: () => void;
}

const defaultOptions: ConfirmDialogOptions = {
  title: 'Подтверждение действия',
  message: 'Вы уверены, что хотите выполнить это действие?',
  confirmText: 'Подтвердить',
  cancelText: 'Отмена',
  variant: 'primary',
  data: null
};

const confirmDialogKey: InjectionKey<ConfirmDialogContext> = Symbol('confirmDialog');

export function useConfirmDialogProvider() {
  const isOpen = ref(false);
  const options = ref<ConfirmDialogOptions>({ ...defaultOptions });
  
  let resolvePromise: ((value: boolean) => void) | null = null;

  const open = async (dialogOptions: ConfirmDialogOptions): Promise<boolean> => {
    options.value = { ...defaultOptions, ...dialogOptions };
    isOpen.value = true;
    
    return new Promise<boolean>((resolve) => {
      resolvePromise = resolve;
    });
  };

  const confirm = (): void => {
    if (resolvePromise) {
      resolvePromise(true);
      resolvePromise = null;
    }
    isOpen.value = false;
  };

  const cancel = (): void => {
    if (resolvePromise) {
      resolvePromise(false);
      resolvePromise = null;
    }
    isOpen.value = false;
  };

  const context: ConfirmDialogContext = {
    isOpen,
    options,
    open,
    confirm,
    cancel
  };

  provide(confirmDialogKey, context);

  return context;
}

export function useConfirmDialog(): ConfirmDialogContext {
  const context = inject(confirmDialogKey);
  
  if (!context) {
    throw new Error('useConfirmDialog must be used within a component that provides ConfirmDialog context');
  }
  
  return context;
}