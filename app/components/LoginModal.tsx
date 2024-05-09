"use client";
import { useState } from "react";
import LoginIllust from "./LoginIllust";
import useStore from "../store";
import axios from "axios";

interface LoginModalControl {
  setModalOpen: () => void;
}

const LoginModal = ({ setModalOpen }: LoginModalControl) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useStore((state) => state);

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("userId", response.data.currentUser.id);
        localStorage.setItem("username", response.data.currentUser.username);
        localStorage.setItem("accessToken", response.data.currentUser.accessToken);
        localStorage.setItem("email", response.data.currentUser.email);
        login();
        setModalOpen();
      }
    } catch (e) {
      console.error(e);
    }
    // login();
    // setModalOpen();
  };
  const handleRegister = async () => {
    // 회원가입
    setError("");
    if (usernameValidate()) {
      console.log("닉네임 유효성 검사 통과");
    } else {
      setError("닉네임은 특수문자 없이 2글자 이상 10글자 이하여야 합니다.");
      console.error("닉네임 유효성 검사 실패");
      return;
    }
    if (emailValidate()) {
      console.log("이메일 유효성 검사 통과");
    } else {
      setError("이메일이 유효하지 않습니다.");
      console.error("이메일 유효성 검사 실패");
      return;
    }
    if (passwordValidate()) {
      console.log("비밀번호 유효성 검사 통과");
    } else {
      setError("비밀번호는 4자 이상 16자 이하여야 합니다.");
      console.error("비밀번호 유효성 검사 실패");
      return;
    }

    try {
      const response = await axios.post("/auth/register", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        console.log("회원가입 성공! 환영해요");
        setModalOpen();
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response!.status === 409) {
          setError("이미 존재하는 이메일입니다.");
        }
      }
      // console.error(e);
    }
  };
  const usernameValidate = () => {
    const regex = /^[가-힣ㄱ-ㅎa-zA-Z0-9]{2,10}$/;
    if (regex.test(username)) return true;
    else return false;
  };

  const emailValidate = () => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regex.test(email)) return true;
    else return false;
  };

  const passwordValidate = () => {
    const regex = /^.{4,16}$/;
    if (regex.test(password)) return true;
    else return false;
  };

  return (
    <>
      <div
        className={`loginModal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 z-50 shadow-2xl opacity-95 glass flex `}
      >
        <div className="bg-gray-200 ">
          <LoginIllust />
          환영합니다.
        </div>
        <div>
          <h3 className="text-xl">{isLogin ? "로그인" : "회원가입"}</h3>
          <div>
            <p>이메일로 {isLogin ? "로그인" : "회원가입"}</p>
            {!isLogin && (
              <div className="inline-flex w-full mt-3">
                <input
                  className="py-3 px-5 flex-grow outline-none border box-border  focus:border-emerald-500 text-black"
                  type="text"
                  placeholder={"닉네임을 입력하세요"}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            )}
            <div className="inline-flex w-full mt-3">
              <input
                className="py-3 px-5 flex-grow outline-none border box-border  focus:border-emerald-500 text-black"
                type="email"
                placeholder={"이메일을 입력하세요."}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inline-flex w-full mt-3">
              <input
                className="py-3 px-5 flex-grow outline-none border box-border  focus:border-emerald-500 text-black"
                type="password"
                placeholder={"비밀번호를 입력하세요."}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={isLogin ? handleLogin : handleRegister}
                className="py-3 px-5 bg-emerald-500"
              >
                {isLogin ? "로그인" : "회원가입"}
              </button>
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
          </div>
          <div className="mt-10">
            <p>소셜 계정으로 {isLogin ? "로그인" : "회원가입"}</p>
            <div className="socialWrapper mt-4">
              <button>
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white">
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  height="20px"
                  width="20px"
                >
                  <path
                    fill="#4285F4"
                    d="M19.99 10.187c0-.82-.069-1.417-.216-2.037H10.2v3.698h5.62c-.113.92-.725 2.303-2.084 3.233l-.02.124 3.028 2.292.21.02c1.926-1.738 3.037-4.296 3.037-7.33z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M10.2 19.931c2.753 0 5.064-.886 6.753-2.414l-3.218-2.436c-.862.587-2.017.997-3.536.997a6.126 6.126 0 0 1-5.801-4.141l-.12.01-3.148 2.38-.041.112c1.677 3.256 5.122 5.492 9.11 5.492z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M4.398 11.937a6.008 6.008 0 0 1-.34-1.971c0-.687.125-1.351.329-1.971l-.006-.132-3.188-2.42-.104.05A9.79 9.79 0 0 0 .001 9.965a9.79 9.79 0 0 0 1.088 4.473l3.309-2.502z"
                  ></path>
                  <path
                    fill="#EB4335"
                    d="M10.2 3.853c1.914 0 3.206.809 3.943 1.484l2.878-2.746C15.253.985 12.953 0 10.199 0 6.211 0 2.766 2.237 1.09 5.492l3.297 2.503A6.152 6.152 0 0 1 10.2 3.853z"
                  ></path>
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  height="20px"
                  width="20px"
                >
                  <mask
                    id="facebook-icon_svg__a"
                    width="12"
                    height="20"
                    x="4"
                    y="0"
                    maskUnits="userSpaceOnUse"
                  >
                    <path
                      fill="#fff"
                      fillRule="evenodd"
                      d="M7.84 20v-8.945H4.844V7.5H7.84V4.7C7.84 1.655 9.7 0 12.414 0c1.3 0 2.418.098 2.742.14v3.18h-1.883c-1.476 0-1.761.703-1.761 1.73V7.5h3.332l-.457 3.555h-2.875V20"
                      clipRule="evenodd"
                    ></path>
                  </mask>
                  <g mask="url(#facebook-icon_svg__a)">
                    <path fill="#fff" d="M0 0h20v20H0z"></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
          {isLogin ? (
            <p className="register" onClick={() => setIsLogin(!isLogin)}>
              아직 회원이 아니신가요? <button className="font-bold">회원가입</button>
            </p>
          ) : (
            <p className="register" onClick={() => setIsLogin(!isLogin)}>
              계정이 이미 있으신가요? <button className="font-bold">로그인</button>
            </p>
          )}
        </div>
        <button className="absolute top-0 right-0 p-5 text-white" onClick={setModalOpen}>
          닫기
        </button>
      </div>
      <span
        onClick={setModalOpen}
        className="fixed top-0 left-0 w-screen h-screen z-40 opacity-75 bg-white backdrop:backdrop-blur-lg"
      ></span>
    </>
  );
};
export default LoginModal;
