import { Button } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  text: string;
  bgcolor: "primary" | "success" | "error";
  to: string;
  onClick?: () => Promise<void>;
};

const LinkButtons = (props: Props) => {
  const { text, bgcolor, to, onClick } = props;
  return (
    <>
      <Button
        color={bgcolor}
        variant="contained"
        sx={{
          mr: 2,
        }}
        onClick={onClick}
      >
        <Link
          to={to}
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          {text}
        </Link>
      </Button>
    </>
  );
};
export default LinkButtons;
