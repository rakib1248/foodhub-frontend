
export type providerProfile = {
  businessName: string;
  description: string;
  address: string;
  phone: string;
};

export type meal = {
  id: string;
  image?: string | null; // ইমেজ না-ও থাকতে পারে
  name: string;
  isAvailable: boolean;
  price: number;
  description: string;
  categoryId: string;
  reviews: {
    rating: number;
  }[];
  category?: {
    // '?' যোগ করা হয়েছে কারণ এটি undefined হতে পারে
    name: string;
  };
  provider?: {
    // '?' যোগ করা হয়েছে
    businessName: string;
  };
};

export interface ProviderData {
  id: string;
  businessName: string;
  description: string;
  address: string;
  phone: string;
  user: {
    name: string;
    email: string;
    image: string | null;
    status: string;
  };
  meals: Partial<meal[]>;
}
