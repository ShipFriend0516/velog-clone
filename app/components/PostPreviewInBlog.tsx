const PostPreviewInBlog = () => {
  return (
    <div className="pt-4 pb-8 w-full flex flex-col gap-4 border-b">
      <div className=" cursor-pointer w-full aspect-video h-1/2 bg-gray-300 flex justify-center items-center">
        {"썸네일"}
      </div>
      <h2 className="cursor-pointer font-bold text-2xl">{"글 제목 미리보기입니다."}</h2>
      <p className="">{"글 컨텐츠 미리보기입니다."}</p>
      <div className="tagsWrapper">
        <div>{"태그"}</div>
      </div>
      <div className="text-sm text-gray-500">
        <span>{"2024년 4월 23일"}</span> • <span>{"1개의 댓글"}</span> • <span>{"좋아요 0"}</span>
      </div>
    </div>
  );
};

export default PostPreviewInBlog;
