import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useRouter } from "next/navigation";

type ArticlePreview = {
  key: string;
  title: string;
  content: string;
  uploadTime: number;
  comments: number;
  userProfile?: string;
  userName: string;
  userId: string;
  likes: number;
  thumbnailURL?: string;
};
const ArticlePreview = ({
  key,
  title,
  content,
  uploadTime,
  comments,
  userProfile,
  userName,
  userId,
  likes,
  thumbnailURL,
}: ArticlePreview) => {
  const router = useRouter();
  let isInvalid = false;
  if (uploadTime === 0) {
    // 업로드 시간이 0일땐 미리보기 렌더링
    isInvalid = true;
  }

  let difference = calculateCreatedTime(uploadTime);

  const postClick = () => {
    let dashedTitle = title.split(" ").join("-");
    if (dashedTitle[dashedTitle.length - 1] === "?") dashedTitle = dashedTitle.slice(0, -1);
    if (dashedTitle === "?") dashedTitle = "tckkct";
    router.push(`@${userId.split("@")[0]}/${dashedTitle}`);
  };

  const preloadingRender = () => {
    return (
      <div className="article-preview w-full flex-nowrap shadow-xl rounded-sm flex flex-col justify-between hover:translate-y-0 md:hover:-translate-y-3  md:hover:shadow-2xl transition cursor-pointer animate-pulse">
        <div className="flex flex-col justify-between flex-grow overflow-hidden">
          <div className="bg-gray-300  h-1/2"></div>
          <div className={`${"h-1/2"} flex flex-col justify-between`}>
            <div className="p-5">
              <div className="h-4 font-bold text-transparent bg-gray-300 rounded-md">
                로딩되기 전의 글 제목
              </div>
              <p className="h-2 w-1/3 text-gray-300 bg-gray-300 rounded-md mt-1"></p>
              <p className="h-2 w-1/2 text-gray-300 bg-gray-300 rounded-md mt-1"></p>
              <p className="h-2 w-3/4 text-gray-300 bg-gray-300 rounded-md mt-1"></p>
            </div>
            <div className="p-5 text-transparent font-light text-sm">
              <span className="h-3/5 bg-gray-300 rounded-md">{difference}</span> •{" "}
              <span className="h-3/5 bg-gray-300 rounded-md">{comments}개의 댓글</span>
            </div>
          </div>
        </div>

        <div className="px-4 py-2 border-t flex justify-between">
          <div className="inline-flex items-center gap-1">
            <span className="rounded-full overflow-hidden bg-gray-300 w-5 h-5"></span>
            <span className="font-light text-transparent w-32 h-3  bg-gray-300 rounded-md"> </span>
          </div>
          <div className="inline-flex items-center gap-1"></div>
        </div>
      </div>
    );
  };

  return isInvalid ? (
    preloadingRender()
  ) : (
    <div className="article-preview w-full flex-nowrap shadow-xl rounded-sm flex flex-col justify-between hover:translate-y-0 md:hover:-translate-y-3  md:hover:shadow-2xl transition cursor-pointer">
      <div className="flex flex-col justify-between flex-grow overflow-hidden" onClick={postClick}>
        {thumbnailURL && (
          <Image
            className="object-cover"
            src={thumbnailURL}
            alt={title}
            width={1000}
            height={600}
            style={{ height: "50%" }}
          />
        )}
        <div className={`${thumbnailURL ? "h-1/2" : "h-full"} flex flex-col justify-between`}>
          <div className="p-5">
            <div className="font-bold">{title === "tckkct" ? "?" : title}</div>
            <p>{content.length > 50 ? `${content.slice(0, 50)}...` : content}</p>
          </div>
          <div className="p-5 text-gray-500 font-light text-sm">
            <span>{difference}</span> • <span>{comments}개의 댓글</span>
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
          <FaHeart size={0.75 + "em"} />
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

const calculateCreatedTime = (uploadTime: number) => {
  const now = new Date().getTime();
  const ago = Math.abs(uploadTime - now);
  let difference: number | null = Math.floor(ago / 1000);

  let postfix = "방금 전";
  if (difference >= 60) {
    difference /= 60;
    postfix = "분 전";
    if (difference >= 24) {
      difference /= 60;
      postfix = "시간 전";
      if (difference >= 24) {
        difference /= 30;
        postfix = "일 전";
        if (difference >= 30) {
          difference = null;
          postfix = `${new Date(uploadTime).getFullYear()}년 ${
            new Date(uploadTime).getMonth() + 1
          }월 ${new Date(uploadTime).getDate()}일`;
        }
      }
    }
  }
  if (postfix === "방금 전") {
    return postfix;
  } else if (difference && postfix) {
    return `${Math.floor(difference)}${postfix}`;
  } else {
    return postfix;
  }
};

export default ArticlePreview;
