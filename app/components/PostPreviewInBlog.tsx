import Image from "next/image";
import { calculateCreatedTime } from "../[userId]/[title]/page";

interface PostPreview {
  title: string;
  content: string;
  uploadTime: number;
  comments: number;
  likes: number;
  tags?: string[];
  thumbnailUrl?: string;
}

const PostPreviewInBlog = ({
  title,
  content,
  uploadTime,
  comments,
  tags,
  likes,
  thumbnailUrl,
}: PostPreview) => {
  let isInvalid = false;
  if (uploadTime === 0) {
    isInvalid = true;
  }

  const preloadingRender = () => {
    return (
      <div className="animate-pulse pt-4 pb-8 w-full flex flex-col gap-4 border-b">
        <div className=" cursor-pointer w-full aspect-video h-1/2 bg-gray-300 flex justify-center items-center">
          {""}
        </div>
        <h2 className="h-4 font-bold text-transparent bg-gray-300 rounded-md">
          로딩되기 전의 글 제목
        </h2>
        <div>
          <p className="h-2 w-1/3 text-gray-300 bg-gray-300 rounded-md mt-1"></p>
          <p className="h-2 w-1/2 text-gray-300 bg-gray-300 rounded-md mt-1"></p>
        </div>{" "}
        <div className="flex gap-1 ">
          <div className="rounded-xl w-10 bg-gray-300 text-transparent">{"태그"}</div>
          <div className="rounded-xl bg-gray-300 text-transparent">{"태그"}</div>
          <div className="rounded-xl w-12 bg-gray-300 text-transparent">{"태그"}</div>
        </div>
        <div className="text-transparent text-sm text-gray-500">
          <span className="h-3/5 bg-gray-300 rounded-md">{"2024년 4월 23일"}</span> •{" "}
          <span className="h-3/5 bg-gray-300 rounded-md">{"1개의 댓글"}</span> •{" "}
          <span className="h-3/5 bg-gray-300 rounded-md">{"좋아요 0"}</span>
        </div>
      </div>
    );
  };

  return isInvalid ? (
    preloadingRender()
  ) : (
    <div className="pt-4 pb-8 w-full flex flex-col gap-4 border-b">
      <div className=" cursor-pointer w-full aspect-video h-1/2 bg-gray-300 flex justify-center items-center overflow-hidden">
        {thumbnailUrl && <Image src={thumbnailUrl} alt="thumbnail" width={1000} height={600} />}
      </div>
      <h2 className="cursor-pointer font-bold text-2xl">{title}</h2>
      <p className="">{content}</p>
      <div className="tagsWrapper">
        {tags?.map((tag) => (
          <div key={tag}>{tag}</div>
        ))}
      </div>
      <div className="text-sm text-gray-500">
        <span>{calculateCreatedTime(new Date(uploadTime).getTime())}</span> •{" "}
        <span>{comments}개의 댓글</span> • <span>좋아요 {likes}</span>
      </div>
    </div>
  );
};

export default PostPreviewInBlog;
