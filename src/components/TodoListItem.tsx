import { FC } from 'react';
import Button from './Button';
import CheckBox from './CheckBox';

type TodoListProps = {
    children: React.ReactNode;
    handleChange: () => void;
    handleClick: () => void;
    isCheck: boolean;
}

const TodoListItem: FC<TodoListProps> = ({children, handleChange, handleClick, isCheck}) => {
    // const [data, setData] = useState({});

    return (
        <li className="todolist__item">
            <span className="todotext-wrap">
                <CheckBox
                    type='checkbox'
                    className='todo-checkBox'
                    onChange={handleChange}
                    checked={isCheck}
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