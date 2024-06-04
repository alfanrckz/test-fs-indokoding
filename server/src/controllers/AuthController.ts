import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";

export default new (class AuthController {
  async register(req: Request, res: Response) {
    try {
      const response = await AuthServices.register(req.body);
      console.log(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response){
    try {
        const response = await AuthServices.login(req.body)
        // console.log(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
  }


})();
