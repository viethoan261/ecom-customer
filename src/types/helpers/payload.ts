export interface LoginPayload {
  userName: string;
  password: string;
}

export interface SignUpPayload {
  userName: string;
  password: string;
  fullName: string;
  role: string;
  email: string;
  phone: string;
}
export interface UpdateProfilePayload {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}

export interface addCartPayload {
  productId: number;
  color: string;
  size: string;
  quantity: number;
}

export interface updateCartPayload {
  productId: number;
  color: string;
  size: string;
  quantity: number;
  imagePath: string | null;
}

export interface AddReviewPayload {
  score: number;
  review: string;
}
