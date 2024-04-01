"use client";
import { IoSearchSharp } from "react-icons/io5";

const SearchPage = () => {
  return (
    <div>
      <div className="flex justify-center items-center w-3/4 h-12 p-4 border border-gray-300 mx-auto my-3">
        <IoSearchSharp size={"1.5em"} />
        <input
          className="outline-none w-full h-full p-5 bg-transparent"
          type="search"
          placeholder="검색어를 입력하세요"
        />
      </div>
      {<div>총 {}개의 포스트를 찾았습니다.</div>}
    </div>
  );
};

export default SearchPage;
