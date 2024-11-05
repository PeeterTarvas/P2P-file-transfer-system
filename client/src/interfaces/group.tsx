export interface UserDisplay {
  userId: number;
  username: string;
}

export interface Group {
  id: number;
  name: string;
  owner: string;
  members: UserDisplay[];
}
