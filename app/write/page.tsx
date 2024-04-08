"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const WritePage = () => {
  const router = useRouter();
  return (
    <section className="writeWrapper flex justify-between ">
      <form className="mdWriter lg:w-1/2 flex flex-col justify-between overflow-hidden">
        <div className="py-8 px-12 flex flex-col gap-5 flex-grow">
          <input
            className="text-3xl md:text-5xl"
            type="text"
            placeholder="제목을 입력하세요"
          ></input>
          <hr className="w-20 h-2  my-2 bg-black" />
          <input className="md:text-xl" type="text" placeholder="태그를 입력하세요" />
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
                stroke-width="0"
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
                stroke-width="0"
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
                stroke-width="0"
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
                stroke-width="0"
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
                stroke-width="0"
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
                stroke-width="0"
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
                stroke-width="0"
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
            className="italic text-lg contentArea"
            placeholder="당신의 이야기를 적어보세요..."
            id="contentBody"
          ></textarea>
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
            <button className="text-emerald-500 font-bold mr-2">임시저장</button>
            <button className="font-bold bg-emerald-500 hover:bg-emerald-400 text-white rounded-md">
              출간하기
            </button>
          </div>
        </div>
      </form>
      <div className="bg-gray-50 mdPreview hidden lg:w-1/2 lg:flex"></div>
    </section>
  );
};

export default WritePage;
