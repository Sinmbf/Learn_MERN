import User from "../models/User.js";

// GET USER
export const getUser = async (req, res) => {
  try {
    // Get the user id from the request parameters
    const { id } = req.params;
    // Find the user by his id
    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// GET USER FRIENDS
export const getUserFriends = async (req, res) => {
  try {
    // Get the user id from the request parameters
    const { uid } = req.params;
    // Find the user by his id
    const user = await User.findById(uid);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, imagePath }) => {
        return { _id, firstName, lastName, occupation, location, imagePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// UPDATE USER FRIENDS
export const addRemoveFriend = async (req, res) => {
  try {
    // Get the user and user's friends id from the request parameter
    const { uid, friendId } = req.params;
    // Find the user by his id
    const user = await User.findById(uid);
    // Find the user friend from his id
    const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== uid);
    } else {
      user.friends.push(friendId);
      friend.friends.push(uid);
    }
    await user.save();
    await friend.save();
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, imagePath }) => {
        return { _id, firstName, lastName, occupation, location, imagePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
