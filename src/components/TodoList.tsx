import { FC } from 'react';
import TodoListItem from './TodoListItem';
import { DataProps } from '../types';

type TodoListProps = {
    data: DataProps[];
    handleChange: (id: number) => void;
    handleClick: (id: number) => void;
}

const TodoList:FC<TodoListProps> = ({data, handleChange, handleClick}) => {


    return (
        <div className="todolist-listWrap">
            <ul className="todolist">
                {data.map((item) => (
                    <TodoListItem
                        key = {item.id}
                        handleChange={() => handleChange(item.id)}
                        handleClick={() => handleClick(item.id)}
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