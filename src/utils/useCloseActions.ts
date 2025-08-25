import { onMounted, onUnmounted, type Ref } from "vue";

export function useCloseActions(
    isActive: Ref<boolean>,
    closeCallback: () => void,
    elementRef?: Ref<HTMLElement | null>
) {
    const handleClickOutside = (event: MouseEvent) => {
        if (
            elementRef?.value &&
            !elementRef.value.contains(event.target as Node)
        ) {
            closeCallback();
        }
    };

    const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isActive.value) {
            event.preventDefault();
            closeCallback();
        }
    };

    onMounted(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
    });

    onUnmounted(() => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
    });

    return {
        handleClickOutside,
        handleEscape,
    };
}
