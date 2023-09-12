import { camelizeIf } from "sequelize/lib/utils";
import { InputUserInterface, UserInterface } from "../interfaces";
import User from "../models/user";
import bcrypt = require("bcrypt");

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
    ): Promise<UserInterface> => {
      const { userName, email, password, confirmPassword } = args.input;

      if (password !== confirmPassword) {
        throw new Error("Password doesnot match");
      }

      try {
        const checkEmail = await User.findOne({ where: { email: email } });

        if (checkEmail) {
          throw new Error("Email already exists");
        }

        const hashedPassed = await bcrypt.hash(password, 12);

        const newUser: any = await User.create({
          email,
          userName,
          password: hashedPassed,
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
    ): Promise<UserInterface> => {
      const { email, password } = args.input;

      try {
        const userLogin = await User.findOne({ where: { email: email } });
        // console.log(userLogin);
        if (!userLogin) {
          throw new Error("This user is not registered yet");
        }

        const isValidPassword = await bcrypt.compare(
          password!.toString(),
          userLogin?.dataValues?.password
        );
        if (!isValidPassword) {
          throw new Error("Incorrect Email or Password");
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
