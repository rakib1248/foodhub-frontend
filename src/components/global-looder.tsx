import { Skeleton } from "@/components/ui/skeleton";

interface GlobalLoaderProps {
  cardCount?: number;
}

export default function GlobalLoader({ cardCount = 8 }: GlobalLoaderProps) {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* 1. Navbar Skeleton */}
      <nav className="w-full border-b bg-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Skeleton className="h-8 w-32" />

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex space-x-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* User Profile / Button */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-9 w-20 rounded-md" /> {/* Action Button */}
            <Skeleton className="h-10 w-10 rounded-full" /> {/* Avatar */}
          </div>
        </div>
      </nav>

      {/* 2. Hero Section Skeleton (Optional but looks great) */}
      <div className="container mx-auto px-6 py-8">
        <Skeleton className="h-10 w-48 mb-6" /> {/* Page Title */}
        {/* 3. Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: cardCount }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col border rounded-2xl p-4 space-y-4 shadow-sm">
              {/* Card Image - Aspect Ratio Box */}
              <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                <Skeleton className="h-full w-full" />
              </div>

              {/* Card Details */}
              <div className="space-y-3">
                {/* Product Title */}
                <Skeleton className="h-5 w-4/5" />

                {/* Description lines */}
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>

              {/* Price and Action Button */}
              <div className="flex justify-between items-center pt-4 mt-auto">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-12" /> {/* Label */}
                  <Skeleton className="h-6 w-16" /> {/* Price */}
                </div>
                <Skeleton className="h-10 w-28 rounded-full" />{" "}
                {/* Add to Cart */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
