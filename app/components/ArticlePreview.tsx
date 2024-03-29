import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
type ArticlePreview = {
  title: string;
  content: string;
  uploadTime: number;
  comments: number;
  userProfile?: string;
  userName: string;
  likes: number;
  thumbnailURL?: string;
};
const ArticlePreview = ({
  title,
  content,
  uploadTime,
  comments,
  userProfile,
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
        <div className="inline-flex items-center gap-1">
          <span className="rounded-full overflow-hidden">
            {userProfile ? <Image src={userProfile} alt="author" /> : <FaUserCircle />}
          </span>
          <span className="font-light">by {userName}</span>
        </div>
        <div className="inline-flex items-center gap-1">
          <FaHeart />
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
