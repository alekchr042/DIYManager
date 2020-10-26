import { User } from "./User";

export class Project {
  id: string;
  name: string;
  description: string;
  owner: User;
  thumbnail: string;
  lastModified: Date;
  startDate: Date;
  finishDate: Date;
}
