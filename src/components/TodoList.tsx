import { FC } from 'react';
import TodoListItem from './TodoListItem';
import { DataProps } from '../types';

type TodoListProps = {
    data: DataProps[];
    handleChange: (id: number) => void;
    handleClick: (id: number) => void;
    handleEditSave: (id: number, task: string) => void;
}

const TodoList:FC<TodoListProps> = ({data, handleChange, handleClick, handleEditSave}) => {

    return (
        <div className="todolist-listWrap">
            <ul className="todolist">
                {data.map((item) => (
                    <TodoListItem
                        key = {item.id}
                        handleChange={() => handleChange(item.id)}
                        handleClick={() => handleClick(item.id)}
                        handleEditSave={(task) => handleEditSave(item.id, task)}
                        taskTxt={item.todoTxt}
                        isCheck={item.status}
                    >
                        {item.todoTxt}
                    </TodoListItem>
                ))}
            </ul>
        </div>
    )
};

export default TodoList;