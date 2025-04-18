import { useState, useCallback } from 'react';

interface ITodo {
    id: number;
    title: string;
    completed: boolean;
}



const useCheckedTodos = (todos: ITodo[]) => {
    const [checkedTodos, setCheckedTodos] = useState<ITodo[]>([]);
    const [uncheckedTodos, setUncheckedTodos] = useState<ITodo[]>([]);

    // Оновлюємо масиви перевірених і неперевірених елементів
    const separateTodos = useCallback(() => {
        const checked = todos.filter(todo => todo.completed);
        const unchecked = todos.filter(todo => !todo.completed);

        setCheckedTodos(checked);
        setUncheckedTodos(unchecked);
    }, [todos]);

    return { checkedTodos, uncheckedTodos, separateTodos };
};

export default useCheckedTodos