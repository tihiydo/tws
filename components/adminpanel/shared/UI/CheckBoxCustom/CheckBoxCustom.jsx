import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Controller, useFormContext} from "react-hook-form";


const CheckBoxCustom = ({name, label, style}) => {
    const methods = useFormContext();

    return (
        <Controller
            name={name}
            control={methods.control}
            // defaultValue={false}
            render={({ field: { value, onChange }}) => (
                <FormControlLabel
                    control={
                        <Checkbox
                            value={value}
                            checked={value}
                            onChange={e => onChange(e.target.checked)}
                        />
                    }
                    label={label}
                />
            )}
        />
      );
}

export default CheckBoxCustom