export type providerProfile = {
  businessName: string;
  description: string;
  address: string;
  phone: string;
};

export type meal = {
  id: string;
  image: string;
  name: string;
  isAvailable: boolean;
  price: number;
  description: string;
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
  meals: meal[];
}
