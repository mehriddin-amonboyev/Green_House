// import { ApiProperty } from "@nestjs/swagger";
import { CreateCategoryRequest } from "../interfaces";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateCategoryDto implements CreateCategoryRequest {
    // @ApiProperty({
    //     type: 'string',
    //     example: "Qushlar",
    //     description: "Category nomi berilishi shart!",
    //     required: true,
    // })
    @IsString()
    @IsNotEmpty()
    name: string;
}