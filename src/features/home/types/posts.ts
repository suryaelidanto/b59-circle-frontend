export type UserPost = {
  fullName: string;
  username: string;
  avatarUrl: string;
};

export type Reply = {
  id: string;
  user: UserPost;
  content: string;
  likesCount: number;
  createdAt: Date;
};

export type Thread = {
  id: string;
  images: string;
  user: UserPost;
  content: string;
  likesCount: number;
  repliesCount: number;
  replies?: Reply[];
  isLiked: boolean;
  createdAt: Date;
};
