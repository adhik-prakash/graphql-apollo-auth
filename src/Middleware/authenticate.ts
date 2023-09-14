import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
export const authenticate = async (bearerToken: string) => {
  try {
    const token = bearerToken.split("Bearer ")[1];

    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY!);

        //console.log(user);
        if (user) {
          return {
            user,
            token,
          };
        }
        throw new GraphQLError("User not found", {
          extensions: {
            code: "UNAUTHORIZED",
            http: { status: 402 },
          },
        });
      } catch (error) {
        throw new Error("Invalid or Expired token");
      }
    } else {
      throw new Error("Authorization token must be 'Bearer token'");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
