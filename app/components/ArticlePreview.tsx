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
    <div className="w-full h-80 shadow-xl rounded-sm flex flex-col justify-between">
      <div className="flex flex-col justify-between flex-grow">
        {thumbnailURL && (
          <div className="relative">
            <Image className="object-fill" src={thumbnailURL} alt={title} layout="fill" />
          </div>
        )}
        <div>
          <div className="p-5">
            <div className="font-bold">{title}</div>
            <p>{content}</p>
          </div>
          <div className="p-5">
            <span>{uploadTime}</span>•<span>{comments}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-2 border-t">
        <span className="rounded-full">프로필</span>
        <span className="font-light">by {userName}</span>
        <span>heart</span>
        <span>{likes}</span>
      </div>
    </div>
  );
};

export default ArticlePreview;
