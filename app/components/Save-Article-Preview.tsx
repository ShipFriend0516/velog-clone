type IncompleteArticle = {
  id: number;
  title: string;
  content: string;
  saveTime: number;
};

//1711694241133

const SaveArticlePreview = ({ id, title, content, saveTime }: IncompleteArticle) => {
  const saveDate = new Date();
  saveDate.setTime(saveTime);
  const now = new Date().getTime();
  let difference: number | string = (now - saveDate.getTime()) / 1000;
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
          difference = "";
          postfix = `${saveDate.getFullYear()}년 ${
            saveDate.getMonth() + 1
          }월 ${saveDate.getDate()}일`;
        }
      }
    }
  }
  if (typeof difference === "number") difference = Math.floor(difference);

  return (
    <article className="save-article-preview">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-5 mb-4">{content}</p>
      <span className="flex justify-between">
        <span className="text-sm text-gray-500">
          {`${postfix !== "방금 전" ? `${difference}${postfix}` : `${postfix}`}`}
        </span>
        <button className="text-sm text-black underline">삭제</button>
      </span>
    </article>
  );
};

export default SaveArticlePreview;
