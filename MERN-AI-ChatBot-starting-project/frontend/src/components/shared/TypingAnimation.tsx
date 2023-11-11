import { TypeAnimation } from "react-type-animation";

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "Chat With Your Own Ai",
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        "Built using Open Ai",
        2000,
        "Your Own Customized ChatGPT",
        1500,
      ]}
      wrapper="span"
      speed={50}
      style={{
        fontSize: "2.5rem",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
        height: "3rem",
        marginBottom: "3rem",
      }}
      repeat={Infinity}
    />
  );
};
export default TypingAnimation;
