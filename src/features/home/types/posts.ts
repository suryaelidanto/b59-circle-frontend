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

export type Post = {
  id: string;
  user: UserPost;
  content: string;
  likesCount: number;
  repliesCount: number;
  replies?: Reply[];
  isLiked: boolean;
  createdAt: Date;
};
