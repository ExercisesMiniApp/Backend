import { UserModel } from '../user.model';

export class CreateUserDto extends UserModel {
  _id: number;
  role: 0 | 1;
}
