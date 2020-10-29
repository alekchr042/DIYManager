import { User } from "./User";

export class newProjectDTO {
  name: string;
  description: string;
  owner: User;
  file: any;
  id: string;
  ownerId: string;

  constructor() {}
}
