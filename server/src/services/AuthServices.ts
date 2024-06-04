import { validate } from "./../utils/validator/validation";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { loginSchema, registerSchema } from "../utils/validator/auth";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Request } from "express";

export default new (class AuthServices {
  private readonly AuthRepository: Repository<User> =
    AppDataSource.getRepository(User);
  async register(reqBody: any): Promise<any> {
    try {
      const { value, error } = registerSchema.validate(reqBody);
      if (error) {
        throw new Error("Validation failed");
      }
      const isEmailRegistered = await this.AuthRepository.count({
        where: {
          email: reqBody.email,
        },
      });
      if (isEmailRegistered > 0) {
        throw new Error("Email is already registered");
      }

      //generate password
      const password = await bcrypt.hash(reqBody.password, 10);

      const user = this.AuthRepository.create({
        name: value.name,
        email: value.email,
        password: password,
      });

      const data = await this.AuthRepository.save(user);
      //   console.log(data);
      return {
        message: "Register successfull",
        user: user,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(reqBody: Request) {
    const isValid = validate(loginSchema, reqBody);
    const checkUser = await this.AuthRepository.findOne({
      where: { email: isValid.email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!checkUser) throw new Error("Username is not registered yet!");

    const isEqual = await bcrypt.compare(isValid.password, checkUser.password);
    if (!isEqual) throw new Error("Email or Password is incorrect!");
    const token = jwt.sign(
      { id: checkUser.id, name: checkUser.name },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    return {
      message: "Login successfull",
      user: {
        id: checkUser.id,
        name: checkUser.name,
        email: checkUser.email,
      },
      token: token,
    };
  }
})();
