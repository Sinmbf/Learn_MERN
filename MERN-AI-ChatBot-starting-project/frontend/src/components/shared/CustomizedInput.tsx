import { TextField } from "@mui/material";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  const { name, type, label } = props;
  return (
    <>
      <TextField
        margin="normal"
        InputLabelProps={{ style: { color: "white" } }}
        InputProps={{
          style: {
            width: "400px",
            borderRadius: "10",
            fontSize: "20",
            color: "white",
          },
        }}
        name={name}
        type={type}
        label={label}
        required
      ></TextField>
    </>
  );
};
export default CustomizedInput;
