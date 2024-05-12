import connect from "@/schemas";
import Post from "@/schemas/Post";
import Series from "@/schemas/Series";
import User from "@/schemas/User";

const updatePostsWithSeries = async () => {
  try {
    await connect();

    const users = await User.find({});

    for (const user of users) {
      // 유저 이름으로 된 시리즈 찾기
      let series = await Series.findOne({ name: `${user.username}의 시리즈` });

      // 시리즈가 없으면 새로 생성
      if (!series) {
        series = await Series.create({
          name: `${user.username}의 시리즈`,
          description: `${user.username}님의 시리즈입니다.`,
          user_id: user._id,
        });
      }

      // 해당 유저의 모든 게시글에 시리즈 ID 업데이트
      await Post.updateMany({ author: user._id }, { series: series._id });
    }

    console.log("모든 게시글의 시리즈 업데이트 완료");
  } catch (error) {
    console.error("에러 발생:", error);
  }
};

updatePostsWithSeries();
