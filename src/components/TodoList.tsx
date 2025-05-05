import { FC } from 'react';
import TodoListItem from './TodoListItem';

type DataProps = {
    id: number;
    todoTxt: string;
    status: boolean;
}

type TodoListProps = {
    data: DataProps[];
    handleChange: (id: number) => void;
    handleClick: (id: number) => void;
}

const TodoList:FC<TodoListProps> = ({data, handleChange, handleClick}) => {
    // const [data, setData] = useState({});

    // const handleChange = () => {};

    // const handleClick = () => {};

    return (
        <div className="todolist-listWrap">
            <ul className="todolist">
                {data.map((item) => (
                    <TodoListItem
                        key = {item.id}
                        handleChange={() => handleChange(item.id)}
                        handleClick={() => handleClick(item.id)}
                    >
                        {item.todoTxt}
                    </TodoListItem>
                ))}
            </ul>
        </div>
    )
};

export default TodoList;