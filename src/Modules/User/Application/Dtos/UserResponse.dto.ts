import { ApiProperty } from '@nestjs/swagger'; 
import { UserRole } from "../../Domain/Enums/Role.enum.js";
import { UserStatus } from "../../Domain/Enums/Status.enum.js";

class UserResponseDto {
    // prop
    @ApiProperty({ description: 'User ID', example: '60d5ecb8b392d7001f3f8a12' })
    id!: string;

    // prop
    @ApiProperty({ 
        description: 'Username', 
        example: 'ali_ahmadi', 
        nullable: true 
    })
    username!: string | null;

    // prop
    @ApiProperty({ description: 'Full name', example: 'Ali Ahmadi' })
    fullName!: string;

    // prop
    @ApiProperty({ 
        description: 'Email address', 
        example: 'ali@test.com', 
        nullable: true 
    })
    email!: string | null;

    // prop
    @ApiProperty({ description: 'Phone number', example: '09123456789' })
    phoneNumber!: string;

    // prop
    @ApiProperty({ 
        description: 'User role', 
        enum: UserRole, 
        example: UserRole.USER 
    })
    role!: UserRole;

    // prop
    @ApiProperty({ 
        description: 'User status', 
        enum: UserStatus, 
        example: UserStatus.ACTIVE 
    })
    status!: UserStatus;

    // prop
    @ApiProperty({ description: 'Created at', example: '2026-11-11T20:37:46.578Z' })
    createdAt!: Date;

    // prop
    @ApiProperty({ 
        description: 'Updated at', 
        example: '2026-11-12T10:00:00.000Z', 
        required: false, 
        nullable: true 
    })
    updatedAt?: Date;
}
export { UserResponseDto }