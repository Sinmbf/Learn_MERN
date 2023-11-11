/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Box, Button, Typography, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  deleteChats,
  getAllChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "Assistant";
  content: string;
};

const Chat = () => {
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const navigate = useNavigate();
  // Function to delete chats
  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deleteChats" });
      await deleteChats();
      setChatMessages([]);
      toast.success("Deleted Chats successfully", { id: "deleteChats" });
    } catch (error) {
      console.log(error);
      toast.error("Chat deletion failed", { id: "deleteChats" });
    }
  };
  // Get all the chats of the user
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadChats" });
      getAllChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadChats" });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Chats loading failed", { id: "loadChats" });
        });
    }
  }, [auth]);
  // Check if the user is logged in and if not redirect to the login page
  useEffect(() => {
    if (!auth?.user) {
      toast.error("Please login or register to access our features", {
        id: "auth",
      });
      return navigate("/login");
    }
  }, [auth]);
  // Function to handle submit
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prevChats) => {
      return [...prevChats, newMessage];
    });
    // Send API request to the backend
    toast.loading("Generating answers...", { id: "createChat" });
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
    toast.success("Successfully generated answers...", { id: "createChat" });
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        justifyContent: "space-between",
        my: 4,
        p: 2,
      }}
    >
      {/* Display User Information */}
      <Box
        sx={{
          display: { lg: "flex", xs: "none" },
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "rgb(17,29,39)",
          height: "100%",
          flex: 0.9,
          borderRadius: 3,
          boxShadow: "10px 10px 15px #000",
          p: 3,
          mb: 4,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "white",
            color: "black",
            my: 3,
            fontFamily: "work sans",
          }}
        >
          {auth?.user?.name[0].toUpperCase()}
          {auth?.user?.name.split(" ")[1] &&
            auth?.user?.name.split(" ")[1][0].toUpperCase()}
        </Avatar>
        <Typography>You are talking to a chat bot</Typography>
        <Typography marginTop={3} marginBottom={3}>
          You can ask about various topics such as business, education,
          programming, history and so on. The chat bot is intelligent enough to
          answer your queries :)
        </Typography>
        <Button
          sx={{
            mt: "auto",
            bgcolor: red[300],
            color: "white",
            ":hover": {
              bgcolor: red[500],
            },
          }}
          onClick={handleDeleteChats}
        >
          Clear Conversation
        </Button>
      </Box>
      {/* Chats */}
      <Box
        sx={{
          width: {
            md: "90%",
            lg: "75%",
            xs: "100%",
          },
          border: "2px solid #444654",
          borderRadius: 3,
          p: 2,
          mx: "auto",
        }}
      >
        <Typography variant="h4" align="center" marginTop={3} gutterBottom>
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            overflow: "scroll",
            height: "50vh",
            scrollBehavior: "smooth",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {chatMessages?.map((chat) => (
            <ChatItem key={crypto.randomUUID()} {...chat} />
          ))}
        </Box>
        {/* Input Box */}
        <div
          className="w-full mb-3 p-2 mt-3 flex relative rounded bg-[#202122]"
          style={{ boxShadow: "5px 5px 5px #000" }}
        >
          <input
            ref={inputRef}
            type="text"
            className="w-full p-4 text-white bg-transparent focus:outline-none"
            placeholder="Send your query"
            onKeyPress={handleKeyPress}
          />
          <IconButton sx={{ color: "white" }} onClick={handleSubmit}>
            <SendIcon />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};
export default Chat;
