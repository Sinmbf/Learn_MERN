import { TypeAnimation } from "react-type-animation";

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        "Welcome To MERN GPT 3.5 Turbo",
        1000,
        "Chat With An Intelligent Ai",
        1500,
        "Your Own Customized Chat Gpt",
        1000,
      ]}
      wrapper="h2"
      speed={50}
      style={{
        fontSize: "2em",
        display: "inline-block",
        height: "5rem",
        textAlign: "center",
      }}
      repeat={Infinity}
    />
  );
};
export default TypingAnimation;
