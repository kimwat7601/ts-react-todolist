import { FC, useState } from 'react';
import InputText from './InputText';
import Button from './Button';

type AddTaskFormProps = {
    // handleEntryClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
    onAddTask: (inputValue: string) => void;
    // inputRef: React.RefObject<HTMLInputElement | null>;
};

const AddTaskForm: FC<AddTaskFormProps> = ({ onAddTask }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if(!inputValue.trim()) return;
        onAddTask(inputValue);
        setInputValue('');
    };

    return (
        <div className='todolist-formbox'>
            <form onSubmit={handleSubmit}>
                <InputText
                    className='todo-input-text'
                    name='todo-input-text'
                    placeholder='タスク内容'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                ></InputText>
                <Button
                    type='submit'
                    className='btn-entry'
                    // onClick={handleEntryClick}
                >
                    登録
                </Button>
            </form>
        </div>
    )
}

export default AddTaskForm;