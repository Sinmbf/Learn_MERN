import User from "../models/User.js";
import { configureOpenAi } from "../config/open-ai-config.js";
import { OpenAIApi } from "openai";
// Controller function to generate chat
export const generateChatCompletion = async (req, res, next) => {
    try {
        // Get the message provided by the user
        const { message } = req.body;
        // Find the user by his/her id
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or invalid token");
        }
        // Grab the chats of the user
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        // Send all chats with new one to open api
        const config = configureOpenAi();
        const openAi = new OpenAIApi(config);
        // Get latest response
        const chatResponse = await openAi.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
//# sourceMappingURL=chat-controllers.js.map