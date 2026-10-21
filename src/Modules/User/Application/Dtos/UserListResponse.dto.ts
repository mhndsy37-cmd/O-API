import { UserResponseDto } from './UserResponse.dto.js';

class UserListResponseDto {
    data!: UserResponseDto[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
export{UserListResponseDto}