import { FC, useState } from 'react';
import Button from './Button';
import CheckBox from './CheckBox';
import InputText from './InputText';

type TodoListItemProps = {
    children: React.ReactNode;
    handleChange: () => void;
    handleClick: () => void;
    handleEditSave: (task: string) => void;
    taskTxt: string;
    isCheck: boolean;
}

const TodoListItem: FC<TodoListItemProps> = ({
    children,
    handleChange,
    handleClick,
    handleEditSave,
    taskTxt,
    isCheck
}) => {
    const [task, setTask] = useState(taskTxt);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave= (e:React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if(!task.trim()) return;
        setIsEditing(false);
        handleEditSave(task);
    }

    const handleEdit = (): void => {
        setIsEditing(true);
    };

    return (
        <li className="todolist__item">
            <span className="todotext-wrap">
                <CheckBox
                    type='checkbox'
                    className='todo-checkBox'
                    onChange={handleChange}
                    checked={isCheck}
                />
                {!isEditing
                ? (<span className={'todo-text'} onClick={handleEdit}>{children}</span>)
                : (<span className={'todo-edit'}>
                    <InputText
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <Button
                        onClick={handleSave}
                    >
                        保存
                    </Button>
                </span>)
                }
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