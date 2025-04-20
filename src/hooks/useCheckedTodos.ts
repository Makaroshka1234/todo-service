import { useMemo } from 'react';
import { ITodo } from '../types/todo';



const useCheckedTodos = (todos: ITodo[] = []) => {
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
            checkedTodos: checked.length,
            uncheckedTodos: unchecked.length,
        };
    }, [todos]);

    return { checkedTodos, uncheckedTodos };
};

export default useCheckedTodos;
