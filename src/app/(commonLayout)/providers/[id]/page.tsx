import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Utensils,

  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { providerService } from "@/service/provider.service";
import { meal } from "@/types";
import ProviderMeal from "@/components/ProviderMeal";

export default async function ProviderSinglePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;
  const { data } = await providerService.getSingleProvider(id);

  const provider = data ? data.data : [];
  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      {/* Header / Banner Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/providers"
            className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ChevronLeft className="size-4" /> Back to Providers
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="h-32 w-32 border-4 border-white shadow-xl rounded-2xl">
              <AvatarImage src={provider.user.image || ""} />
              <AvatarFallback className="text-4xl bg-primary text-white rounded-2xl">
                {provider.businessName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-extrabold tracking-tight">
                  {provider.businessName}
                </h1>
                <Badge className="bg-green-500 hover:bg-green-600">
                  <CheckCircle2 className="size-3 mr-1" />{" "}
                  {provider.user.status}
                </Badge>
              </div>

              <p className="text-lg text-muted-foreground max-w-2xl">
                {provider.description}
              </p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-primary" />
                  <span className="font-medium">{provider.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-5 text-primary" />
                  <span className="font-medium">{provider.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-5 text-primary" />
                  <span className="font-medium">{provider.user.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meals / Menu Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Utensils className="size-6 text-primary" />
          <h2 className="text-2xl font-bold italic underline decoration-primary/30">
            Available Meals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {provider.meals?.map((meal: meal) => (
            // <Card
            //   key={meal.id}
            //   className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
            //   <div className="aspect-video bg-muted relative overflow-hidden">
            //     {meal.image ? (
            //       <img
            //         src={meal.image}
            //         alt={meal.name}
            //         className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            //       />
            //     ) : (
            //       <div className="flex items-center justify-center h-full bg-primary/5">
            //         <Utensils className="size-12 text-primary/20" />
            //       </div>
            //     )}
            //     <div className="absolute top-3 right-3">
            //       <Badge variant={meal.isAvailable ? "default" : "destructive"}>
            //         {meal.isAvailable ? "Available" : "Sold Out"}
            //       </Badge>
            //     </div>
            //   </div>

            //   <CardContent className="p-6 space-y-4">
            //     <div className="flex justify-between items-start">
            //       <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
            //         {meal.name}
            //       </h3>
            //       <span className="text-2xl font-black text-primary">
            //         ${meal.price}
            //       </span>
            //     </div>
            //     <p className="text-sm text-muted-foreground leading-relaxed">
            //       {meal.description}
            //     </p>
            //     <Button

            //       className="w-full font-bold group-hover:translate-y-[-2px] transition-transform">
            //       Add to Cart
            //     </Button>
            //   </CardContent>
            // </Card>
            <ProviderMeal key={meal.id} meal={meal} />
          ))}
        </div>
      </div>
    </div>
  );
}
