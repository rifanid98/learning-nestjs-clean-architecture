export interface UserEntityInterface {
  id?: string;
  email?: string;
  password?: string;
}

export enum UserStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export class User implements UserEntityInterface {
  id?: string;
  email?: string;
  password?: string;
  token?: string;
}
