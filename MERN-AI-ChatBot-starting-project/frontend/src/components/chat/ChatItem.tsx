import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  role: string;
  content: string;
};

// Function to extract code from a string
const extractCodeFromString = (message: string) => {
  if (message?.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
};

// Function to verify if a block is a code block
const isCodeBlock = (string: string) => {
  if (
    string?.includes("=") ||
    string?.includes(";") ||
    string?.includes("[") ||
    string?.includes("]") ||
    string?.includes("{") ||
    string?.includes("}") ||
    string?.includes("#") ||
    string?.includes("/")
  ) {
    return true;
  }
  return false;
};

// Function to determine the programming language of a code block
const determineProgrammingLanguage = (string: string | undefined) => {
  const newString = string?.split("\n");
  return newString && newString[0];
};

const ChatItem = (props: Props) => {
  const auth = useAuth();
  const { role, content } = props;
  const messageBlocks = extractCodeFromString(content);
  const programmingLanguage = determineProgrammingLanguage(
    messageBlocks && messageBlocks[1]
  );

  return role === "user" ? (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 3,
        bgcolor: "#343541",
        borderRadius: 1,
      }}
    >
      <Avatar sx={{ bgcolor: "white", color: "black", alignSelf: "start" }}>
        {auth?.user?.name[0].toUpperCase()}
        {auth?.user?.name.split(" ")[1] && auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      {/* Content */}
      <Typography sx={{ overflow: "scroll" }} component={"span"}>
        {!messageBlocks && content}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={crypto.randomUUID()}
                style={coldarkDark}
                language={programmingLanguage && programmingLanguage}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography key={crypto.randomUUID()} component={"span"}>
                {block}
              </Typography>
            )
          )}
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 3,
        bgcolor: "#111D28",
        borderRadius: 1,
      }}
    >
      <Avatar sx={{ bgcolor: "black", alignSelf: "start" }}>
        <img src="openai.png" className="invert" alt="OpenAi" />
      </Avatar>
      {/* Content */}
      <Typography sx={{ overflow: "scroll" }} component={"span"}>
        {!messageBlocks && content}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={crypto.randomUUID()}
                style={coldarkDark}
                language={programmingLanguage && programmingLanguage}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography key={crypto.randomUUID()} component={"span"}>
                {block}
              </Typography>
            )
          )}
      </Typography>
    </Box>
  );
};
export default ChatItem;
