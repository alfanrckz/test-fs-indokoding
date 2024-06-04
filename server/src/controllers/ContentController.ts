import { Request, Response } from "express";
import ProductServices from "../services/ContentServices";

export default new (class ContentController {

  async getAll(req: Request, res: Response){
    try {
      const response = await ProductServices.getContents(req.query);
      console.log(req.query);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async get(req: Request, res: Response){
    try {
      const response = await ProductServices.getContent(req.params);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.session;
    //   console.log("this is loginSession", loginSession.id);
      const data = {
        name: req.body.name,
        image: req.file ? req.file.filename : req.body.image,
        description: req.body.description,
        created_by: loginSession.id,
      };
      // console.log("this is data",data)
      const response = await ProductServices.create(data);
      console.log("this is response", response);
      res.status(200).json({
        message: "Product post succesfully",
        data: response,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
        let data: any = {
            name: req.body.name,
            description: req.body.description
        };
        if (req.file) {
            data.image = req.file.filename;
        }
        // console.log("Data untuk diupdate:", data);

        const response = await ProductServices.updateContent(data, req.params);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async delete(req, res){
  try {
    const response = await ProductServices.deleteContent(req.params)
res.status(200).json(response)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
})();
