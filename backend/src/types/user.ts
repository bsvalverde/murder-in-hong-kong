export default interface User {
  id: string;
  username: string;
}

export interface UserInput {
  username: string;
  password: string;
}

export interface UserStore {
  findByUsername: (username: string) => Promise<User | null>;
  create: (input: UserInput) => Promise<User>;
}
