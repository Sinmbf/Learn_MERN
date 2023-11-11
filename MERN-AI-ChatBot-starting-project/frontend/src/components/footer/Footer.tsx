import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="text-center p-14 text-2xl">
      Built with love by{" "}
      <span className="bg-black text-teal-400 p-3 rounded hover:invert">
        <Link target="_blank" to="http://youtube.com/indiancoders">
          Indian Coders
        </Link>
      </span>{" "}
      Indian Coders
    </footer>
  );
};
