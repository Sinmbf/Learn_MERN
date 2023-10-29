import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";

const DeletePost = () => {
  // Get the post id from the parameters
  const { pid } = useParams();
  const navigate = useNavigate();
  // Function to handle delete click
  const handleDeleteClick = async () => {
    try {
      const response = await axios.delete(
        `https://iblogs-backend-yhqi.onrender.com/deletepost/${pid}`,
        { withCredentials: true }
      );
      enqueueSnackbar(response.data.message, { variant: "success" });
      navigate("/");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data, { variant: "error" });
      navigate("/post/" + pid);
    }
  };
  // Function to handle cancel click
  const handleCancelClick = () => {
    navigate("/post/" + pid);
  };
  return (
    <>
      <div className="max-w-xl mx-auto rounded-md flex flex-col justify-center items-center border-2 border-emerald-600 p-3 bg-emerald-500">
        <div className="text-center text-2xl text-red-500 mb-4">
          <h2>Delete the post</h2>
        </div>
        <hr />
        <p className="text-lg text-black mb-4">
          Are you sure you want to delete this post?
        </p>
        <div className="buttons flex gap-2 self-end">
          <button
            className="bg-slate-500 p-2 rounded-md text-white hover:bg-slate-600 text-center"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 p-2 rounded-md text-white hover:bg-red-600 text-center"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DeletePost;
