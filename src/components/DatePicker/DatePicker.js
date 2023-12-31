import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import './DatePicker.module.css';

export const DatePickers = ({data, labelValue = 'Date&Time picker'}) => {
  const [value, setValue] = React.useState(new Date(data));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        {/*<DesktopDatePicker*/}
        {/*  label="Date desktop"*/}
        {/*  inputFormat="MM/dd/yyyy"*/}
        {/*  value={value}*/}
        {/*  onChange={handleChange}*/}
        {/*  renderInput={(params) => <TextField {...params} />}*/}
        {/*/>*/}
        {/*<MobileDatePicker*/}
        {/*  label="Date mobile"*/}
        {/*  inputFormat="MM/dd/yyyy"*/}
        {/*  value={value}*/}
        {/*  onChange={handleChange}*/}
        {/*  renderInput={(params) => <TextField {...params} />}*/}
        {/*/>*/}
        {/*<TimePicker*/}
        {/*  label="Time"*/}
        {/*  value={value}*/}
        {/*  onChange={handleChange}*/}
        {/*  renderInput={(params) => <TextField {...params} />}*/}
        {/*/>*/}
        <DateTimePicker
          label={labelValue}
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
