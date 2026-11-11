import { UserTemp } from "../../Domain/Entities/User.entity.js";
import { UserResponseDto } from "../../Application/Dtos/UserResponse.dto.js";
import { UserDocument } from "../Schemas/User.schema.js";

// application
class UserResponseMapper {
    // response
    static toResponse(user: UserTemp): UserResponseDto {
        const dto = new UserResponseDto();
        dto.id = user.getId().toString();
        dto.fullName = user.getFullname().getValue();
        dto.username = user.getUsername()?.getValue() ?? null;
        dto.email = user.getEmail()?.getValue() ?? null;
        dto.phoneNumber = user.getPhonenumber().getValue();
        dto.role = user.getRole().getValue();
        dto.status = user.getStatus().getValue();
        dto.createdAt = user.getCreatedAt();
        dto.updatedAt = user.getUpdatedAt();
        return dto;
    }

    // list
    static toResponseList(users: UserTemp[]): UserResponseDto[] {
        return users.map((user) => UserResponseMapper.toResponse(user));
    }
}

// infrastructure
class UserInfrastructureMapper {
    // domain
    static toDomain(doc: UserDocument): UserTemp {
        return UserTemp.restore({
            id: doc._id.toString(),
            fullname: doc.fullName,
            username: doc.username ?? null,
            email: doc.email ?? null,
            password: doc.password ?? null,
            phoneNumber: doc.phoneNumber,
            role: doc.role,
            status: doc.status,
            createdAt: doc.createdAt || new Date(),
            updatedAt: doc.updatedAt
        });
    }

    // persistence
    static toPersistence(user: UserTemp): any {
        return {
            _id: user.getId().getValue(),
            fullName: user.getFullname().getValue(),
            username: user.getUsername()?.getValue() ?? null,
            email: user.getEmail()?.getValue() ?? null,
            password: user.getPassword()?.getValue() ?? null,
            phoneNumber: user.getPhonenumber().getValue(),
            role: user.getRole().getValue(),
            status: user.getStatus().getValue(),
            createdAt: user.getCreatedAt(),
            updatedAt: user.getUpdatedAt(),
        };
    }
}

export { UserInfrastructureMapper, UserResponseMapper }