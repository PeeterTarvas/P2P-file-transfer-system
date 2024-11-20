export interface UserDisplay {
  userId: number;
  username: string;
  peerId: string;
  isOnline: boolean;
}

export interface Group {
  id: number;
  name: string;
  owner: string;
  members: UserDisplay[];
}
