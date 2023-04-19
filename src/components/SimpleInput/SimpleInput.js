import React from "react";
import { TextField } from "@mui/material";
import FieldTooltip from "../FieldTooltip/FieldTooltip";

const SimpleInput = ({
  label,
  name,
  type,
  rules,
  error,
  required,
  placeholder,
  helperText,
  register,
  inputProps,
  tooltip,
  ...rest
}) => {
  return (
    <span className="d-flex align-items-top gap-3">
      <TextField
        {...register(name, { required })}
        type={type}
        helperText={helperText}
        InputProps={inputProps}
        id={name}
        error={error}
        name={name}
        label={label}
        InputLabelProps={{ required: false }}
        placeholder={placeholder}
        {...rest}
        sx={{ width: 300 }}
        style={{ minWidth: 300 }}
      />
      {tooltip && <FieldTooltip title={tooltip} />}
    </span>
  );
};

export default SimpleInput;
