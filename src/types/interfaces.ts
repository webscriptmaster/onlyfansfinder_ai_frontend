export interface ISubscription {
  _id: string;
  periodMonth: number;
  description: string;
  price: number;
  totalPrice: number;
}

export interface IUser {
  _id?: string;
  role?: string;

  name?: string;
  email?: string;
  phone?: string;
  age?: number;
  address?: string;
  password?: string;
  status?: string;

  // Customer properties
  qa?: {
    question: string;
    answers: Array<string>;
  }[];

  // Creator properties
  characteristics?: Array<string>;
  subscriptionId?: string;

  isStatic?: boolean;
  avatar?: string;
  gender?: string;
  description?: string;
  cost?: number;

  items?: string[];
  includes?: string;

  likes?: number;
  pictures?: number;
  videos?: number;

  shares?: {
    twitter: boolean;
    instagram: boolean;
    tiktok: boolean;
  };
}
