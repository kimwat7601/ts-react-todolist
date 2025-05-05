import { FC } from 'react';
import Button from './Button';
import CheckBox from './CheckBox';

type TodoListProps = {
    children: React.ReactNode;
    handleChange: () => void;
    handleClick: () => void;
}

const TodoListItem: FC<TodoListProps> = ({children, handleChange, handleClick}) => {
    // const [data, setData] = useState({});

    return (
        <li className="todolist__item">
            <span className="todotext-wrap">
                <CheckBox
                    type='checkbox'
                    className='todo-check'
                    onChange={handleChange}
                />
                <span className="todo-text">{children}</span>
            </span>
            <Button
                type='button'
                className='btn-delete'
                onClick={handleClick}
            >
                削除
            </Button>
        </li>
    );
};

export default TodoListItem;