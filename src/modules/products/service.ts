import { ProductRepository } from "./repository";
import { CreateProductInput, UpdateProductInput } from "./validation";

export class ProductService {
  static async createProduct(data: CreateProductInput) {
    return ProductRepository.create(data);
  }

  static async getProducts(filters?: { categoryId?: string; isActive?: boolean }) {
    return ProductRepository.findMany(filters);
  }

  static async getProductById(id: string) {
    const product = await ProductRepository.findById(id);
    
    if (!product) {
      throw new Error("Product not found");
    }
    
    return product;
  }

  static async updateProduct(id: string, data: UpdateProductInput) {
    return ProductRepository.update(id, data);
  }

  static async deleteProduct(id: string) {
    return ProductRepository.delete(id);
  }
}
