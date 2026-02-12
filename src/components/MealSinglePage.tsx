"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  MapPin,
  Phone,
  Store,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  customerId: string;
}

interface Provider {
  id: string;
  businessName: string;
  description: string;
  address: string;
  phone: string;
}

interface Category {
  id: string;
  name: string;
  image: string | null;
}

interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  isAvailable: boolean;
  provider: Provider;
  category: Category;
  reviews: Review[];
}

export function MealDetailsClient({ meal }: { meal: Meal }) {
  const [quantity, setQuantity] = useState(1);

  // Calculate average rating
  const avgRating =
    meal.reviews.length > 0
      ? (
          meal.reviews.reduce((sum, r) => sum + r.rating, 0) /
          meal.reviews.length
        ).toFixed(1)
      : "0";

  const handleAddToCart = () => {
    toast.success(`Added ${quantity}x ${meal.name} to cart!`);
    // আপনার cart logic এখানে
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
          {meal.image ? (
            <Image
              src={meal.image}
              alt={meal.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No Image Available
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="space-y-6">
          {/* Title & Category */}
          <div>
            <Badge variant="secondary" className="mb-2">
              {meal.category.name}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight">{meal.name}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(Number(avgRating))
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {avgRating} ({meal.reviews.length} reviews)
            </span>
          </div>

          {/* Price & Availability */}
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold">৳{meal.price}</p>
            <Badge variant={meal.isAvailable ? "default" : "destructive"}>
              {meal.isAvailable ? "Available" : "Out of Stock"}
            </Badge>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {meal.description}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quantity</label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl font-semibold w-12 text-center">
                {quantity}
              </span>
              <Button variant="outline" size="icon" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            size="lg"
            className="w-full"
            onClick={handleAddToCart}
            disabled={!meal.isAvailable}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart - ৳{meal.price * quantity}
          </Button>

          <Separator />

          {/* Provider Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Provider Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold text-lg">
                  {meal.provider.businessName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {meal.provider.description}
                </p>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span>{meal.provider.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{meal.provider.phone}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          Customer Reviews ({meal.reviews.length})
        </h2>

        {meal.reviews.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No reviews yet. Be the first to review this meal!
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {meal.reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {review.customerId.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
