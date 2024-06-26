"use client";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import exUserProfile from "../../public/userProfile.jpg";
import { useState, useEffect, useRef, MouseEvent } from "react";
import { usePathname, useParams } from "next/navigation";
import useStore from "../store";
import LoginModal from "./LoginModal";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserPage, setIsUserPage] = useState(false);

  const onClickDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  let pathname = usePathname();
  const isWritePage = pathname === "/write";

  const { username } = useParams();

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", () => {
      handleClickOutside;
    });
    return () => {
      document.removeEventListener("mousedown", () => {
        handleClickOutside;
      });
    };
  }, []);

  // Auth
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { login, logout, isLoggedIn } = useStore((state) => state);

  const [thumbnail, setThumbnail] = useState("");
  const loginModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    localStorage.removeItem("thumbnailUrl");
    logout();
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      login();
    }
  }, [isLoggedIn, login]);

  useEffect(() => {
    const thumbnailUrl = localStorage.getItem("thumbnailUrl");
    if (thumbnailUrl) {
      if (thumbnailUrl === "undefined") {
        setThumbnail("");
      } else {
        setThumbnail(thumbnailUrl);
      }
    }
  }, [isLoggedIn]);

  return (
    !isWritePage && (
      <header className="navbar max-w-5xl mx-auto h-16 p-5 flex justify-between items-center bg-transparent">
        <div>
          {isUserPage ? (
            <div className="HeaderCustomLogo_block__lqfyb">
              <a className="HeaderCustomLogo_logo__7A9ig" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 192 192">
                  <path
                    fillRule="evenodd"
                    d="M24 0h144c13.255 0 24 10.745 24 24v144c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V24C0 10.745 10.745 0 24 0Zm25 57.92v7.56h18l13.68 77.04 17.82-1.26c17.52-22.2 29.34-38.82 35.46-49.86 6.24-11.16 9.36-20.46 9.36-27.9 0-4.44-1.32-7.8-3.96-10.08-2.52-2.28-5.7-3.42-9.54-3.42-7.2 0-13.2 3.06-18 9.18 4.68 3.12 7.86 5.7 9.54 7.74 1.8 1.92 2.7 4.5 2.7 7.74 0 5.4-1.62 11.52-4.86 18.36-3.12 6.84-6.54 12.9-10.26 18.18-2.4 3.36-5.46 7.5-9.18 12.42L88.06 57.2c-.96-4.8-3.96-7.2-9-7.2-2.28 0-6.66.96-13.14 2.88-6.48 1.8-12.12 3.48-16.92 5.04Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                className="HeaderCustomLogo_userLogo__RcxhQ __className_32c6c7"
                href="/@shipfriend"
              >
                <span className="utils_ellipsis__M_m5g">shipfriend.log</span>
              </a>
            </div>
          ) : (
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 71 24"
                className="velogLogo"
                data-testid="velog-logo"
                width="71"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M12.248 5.328 7.76 18H4.64L.152 5.328h2.904l3.192 10.44 3.24-10.44h2.76Zm5.51 7.2c.08 1.232.433 2.16 1.057 2.784.64.608 1.44.912 2.4.912.592 0 1.152-.088 1.68-.264a7.693 7.693 0 0 0 1.656-.84l1.152 1.632a6.443 6.443 0 0 1-2.088 1.152c-.8.272-1.64.408-2.52.408-1.936 0-3.44-.6-4.512-1.8-1.072-1.216-1.608-2.832-1.608-4.848 0-1.264.232-2.4.696-3.408.464-1.024 1.136-1.824 2.016-2.4.88-.576 1.904-.864 3.072-.864 1.68 0 3.008.568 3.984 1.704.992 1.12 1.488 2.664 1.488 4.632 0 .48-.024.88-.072 1.2h-8.4Zm3.025-5.544c-.864 0-1.568.312-2.112.936-.544.624-.856 1.552-.936 2.784h5.88c-.032-1.2-.288-2.12-.768-2.76-.48-.64-1.168-.96-2.064-.96Zm14.702 7.56c0 1.072.64 1.608 1.92 1.608.64 0 1.312-.144 2.016-.432l.672 1.872c-.88.48-1.968.72-3.264.72-1.264 0-2.256-.352-2.976-1.056-.704-.72-1.056-1.704-1.056-2.952V2.208h-3.816V.24h6.504v14.304Zm13.91-9.552c1.825 0 3.233.6 4.225 1.8.992 1.184 1.488 2.8 1.488 4.848s-.504 3.672-1.512 4.872c-1.008 1.2-2.416 1.8-4.224 1.8-1.824 0-3.24-.584-4.248-1.752-.992-1.184-1.488-2.816-1.488-4.896 0-2.016.504-3.632 1.512-4.848 1.024-1.216 2.44-1.824 4.248-1.824Zm0 2.088c-.975 0-1.711.376-2.207 1.128-.48.752-.72 1.904-.72 3.456 0 1.568.24 2.728.72 3.48.48.736 1.208 1.104 2.184 1.104.976 0 1.704-.376 2.184-1.128.48-.752.72-1.912.72-3.48 0-1.552-.24-2.696-.72-3.432-.48-.752-1.2-1.128-2.16-1.128Zm20.68-1.128a7.26 7.26 0 0 1-1.585.336c-.575.048-1.271.072-2.087.072.767.352 1.343.792 1.727 1.32.385.528.577 1.168.577 1.92 0 .832-.208 1.568-.624 2.208-.4.64-.977 1.144-1.728 1.512-.752.368-1.64.552-2.665.552-.72 0-1.295-.072-1.727-.216a1.311 1.311 0 0 0-.409.48 1.183 1.183 0 0 0-.144.576c0 .64.52.96 1.56.96h2.209c.895 0 1.695.152 2.4.456.704.304 1.248.728 1.632 1.272.4.528.6 1.128.6 1.8 0 1.264-.545 2.24-1.633 2.928-1.087.704-2.656 1.056-4.703 1.056-1.425 0-2.553-.152-3.385-.456-.816-.288-1.4-.72-1.752-1.296-.336-.56-.504-1.288-.504-2.184h2.4c0 .48.088.856.264 1.128.193.288.52.496.985.624.464.144 1.136.216 2.016.216 1.28 0 2.2-.16 2.76-.48.56-.304.84-.76.84-1.368 0-.512-.225-.912-.672-1.2-.433-.272-1.025-.408-1.777-.408h-2.184c-1.136 0-2-.232-2.592-.696-.576-.464-.864-1.048-.864-1.752 0-.432.12-.848.36-1.248s.585-.744 1.033-1.032c-.752-.4-1.304-.88-1.657-1.44-.336-.576-.504-1.28-.504-2.112 0-.88.225-1.656.672-2.328.448-.688 1.072-1.216 1.872-1.584.8-.384 1.712-.576 2.736-.576 1.377.016 2.465-.08 3.265-.288.816-.208 1.68-.536 2.591-.984l.697 2.232Zm-6.529.912c-.847 0-1.487.24-1.92.72-.431.464-.648 1.096-.648 1.896 0 .816.216 1.464.648 1.944.449.464 1.096.696 1.945.696.8 0 1.407-.232 1.823-.696.416-.464.624-1.128.624-1.992 0-1.712-.823-2.568-2.471-2.568Z"
                ></path>
              </svg>
            </Link>
          )}
        </div>
        <div className="flex gap-3">
          <Link className="navbarItem" href={"/notifications"}>
            <IoNotificationsOutline size={20} />
          </Link>
          <Link className="navbarItem" href={"/search"}>
            <IoIosSearch size={20} />
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                href={"/write"}
                className="font-bold rounded-3xl px-4 py-1 border hover:bg-black hover:text-white transition-colors"
              >
                새 글 작성
              </Link>
              <button
                onClick={onClickDropdown}
                className="relative inline-flex items-center gap-1.5"
              >
                <div className="rounded-full w-10 h-10 overflow-hidden">
                  {thumbnail ? (
                    <Image
                      className="object-cover"
                      src={thumbnail}
                      alt={"userProfile"}
                      width={50}
                      height={50}
                    />
                  ) : (
                    <Image
                      className="object-cover"
                      src={exUserProfile}
                      alt={"userProfile"}
                      width={50}
                      height={50}
                    />
                  )}
                  <Image
                    className="object-cover"
                    src={
                      (localStorage.getItem("thumbnailUrl") as string)
                        ? (localStorage.getItem("thumbnailUrl") as string)
                        : exUserProfile
                    }
                    alt={"userProfile"}
                    width={50}
                    height={50}
                  />
                </div>
                <svg
                  stroke="black"
                  fill="black"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1.2em"
                  width="1.2em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M7 10l5 5 5-5z"></path>
                </svg>
                {isDropdownOpen && (
                  <div ref={dropdownRef} className="dropdown shadow-lg">
                    <Link href={`/@${localStorage.getItem("email")?.split("@")[0]}/posts`}>
                      내 블로그
                    </Link>
                    <Link href={"/saves"}>임시 글</Link>
                    <Link href={"/lists"}>읽기 목록</Link>
                    <Link href={"/setting"}>설정</Link>
                    <div onClick={logoutHandler}>로그아웃</div>
                  </div>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={loginModalHandler}
                className="font-bold rounded-3xl px-4 py-1 border bg-black hover:bg-gray-900 text-white transition-colors"
              >
                로그인
              </button>
              {isModalOpen && <LoginModal setModalOpen={loginModalHandler} />}
            </>
          )}
        </div>
      </header>
    )
  );
};

export default NavBar;
