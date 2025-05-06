import { forwardRef } from 'react';

type InputTextProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputText = forwardRef<HTMLInputElement, InputTextProps>((props, ref) => {
    return (
        <input
            ref={ref}
            type='text'
            {...props}
        ></input>
    );
});

export default InputText;