/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
const Editor = ({ handleEditorChange, value }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  return (
    <>
      <ReactQuill
        value={value}
        className="w-full h-[20rem] mb-16"
        modules={modules}
        formats={formats}
        onChange={handleEditorChange}
      />
    </>
  );
};

export default Editor;
