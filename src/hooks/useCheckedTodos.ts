import { useMemo } from 'react';

interface ITodo {
    id: number;
    title: string;
    completed: boolean;
}

const useCheckedTodos = (todos: ITodo[]) => {
    const { checkedTodos, uncheckedTodos } = useMemo(() => {
        const checked = [] as ITodo[];
        const unchecked = [] as ITodo[];

        todos.forEach(todo => {
            if (todo.completed) {
                checked.push(todo);
            } else {
                unchecked.push(todo);
            }
        });

        return {
            checkedTodos: checked,
            uncheckedTodos: unchecked,
        };
    }, [todos]);

    return { checkedTodos, uncheckedTodos };
};

export default useCheckedTodos;
