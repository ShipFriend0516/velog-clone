"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import PostUploadConfirm from "../components/PostUploadConfirm";

const WritePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // 시리즈
  const [series, setSeries] = useState("");

  const uploadPost = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "/api/posts",
        {
          title: title,
          content: content,
          thumbnailUrl: thumbnailUrl,
          tags: tags,
          series: series,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success === true) {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 업로드 버튼 클릭
  const uploadBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpenUpload(!isOpenUpload);
  };

  const close = () => {
    setIsOpenUpload(false);
  };

  const tagInputHandler = (e: React.KeyboardEvent) => {
    if ((e.code === "Comma" || e.code === "Enter") && tagInput) {
      e.preventDefault();
      if (tags.includes(tagInput.trim())) {
        // 중복
      } else if (!e.nativeEvent.isComposing) {
        const tag = tagInput.slice();

        setTags([...tags, tag.trim()]);
        setTagInput("");
      } else if (!e.nativeEvent.isComposing && e.code === "Comma") {
      }
    } else if (e.code === "Backspace" && !tagInput) {
      setTags([...tags.slice(0, -1)]);
    }
  };

  return (
    <section className="writeWrapper flex justify-between ">
      {isOpenUpload && (
        <PostUploadConfirm
          post={{ title: title, content: content, thumbnailUrl: thumbnailUrl, tags: tags }}
          close={close}
          uploadPost={uploadPost}
          setSeriesId={setSeries}
        />
      )}
      <form className="mdWriter lg:w-1/2 flex flex-col justify-between overflow-hidden">
        <div className="py-8 px-12 flex flex-col gap-5 flex-grow">
          <input
            name="title"
            className="text-3xl md:text-5xl"
            type="text"
            placeholder="제목을 입력하세요"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <hr className="w-20 h-2  my-2 bg-black" />
          <div>
            {tags.map((tag, index) => {
              return (
                <div
                  key={index}
                  className="cursor-pointer px-4 h-8 inline-flex items-center bg-gray-100 text-emerald-400 rounded-2xl mx-1 mr-2 my-1 animation-earthquakes"
                  onClick={() => {
                    setTags(tags.filter((tag, idx) => index !== idx));
                  }}
                >
                  {tag}
                </div>
              );
            })}
            <input
              onKeyDown={(e) => tagInputHandler(e)}
              className="md:text-xl"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="태그를 입력하세요"
            />
          </div>
          <div className="writeTools inline-flex items-center gap-4 flex-wrap">
            <button className="font-serif">H1</button>
            <button className="font-serif">H2</button>
            <button className="font-serif">H3</button>
            <button className="font-serif">H4</button>
            <span className="bg-gray-400 w-0.5 h-6"></span>
            <button>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path>
              </svg>
            </button>
            <button>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path>
              </svg>
            </button>
            <button>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"></path>
              </svg>
            </button>
            <span className="bg-gray-400 w-0.5 h-6"></span>
            <button>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path>
              </svg>
            </button>
            <button>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path>
              </svg>
            </button>
            <button>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path>
              </svg>
            </button>
            <button>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path>
              </svg>
            </button>
          </div>
          <textarea
            className=" italic text-lg contentArea h-full"
            placeholder="당신의 이야기를 적어보세요..."
            id="contentBody"
            name="content"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          <div className="CodeMirror">
            {/* 글쓰는게 보이는 곳 */}
            {content.split("\n").map((line, index) => (
              <pre key={index}>{line}</pre>
            ))}
          </div>
        </div>
        <div className="writeFooter h-20 p-4 bg-white inline-flex justify-between items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push("/");
            }}
            className="inline-flex items-center gap-2"
          >
            <FaArrowLeft />
            나가기
          </button>
          <div>
            <button className="text-emerald-500 font-bold mr-2 whiteBtn">임시저장</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                uploadBtnClick(e);
              }}
              className="font-bold bg-emerald-500 hover:bg-emerald-400 text-white rounded-md greenBtn"
            >
              출간하기
            </button>
          </div>
        </div>
      </form>
      <div className="bg-gray-50 mdPreview hidden lg:w-1/2 lg:flex p-20 flex-col gap-2">
        {/* 글쓰는게 보이는 곳 */}
        <h2 className="text-3xl">{title}</h2>
        {content.split("\n").map((line, index) => (
          <pre key={index}>{line}</pre>
        ))}
      </div>
    </section>
  );
};

export default WritePage;
