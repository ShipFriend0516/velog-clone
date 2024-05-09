// 업로드 시간 계산 함수
const calculateCreatedTime = (uploadTime: number) => {
  const now = new Date().getTime();
  const ago = Math.abs(uploadTime - now);
  let difference = Math.floor(ago / 1000 / 60);
  let postfix = "분 전";
  if (difference >= 60) {
    difference /= 60;
    postfix = "시간 전";
    if (difference >= 24) {
      difference /= 24;
      postfix = "일 전";
      if (difference >= 30) {
        difference /= 30;
        postfix = "달 전";
        if (difference >= 12) {
          difference /= 12;
          postfix = "년 전";
        }
      }
    }
  }

  return `${Math.floor(difference)}${postfix}`;
};

export default calculateCreatedTime;
