import { FC } from 'react';
import InputText from './InputText';
import Button from './Button';

type AddTaskFormProps = {
    handleEntryClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
};

const AddTaskForm: FC<AddTaskFormProps> = ({handleEntryClick}) => {
    return (
        <div className='todolist-formbox'>
            <InputText
                className='todo-input-text'
                name='todo-input-text'
                placeholder='タスク内容'
            ></InputText>
            <Button
                type='submit'
                className='btn-entry'
                onClick={handleEntryClick}
            >
                登録
            </Button>
        </div>
    )
}

export default AddTaskForm;