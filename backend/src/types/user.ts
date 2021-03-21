export default interface User {
  id: string;
  username: string;
}

export interface UserInput {
  username: string;
  password: string;
}

export interface UserStore {
  create: (input: UserInput) => Promise<User | null>;
}
