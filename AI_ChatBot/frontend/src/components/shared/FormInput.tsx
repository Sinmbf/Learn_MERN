import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

type Props = {
  label: string;
  type: string;
  name: string;
  error?: string | boolean;
};

const FormInput = (props: Props) => {
  const { label, type, name, error } = props;
  const [showPassword, setShowPassword] = useState(false);
  // Function to toggle show password
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {type === "password" ? (
        <TextField
          error={error ? true : false}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          name={name}
          label={label}
          type={showPassword ? "text" : "password"}
          required
          sx={{
            marginBottom: "2rem",
            width: { md: "70%", xs: "80%", lg: "60%" },
            height: "4rem",
          }}
          helperText={error ? error : ""}
        />
      ) : (
        <TextField
          error={error ? true : false}
          name={name}
          label={label}
          type={type}
          required
          sx={{
            marginBottom: "2rem",
            width: { md: "70%", xs: "80%", lg: "60%" },
            height: "4rem",
          }}
          helperText={error ? error : ""}
        />
      )}
    </>
  );
};
export default FormInput;
