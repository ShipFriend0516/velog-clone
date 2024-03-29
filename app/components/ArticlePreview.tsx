import Image from "next/image";
type ArticlePreview = {
  title: string;
  content: string;
  uploadTime: number;
  comments: number;
  userName: string;
  likes: number;
  thumbnailURL?: string;
};
const ArticlePreview = ({
  title,
  content,
  uploadTime,
  comments,
  userName,
  likes,
  thumbnailURL,
}: ArticlePreview) => {
  return (
    <div className="w-full h-96 shadow-xl rounded-sm flex flex-col justify-between">
      <div className="flex flex-col justify-between flex-grow overflow-hidden">
        {thumbnailURL && (
          <Image
            className="object-cover"
            src={thumbnailURL}
            alt={title}
            width={600}
            height={600}
            style={{ height: "50%" }}
          />
        )}
        <div className="h-1/2">
          <div className="p-5">
            <div className="font-bold">{title}</div>
            <p>{content}</p>
          </div>
          <div className="p-5 text-gray-500 font-light text-sm">
            <span>{uploadTime}</span>•<span>{comments}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-2 border-t flex justify-between">
        <span>
          <span className="rounded-full">프로필</span>
          <span className="font-light">by {userName}</span>
        </span>
        <span>
          <span>heart</span>
          <span>{likes}</span>
        </span>
      </div>
    </div>
  );
};

export default ArticlePreview;
