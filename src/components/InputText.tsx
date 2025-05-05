import { FC } from 'react';

type InputTextProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputText: FC<InputTextProps> = ({...props}) => {
    return (
        <input
            type='text'
            {...props}
        ></input>
    );
};

export default InputText;