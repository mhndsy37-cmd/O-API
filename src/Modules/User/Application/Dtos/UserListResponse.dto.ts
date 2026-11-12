import { ApiProperty } from '@nestjs/swagger'; 
import { UserResponseDto } from './UserResponse.dto.js';

class UserListResponseDto {
    // prop
    @ApiProperty({ 
        description: 'List of users', 
        type: () => [UserResponseDto] 
    })
    data!: UserResponseDto[];

    // prop
    @ApiProperty({ description: 'Total number of users', example: 150 })
    total!: number;

    // prop
    @ApiProperty({ description: 'Current page number', example: 1 })
    page!: number;

    // prop
    @ApiProperty({ description: 'Number of items per page', example: 10 })
    limit!: number;

    // prop
    @ApiProperty({ description: 'Total number of pages', example: 15 })
    totalPages!: number;
}
export { UserListResponseDto }