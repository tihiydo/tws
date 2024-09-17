import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Controller, useFormContext} from "react-hook-form";

export default function MySelect({name, label, style, options, callback}) {
    const methods = name && useFormContext();
    // const isRegistered = name && {...methods.register(name)};
    // useEffect(() => {
    //     if (options.length) {
    //         setValues(options?.length ? options[0].value : undefined)
    //     } else {
    //         setValues(undefined)
    //     }
    // }, [options])
    // console.log(options)

  
    return (
      <Box sx={{ minWidth: 120 }} style={style}>
          <FormControl>
              <InputLabel id="category-label">{label}</InputLabel>
              <Controller
                  name={name}
                  control={methods.control}
                  defaultValue={options?.length ? options[0].value : ''}
                  render={({ field }) => (
                      <Select
                          style={{width: 300}}
                          {...field}
                          labelId="category-label"
                          label={label}
                          id="category-select"
                          onChange={(event) => {
                              field.onChange(event.target.value);
                              callback && callback(event.target.value);
                          }}
                      >
                          {options.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                              </MenuItem>
                          ))}
                      </Select>
                  )}
              />
          </FormControl>
      </Box>
    );
  }