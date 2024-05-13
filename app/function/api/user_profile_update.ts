import connect from "@/schemas";
import User from "@/schemas/User";

const addDefaultProfileThumbnailUrl = async () => {
  try {
    await connect();

    const users = await User.find({ profileThumbnailUrl: { $exists: false } });

    for (const user of users) {
      await User.updateOne({ _id: user._id }, { $set: { profileThumbnailUrl: "" } });
    }

    console.log("프로필 썸네일 URL 업데이트 완료");
  } catch (error) {
    console.error("에러 발생:", error);
  }
};

addDefaultProfileThumbnailUrl();
