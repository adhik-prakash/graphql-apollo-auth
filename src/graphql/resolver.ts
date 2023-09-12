import { InputUserInterface, OutputUserInterface } from "../interfaces";
import User from "../models/user";

export const resolvers = {
  Query: {
    users: async () => {
      return await User.findAll();
    },
  },
  Mutation: {
    register: async (
      parents: any,
      args: { input: InputUserInterface }
    ): Promise<OutputUserInterface> => {
      const { userName, email, password, confirmPassword } = args.input;

      if (password !== confirmPassword) {
        throw new Error("Password doesnot match");
      }

      try {
        const checkEmail = await User.findOne({ where: { email: email } });

        if (checkEmail) {
          throw new Error("Email already exists");
        }

        const newUser: any = await User.create({
          email,
          userName,
          password,
        });
        return {
          id: newUser.id,
          userName: newUser.userName,
          email: newUser.email,
          message: "You have been registered Successuflly",
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    login: async (
      parent: any,
      args: { input: InputUserInterface }
    ): Promise<OutputUserInterface> => {
      const { email, password } = args.input;

      try {
        const userLogin = await User.findOne({ where: { email: email } });
        // console.log(userLogin);
        if (!userLogin) {
          throw new Error("This user is not registered yet");
        }

        if (password !== userLogin.dataValues.password) {
          throw new Error("The password donot match");
        }

        return {
          ...userLogin.dataValues,
          message: "Login successfull",
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
