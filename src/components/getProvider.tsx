import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Utensils, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ProviderData } from "@/types";



export default function ProviderList({
  providers,
}: {
  providers: ProviderData[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {providers.map((provider) => (
        <Card
          key={provider.id}
          className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4 bg-muted/30 pb-4">
            <Avatar className="h-14 w-14 border-2 border-primary/20">
              <AvatarImage src={provider.user.image || ""} />
              <AvatarFallback>
                {provider.businessName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="text-lg font-bold">
                {provider.businessName}
              </CardTitle>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Mail className="size-3" /> {provider.user.email}
              </p>
            </div>
          </CardHeader>

          <CardContent className="pt-4 space-y-3">
            <div className="flex justify-between items-start">
              <Badge
                variant={
                  provider.user.status === "ACTIVE" ? "default" : "secondary"
                }>
                {provider.user.status}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-primary font-medium">
                <Utensils className="size-3" /> {provider.meals.length} Meals
                Available
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {provider.description}
            </p>

            <div className="space-y-2 pt-2 border-t text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-4 text-primary" />
                <span>{provider.address}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="size-4 text-primary" />
                <span>{provider.phone}</span>
              </div>
            </div>

            <Button asChild>
              <Link href={`/providers/${provider.id}`}>
                View Menu & Details
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
