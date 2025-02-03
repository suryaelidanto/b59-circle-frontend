import { UserEntity } from '@/entities/user.entities';

export type RegisterDTO = Pick<UserEntity, 'fullName' | 'email' | 'password'>;

export type LoginDTO = Pick<UserEntity, 'email' | 'password'>;
