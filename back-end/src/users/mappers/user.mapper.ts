import { User } from '../entities/user.entity';

export class UserMapper {
    static toDto(user: User) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
