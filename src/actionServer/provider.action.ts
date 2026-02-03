"use server";

import { providerService } from "@/service/provider.service";
import { providerProfile } from "@/types";

export const providerprofileCreate = async (data: providerProfile) => {
  try {
    return await providerService.ProviderProfile({
      businessName: data.businessName,
      description: data.description,
      address: data.address,
      phone: data.phone,
    });
  } catch (error) {
    throw new Error("SomeTing Is wrong...");
  }
};
