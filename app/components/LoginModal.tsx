import LoginIllust from "./LoginIllust";

interface LoginModalControl {
  setModalOpen: () => void;
}

const LoginModal = ({ setModalOpen }: LoginModalControl) => {
  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 z-50 shadow-2xl opacity-95 glass flex ">
        <div className="bg-gray-200 ">
          <LoginIllust />
          환영합니다.
        </div>
        <div>
          <h3 className="text-xl">로그인</h3>
          <div>
            <p>이메일로 로그인</p>
            <div className="inline-flex w-full mt-3">
              <input
                className="py-3 px-5 flex-grow outline-none border box-border  focus:border-emerald-500 text-black"
                type="email"
                placeholder={"이메일을 입력하세요."}
              />
              <button className="py-3 px-5 bg-emerald-500">로그인</button>
            </div>
          </div>
          <div className="mt-10">
            <p>소셜 계정으로 로그인</p>
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
                      fill-rule="evenodd"
                      d="M7.84 20v-8.945H4.844V7.5H7.84V4.7C7.84 1.655 9.7 0 12.414 0c1.3 0 2.418.098 2.742.14v3.18h-1.883c-1.476 0-1.761.703-1.761 1.73V7.5h3.332l-.457 3.555h-2.875V20"
                      clip-rule="evenodd"
                    ></path>
                  </mask>
                  <g mask="url(#facebook-icon_svg__a)">
                    <path fill="#fff" d="M0 0h20v20H0z"></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
          <p className="register">
            아직 회원이 아니신가요? <button className="font-bold">회원가입</button>
          </p>
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