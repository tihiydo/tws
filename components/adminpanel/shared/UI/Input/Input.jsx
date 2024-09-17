
import styles from './input.module.scss'

import TextField from '@mui/material/TextField';
import {useFormContext} from "react-hook-form";

const Input = ({label, style, name, type, ...props}) => {
    const methods = name && useFormContext();
    const isRegistered = name && {...methods.register(name)};

    return (
        <TextField
            {...props}
            size={'small'}
            type={type}
            id="outlined-basic"
            error={!!methods.formState.errors[name]}
            helperText={methods.formState.errors[name]?.message ?? ''}
            label={label}
            style={style}
            variant="outlined"
            {...isRegistered}
        />
      );
}

export default Input;