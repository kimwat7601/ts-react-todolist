import { FC } from 'react';

type CheckBoxProps = React.InputHTMLAttributes<HTMLInputElement>;

const CheckBox: FC<CheckBoxProps> = ({...props}) => {
    return(
        <input
            {...props}
        />
    );
};

export default CheckBox;