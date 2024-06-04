import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Content } from "../entity/Content";
import cloudinary from "../libs/cloudinary";
import {
  createContentSchema,
  updateContentSchema,
} from "../utils/validator/content";
import { validate } from "../utils/validator/validation";

export default new (class ContentServices {
  private readonly contentRepository: Repository<Content> =
    AppDataSource.getRepository(Content);

    async getContents(query: any) {
      return this.contentRepository.find({
        order: {
          id: 'DESC',
        },
        relations: ['created_by'],
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          created_by: {
            id: true,
            name: true,
            email: true,
          },
        },
        
        skip: query.skip,
        take: query.take
      });
    }
  

  async getContent(id: any) {
    return this.contentRepository.findOne({
      where: id,
      select: {
        id: true,
        name: true,
        description: true,
        image: true,

      },
    });
  }

  async create(data: any) {
    const isValid = validate(createContentSchema, data);
    cloudinary.config();
    const valid = {
      name: isValid.name,
      description: isValid.description,
      created_by: isValid.created_by,
      image: isValid.image
        ? (await cloudinary.upload(isValid.image)).secure_url
        : undefined,
    };
    const response = await this.contentRepository.save(valid);
    return {
      message: "Content created successfully",
      data: response,
    };
  }

  async updateContent(data: any, id: any) {
    const isValid = validate(updateContentSchema, data);
    cloudinary.config();

    let valid: any = {
      name: isValid.name,
      description: isValid.description,
      updated_at: isValid.updated_at,
    };

    if (isValid.image) {
      const upfile = await cloudinary.upload(isValid.image);
      valid.image = upfile.secure_url;
    }

    // Filter out undefined properties
    valid = Object.fromEntries(
      Object.entries(valid).filter(([_, v]) => v != null)
    );

    if (!valid.name) {
      throw new Error("Product name is required");
    }

    await this.contentRepository.update({ id: id.id }, valid);

    return {
      message: "Product updated successfully",
      data: valid,
    };
  }

  async deleteContent(id: any) {
    const checkProduct = await this.contentRepository.countBy(id);
    if (checkProduct === 0) throw new Error("Product not found");

    await this.contentRepository.delete(id);
    // console.log(response)
    return {
      message: "Product deleted successfully",
    };
  }
})();
