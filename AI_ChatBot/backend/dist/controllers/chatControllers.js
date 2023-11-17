import { configureOpenAi } from "../config/open-ai-config.js";
import User from "../models/User.js";
// Controller function to get all the chats of the user
export const getAllChats = async (req, res, next) => {
    try {
        // Get the user Id from the response locals
        const userId = res.locals.jwtData.id;
        // Find the user by their id in the database
        let user = await User.findById(userId);
        if (!user) {
            return res.status(401).send("User not registered or invalid token");
        }
        return res.status(200).json({ message: "Ok", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error", reason: error.message });
    }
};
// Controller function to generate new chats of the user
export const generateNewChat = async (req, res, next) => {
    try {
        // Get the message provided by the user
        const { message } = req.body;
        // Find the user by their id in the database
        const userId = res.locals.jwtData.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(401).send("User not registered or invalid token");
        }
        // Grab the chats of the user (role and content)
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));
        chats.push({ role: "user", content: message });
        // Add the new chats in the database
        user.chats.push({ role: "user", content: message });
        const openai = configureOpenAi();
        // Generate open api chat completion
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chats.push(chatCompletion.choices[0].message);
        await user.save();
        return res.status(200).json({ message: "Ok", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error", reason: error.message });
    }
};
// Controller function to delete chats of the user
export const deleteChats = async (req, res, next) => {
    try {
        // Find the user by their id in the database
        const userId = res.locals.jwtData.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(401).send("User not registered or invalid token");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "Ok" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error", reason: error.message });
    }
};
//# sourceMappingURL=chatControllers.js.map