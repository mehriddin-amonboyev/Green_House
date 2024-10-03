import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
  } from '@nestjs/common';
  import { CategoryService } from './category.service';
  import { Category } from './models';
  import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
  import { ApiOperation, ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Category')
  @Controller('categories')
  export class CategoryController {
    #_service: CategoryService;
  
    constructor(service: CategoryService) {
      this.#_service = service;
    }
  
    @ApiOperation({ description: 'Barcha categoriesni olish', summary: "Barchasini olish" })
    @Get()
    async getCategories(): Promise<Category[]> {
      return await this.#_service.getAllCategories();
    }
  
    @Post()
    async createCategory(
      @Body() createCategoryPayload: CreateCategoryDto,
    ): Promise<void> {
      await this.#_service.createCategory(createCategoryPayload);
    }
  
    @Put(':id')
    async updateCategory(
      @Body() updateCategoryPayload: UpdateCategoryDto,
      @Param('id', ParseIntPipe) categoryId: number,
    ): Promise<void> {
      await this.#_service.updateCategory({
        ...updateCategoryPayload,
        id: categoryId,
      });
    }
  
    @Delete(':id')
    async deleteCategory(
      @Param('id', ParseIntPipe) categoryId: number,
    ): Promise<void> {
      await this.#_service.deleteCategory(categoryId);
    }
  }