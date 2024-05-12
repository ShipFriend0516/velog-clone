import connect from "@/schemas";
import User from "@/schemas/User";
const jwt = require("jsonwebtoken");

export const verify = async (token: string) => {
  try {
    const result = jwt.verify(token, process.env.TOKEN_SECRET);
    if (result) {
      const user = await User.findOne({ email: result.email }, "_id");
      if (user) {
        return user;
      } else return false;
    }
  } catch (err) {
    return false;
  }
};
