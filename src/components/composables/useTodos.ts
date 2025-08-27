import {
    useMutation,
    useQuery,
    useQueryClient,
    type UseQueryOptions,
} from '@tanstack/vue-query'
import api from '../../api'
import { toast } from 'vue3-toastify'
import type { Ref } from 'vue'
import type { PaginationMeta } from '../../types/Pagination'
import type { Todo } from '../../types/Todo'

type PaginatedResponse<T> = {
    meta: PaginationMeta
    items: T[]
}

// Получение
export const useTodos = (
    page: Ref<number>,
    limit: Ref<number>,
    sort: Ref<string>,
    options?: any //Partial<UseQueryOptions<PaginatedResponse<Todo>>>
) => {
    return useQuery<PaginatedResponse<Todo>>({
        queryKey: ['todos', page, limit, sort],
        queryFn: async () => {
            try {
                const res = await api.get('/todos', {
                    params: {
                        sortBy: sort.value,
                        page: page.value,
                        limit: limit.value,
                    },
                })
                return res.data
            } catch (error: any) {
                toast.error(`Ошибка получения данных: ${error.message}`)
                throw new Error('Не удалось загрузить данные о расходах')
            }
        },
        retry: 1,
        ...options,
    })
}

// Создание
export const useCreateTodo = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: Omit<Todo, 'id'>) => {
            const res = await api.post('/todos', data)
            return res.data
        },
        onSuccess: (newTodo) => {
            toast.success(`Добавлено: ${newTodo.title}`)
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (_, errorData) =>
            toast.error(
                `Ошибка при добавлении: ${(errorData as any)?.title || '...'}`
            ),
    })
}

// Обновление
export const useUpdateTodo = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (todo: Partial<Todo> & { id: number }) => {
            const res = await api.patch(`/todos/${todo.id}`, todo)
            return res.data
        },
        onSuccess: (updatedTodo) => {
            toast.success(`Обновлено: ${updatedTodo.title}`)
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (_, errorData) =>
            toast.error(
                `Ошибка при обновлении: ${(errorData as any)?.title || '...'}`
            ),
    })
}

// Удаление
export const useDeleteTodo = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, title }: { id: number; title: string }) => {
            await api.delete(`/todos/${id}`)
            return title
        },
        onSuccess: (deletedTitle) => {
            toast.error(`Удалено: ${deletedTitle}`)
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (_, errorData) =>
            toast.error(
                `Ошибка при удалении: ${(errorData as any)?.title || '...'}`
            ),
    })
}
