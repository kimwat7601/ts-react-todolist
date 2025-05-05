import { FC } from 'react';

type ButtonProps =  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({children, ...props}) => {
    return (
        <button {...props}>
            {children}
        </button>
    )
}

export default Button;