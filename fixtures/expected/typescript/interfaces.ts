export interface Profile {
  displayName: string;
}

export interface Root {
  id: number;
  createdAt: string;
  profile: Profile;
  tags: string[];
}
