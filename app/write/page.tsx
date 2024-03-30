"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const WritePage = () => {
  const router = useRouter();
  return (
    <section className="writeWrapper flex justify-between ">
      <form className="mdWriter flex flex-col justify-between overflow-hidden">
        <div className="py-8 px-12 flex flex-col gap-5 flex-grow">
          <input className="text-5xl" type="text" placeholder="제목을 입력하세요"></input>
          <hr className="w-20 h-2  my-2 bg-black" />
          <input className="text-xl" type="text" placeholder="태그를 입력하세요" />
          <div className="writeTools inline-flex items-center gap-4 flex-wrap">
            <button>H1</button>
            <button>H2</button>
            <button>H3</button>
            <button>H4</button>
            <span> | </span>
            <button>B</button>
            <button>I</button>
            <button>T</button>
            <span> | </span>
            <button>인용</button>
            <button>링크</button>
            <button>사진</button>
            <button>코드</button>
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
            <button className="text-emerald-500 font-bold">임시저장</button>
            <button className="font-bold bg-emerald-500 text-white rounded-md">출간하기</button>
          </div>
        </div>
      </form>
      <div className="mdPreview hidden lg:block"></div>
    </section>
  );
};

export default WritePage;
