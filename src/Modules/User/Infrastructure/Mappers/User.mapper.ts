import { UserTemp } from "../../Domain/Entities/User.entity.js";
import { UserResponseDto } from "../../Application/Dtos/UserResponse.dto.js";
import { UserDocument } from "../Schemas/User.schema.js";
class UserResponseMapper {
    static toResponse(user: UserTemp): UserResponseDto {
        const dto = new UserResponseDto()
        dto.id = user.getId().toString()
        dto.username = user.getUsername().getValue()
        dto.fullName = user.getFullname().getValue()
        dto.email = user.getEmail().getValue()
        dto.phoneNumber = user.getPhonenumber().getValue()
        dto.role = user.getRole().getValue()
        dto.status = user.getStatus().getValue()
        dto.createdAt = user.getCreatedAt()
        dto.updatedAt = user.getUpdatedAt()
        return dto
    }
    static toResponseList(users: UserTemp[]): UserResponseDto[] {
        return users.map((user) => UserResponseMapper.toResponse(user));
    }
}

class UserInfrastructureMapper {
    static toDomain(doc: UserDocument): UserTemp {
        return UserTemp.restore({
            id: doc._id.toString(),
            username: doc.username,
            fullname: doc.fullName,
            email: doc.email,
            password: doc.password,
            phoneNumber: doc.phoneNumber,
            role: doc.role,
            status: doc.status,
            createdAt: doc.createdAt || new Date(),
            updatedAt: doc.updatedAt
        });
    }
    static toPersistence(user: UserTemp): any {
        return {
            _id: user.getId().getValue(), 
            username: user.getUsername().getValue(),
            fullName: user.getFullname().getValue(),
            email: user.getEmail().getValue(),
            password: user.getPassword().getValue(), 
            phoneNumber: user.getPhonenumber().getValue(),
            role: user.getRole().getValue(),
            status: user.getStatus().getValue(),
            createdAt: user.getCreatedAt(),
            updatedAt: user.getUpdatedAt(),
        };
    }
}
export { UserInfrastructureMapper, UserResponseMapper }