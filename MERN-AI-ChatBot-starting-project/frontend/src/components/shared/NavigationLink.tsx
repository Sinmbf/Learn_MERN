import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
  const { to, bg, text, textColor } = props;
  return (
    <Link
      className="mx-2 font-semibold p-2 rounded-md uppercase tracking-wide"
      to={to}
      style={{ background: bg, color: textColor }}
      onClick={props?.onClick}
    >
      {text}{" "}
    </Link>
  );
};
export default NavigationLink;
