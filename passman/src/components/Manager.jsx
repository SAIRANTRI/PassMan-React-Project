import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    let passwordArray;
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    //alert("copied to clipboard - " + text);
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writetext(text);
  };

  const showPassword = () => {
    //alert("show the password");
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/hidden.png";
      passwordRef.current.type = "input";
    }
  };

  const savePassword = () => {
    //console.log(form);
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" });
      toast("Saved Succesfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast("Error: Password not saved! Please check that your input size must be greater than 3");
    }
  };
  const deletePassword = (id) => {
    console.log("Deleting password with id: ", id);
    let Confirm = confirm("Do you really want to delete this password?");
    if (Confirm) {
      setPasswordArray(passwordArray.filter((item) => item.id != id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id != id))
      );
      toast("Deleted Succesfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const editPassword = (id) => {
    console.log("Editing password with id: ", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id != id));
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute top-0 -z-10 h-full w-full bg-purple-50">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>
      <div className="p-3 md:p-0 mycontainer min-h-[88.2vh]">
        <h1 className="text-4xl font-bold text-center p-4">
          <span className="text-violet-800">&lt;</span>
          Pass
          <span className="text-violet-800">MAN/&gt;</span>
        </h1>
        <p className="text-violet-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-5 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-violet-500 w-full p-4 py-1 "
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-violet-500 w-full p-4 py-1 "
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-violet-500 w-full p-8 py-1 "
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute top-[4px] right-[3px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={28}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-purple-500 hover:bg-purple-400 rounded-full px-8 py-2 w-fit border-2 border-purple-950"
          >
            <div className="w-8 h-8">
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
            </div>
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show </div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className=" bg-purple-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border border-white text-center">
                        <div className="flex gap-3 items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="copybtn cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <img src="icons/copy.png" alt="" />
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center">
                        <div className="gap-3 flex items-center justify-center">
                          {item.username}
                          <div
                            className="copybtn cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <img src="icons/copy.png" alt="" />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex gap-3 items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className="copybtn cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <img src="icons/copy.png" alt="" />
                          </div>
                        </div>
                      </td>
                      <td className="flex justify-center py-2 border border-white text-center gap-3">
                        <span
                          className="justify-center cursor-pointer size-7"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <img
                            className=""
                            src="icons/edit.png"
                            alt=""
                          />
                        </span>
                        <span
                          className="justify-center cursor-pointer size-7"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <img
                            className=""
                            src="icons/bin.png"
                            alt=""
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
