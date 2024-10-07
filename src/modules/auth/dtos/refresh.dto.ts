import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsNotEmpty } from "class-validator";
import { RefreshRequest } from "../interface";

export class RefreshDto implements RefreshRequest {
    @ApiProperty({
        type: "string",
        required: true,
        example: "JWT bo'lishi kerak"
    })
    @IsJWT()
    @IsNotEmpty()
    refreshToken: string;
}