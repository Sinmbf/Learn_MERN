import { Box, Typography, Avatar } from "@mui/material";
import { useAuth } from "../../contexts/useContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Message = {
  role: string;
  content: string;
};

const ChatItem = ({ role, content }: Message) => {
  const auth = useAuth();

  // Function to separate code blocks from the given content
  const separateBlocks = (content: string) => {
    if (content?.includes("```")) {
      const blocks = content.split("```");
      return blocks;
    }
  };

  // Function to check if there contains a code in a block
  const isCodeBlock = (block: string) => {
    if (
      block.includes(";") ||
      block.includes("[") ||
      block.includes("]") ||
      block.includes("{") ||
      block.includes("}") ||
      block.includes("=")
    ) {
      return true;
    }
    return false;
  };

  // Separate the message content into blocks
  const blocks = separateBlocks(content);

  // Function to determine the programming language of the code block
  const determineProgrammingLanguage = (block: string) => {
    const language = block.split("\n")[0];
    return language;
  };

  return role === "assistant" ? (
    <Box
      key={crypto.randomUUID()}
      sx={{
        display: "flex",
        gap: 2,
        bgcolor: "#000000",
        padding: 2,
      }}
    >
      <Avatar src="robot.png"></Avatar>
      {/* Message Block */}
      <Box sx={{ overflow: "scroll" }}>
        {blocks && blocks.length ? (
          blocks.map((block) => {
            return isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={crypto.randomUUID()}
                language={determineProgrammingLanguage(block)}
                style={coldarkDark}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography key={crypto.randomUUID()}>{block}</Typography>
            );
          })
        ) : (
          <Typography key={crypto.randomUUID()}>{content}</Typography>
        )}
      </Box>
    </Box>
  ) : (
    <Box
      key={crypto.randomUUID()}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: 2,
      }}
    >
      <Avatar sx={{ bgcolor: "white" }}>
        <Typography variant="h6">
          {auth?.user?.name.split("")[0]}
          {auth?.user?.name.split(" ")[1] && auth?.user?.name.split(" ")[1][0]}
        </Typography>
      </Avatar>
      {/* Message Block */}
      <Box sx={{ overflow: "scroll" }}>
        {blocks && blocks.length ? (
          blocks.map((block) => {
            return isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={crypto.randomUUID()}
                language="javascript"
                style={coldarkDark}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography key={crypto.randomUUID()}>{block}</Typography>
            );
          })
        ) : (
          <Typography key={crypto.randomUUID()}>{content}</Typography>
        )}
      </Box>
    </Box>
  );
};
export default ChatItem;
