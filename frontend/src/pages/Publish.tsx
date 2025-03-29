import { useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  return (
    <div className="">
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-screen-lg w-full pt-8">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Your Title
          </label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className=" focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
            placeholder="Title"
          />
          <div className="rounded-t-lg">
            <TextEditor
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <button
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog`,
                  { title, content },
                  {
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                  }
                );
                navigate(`/blog/${response.data.id}`);
              }}
              type="submit"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            >
              Publish post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;

function TextEditor({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <form>
      <div className="w-full mb-4  bg-gray-50 p-2 mt-4 rounded-lg">
        <div className=" bg-white rounded-b-lg border border-gray-200 ">
          <label className="sr-only">Publish post</label>
          <textarea
            onChange={onChange}
            id="editor"
            rows={8}
            className="focus:outline-none block w-full p-2 text-sm text-gray-800 bg-white border-0  focus:ring-0 "
            placeholder="Write an article..."
            required
          ></textarea>
        </div>
      </div>
    </form>
  );
}
