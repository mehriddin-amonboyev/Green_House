import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryRequest, UpdateCategoryRequest } from "./interfaces";
import { Category } from "./models";

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category) private categoryModel: typeof Category) { }

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryModel.findAll();
    }

    async createCategory(payload: CreateCategoryRequest): Promise<void> {
        await this.categoryModel.create({
            name: payload.name
        })
    }

    async updateCategory(payload: UpdateCategoryRequest): Promise<void> {
        await this.categoryModel.update(
            {
                name: payload.name
            },
            {
                where: {
                    id: payload.id
                }
            })
    }

    async deleteCategory(id: number): Promise<void> {
        await this.categoryModel.destroy({
            where: {
                id
            }
        })
    }
}