export interface UserDisplay {
  userId: number;
  username: string;
  peerId: string;
}

export interface Group {
  id: number;
  name: string;
  owner: string;
  members: UserDisplay[];
}
