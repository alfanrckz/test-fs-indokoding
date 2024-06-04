import { v2 as cloudinary } from "cloudinary";
import { extractPublicId } from "cloudinary-build-url";
import * as fs from "fs";

export default new (class CloudinaryConfig {
  config() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      secure: true,
    });
  }

  async upload(image: string) {
    try {
      const res = await cloudinary.uploader.upload(`src/uploads/${image}`, {
        folder: "knowledge-test",
      });
      fs.unlinkSync(`src/uploads/${image}`);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async delete(image: string) {
    const publicId = extractPublicId(image);
    cloudinary.api.delete_all_resources([publicId]);
  }
  async deletes(image: string) {
    const files = [];
    let i = 0;
    const len = image.length;
    for (i; i < len; i++) {
      const publicId = extractPublicId(image[i]);
      files.push(publicId);
    }
    cloudinary.api.delete_resources(files);
  }
})();
