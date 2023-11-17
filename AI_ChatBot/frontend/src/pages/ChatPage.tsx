/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { useAuth } from "../contexts/useContext";
import { Send } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import ChatItem from "../components/chat/ChatItem";
import {
  deleteChats,
  generateNewChat,
  getChats,
} from "../helpers/apiCommunicators";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const ChatPage = () => {
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const navigate = useNavigate();

  // Get all the chats of the user
  useEffect(() => {
    const getAllChats = async () => {
      try {
        toast.loading("Getting chats of the user...", { id: "getChats" });
        const data = await getChats();
        setChatMessages([...data.chats]);
        toast.success("Successfully restored chats of the user", {
          id: "getChats",
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to restore the chats", { id: "getChats" });
      }
    };
    if (auth?.user && auth?.isLoggedIn) {
      getAllChats();
    }
  }, [auth]);

  // Check if the user is logged in and if not then redirect to login page
  useEffect(() => {
    if (!auth?.user) {
      toast.error("Please login or register to access our feature", {
        id: "auth",
      });
      return navigate("/login");
    }
  }, [auth]);

  // Function to handle click send message
  const handleClickSendMessage = async () => {
    const content = inputRef?.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prevMessage) => {
      return [...prevMessage, newMessage];
    });
    // Send API request to the backend for generating chat
    toast.loading("Generating answers...", { id: "generateAnswer" });
    const data = await generateNewChat(newMessage.content);
    setChatMessages([...data.chats]);
    toast.success("Successfully generated answers", { id: "generateAnswer" });
  };

  // Function to handle click delete conversation
  const handleClickDeleteConversation = async () => {
    toast.loading("Deleting chats...", { id: "deleteChats" });
    await deleteChats();
    setChatMessages([]);
    toast.success("Successfully deleted the chats", { id: "deleteChats" });
  };

  // Function to handle press enter key
  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClickSendMessage();
    }
  };

  return (
    <>
      <Container
        sx={{
          marginTop: "8rem",
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          gap: 4,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Information */}
        <Box
          sx={{
            bgcolor: "#343541",
            height: "100%",
            flex: 0.3,
            borderRadius: ".5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            padding: 3,
            boxShadow: "-3px -3px 20px #D32F2F",
          }}
        >
          <Avatar sx={{ bgcolor: "white", marginTop: "2rem", padding: "2rem" }}>
            <Typography variant="h4">
              {auth?.user?.name.split("")[0]}
              {auth?.user?.name.split(" ")[1] &&
                auth?.user?.name.split(" ")[1][0]}
            </Typography>
          </Avatar>
          <Typography variant="body1" align="center">
            You are talking to an intelligent bot
          </Typography>
          <Typography variant="body2">
            Satisfy your curiosity by asking questions related to almost any
            topics. For example, you can ask about politics, education,
            programming or even various questions related to history and so on.
            Enjoy your time!
          </Typography>
          {/* Button to clear conversation */}
          <Button
            variant="outlined"
            color="error"
            onClick={handleClickDeleteConversation}
          >
            Clear Conversation
          </Button>
        </Box>
        {/* Chat */}
        <Box sx={{ margin: "auto", flex: 0.8, width: "100%" }}>
          <Typography variant="h4" align="center" margin={4}>
            Model - GPT 3.5 Turbo
          </Typography>
          {/* Chat Items */}
          <Box
            sx={{
              overflowY: "scroll",
              bgcolor: "#343541",
              height: "50vh",
              borderRadius: ".3rem",
            }}
          >
            {chatMessages.map((message) => {
              return <ChatItem key={crypto.randomUUID()} {...message} />;
            })}
          </Box>
          {/* Input Area */}
          <Box
            sx={{
              position: "relative",
              bgcolor: "#202122",
              display: "flex",
              alignItems: "center",
              border: "none",
              borderRadius: ".4rem",
            }}
          >
            <input
              ref={inputRef}
              onKeyDown={handlePressEnter}
              type="text"
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                color: "white",
                padding: "1.6rem",
                borderRadius: ".4rem",
                fontSize: "1.1rem",
              }}
              placeholder="Send your query"
            ></input>
            <IconButton
              sx={{ marginRight: "1rem" }}
              onClick={handleClickSendMessage}
            >
              <Send fontSize={"large"} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default ChatPage;
