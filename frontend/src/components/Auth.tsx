import { SignupInput } from "@surajkumargupta/medium-common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest() {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == "signup" ? "signup" : "signin"}`, postInputs);
        const {jwt} = response.data;
        localStorage.setItem("token", jwt);
        navigate("/blogs");
    } catch (error) {
        // alert the user here that the request failed
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
            <div className="px-10">
              <div className="text-3xl font-extrabold">
                Create an account
              </div>
              <div className="text-slate-400">
                {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                <Link className="pl-2 underline" to={type === "signup" ? "/signin" : "/signup"}>
                 {type === "signup" ? "Sign in" : "Sign up"}
                </Link>
              </div>
            </div>
            <div className="pt-8">
              {type === "signup" &&<LabelInput
                label="Name"
                placeholder="Harkirat Singh..."
                onChange={(e) => {
                  setPostInputs({ ...postInputs, name: e.target.value });
                }}
              />}
              <LabelInput
                label="Username"
                placeholder="Harkirat@gmail.com"
                onChange={(e) => {
                  setPostInputs({ ...postInputs, username: e.target.value });
                }}
              />
              <LabelInput
                label="Password"
                placeholder="Strong Password"
                type="password"
                onChange={(e) => {
                  setPostInputs({ ...postInputs, password: e.target.value });
                }}
              />
              <button onClick={sendRequest} type="button" className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "signup" : "signin"}</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelInput({ label, placeholder, onChange, type }: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-gray-900 dark:text-white font-bold pt-4">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
