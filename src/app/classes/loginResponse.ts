import { User } from 'src/app/classes/users';
export class LoginResponse{
    jwt: string;
    user: User;
}