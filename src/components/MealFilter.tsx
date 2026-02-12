"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { getCategory } from "@/actionServer/category.action";
import { providerService } from "@/service/provider.service";

export function MealFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getCategory();

      setCategories(data?.data);
    };

    fetchCategories();
  }, []);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [categoryId, setCategoryId] = useState(
    searchParams.get("categoryId") || "",
  );
  const [providerId, setProviderId] = useState(
    searchParams.get("providerId") || "",
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [isAvailable, setIsAvailable] = useState(
    searchParams.get("isAvailable") === "true",
  );

  const handleFilter = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (categoryId) params.set("categoryId", categoryId);
    if (providerId) params.set("providerId", providerId);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (isAvailable) params.set("isAvailable", "true");

    router.push(`?${params.toString()}`);
  };

  const handleReset = () => {
    setSearch("");
    setCategoryId("");
    setProviderId("");
    setMinPrice("");
    setMaxPrice("");
    setIsAvailable(false);
    router.push("/meals"); // বা যেকোনো base path
  };

  return (
    <div className="bg-card rounded-lg border p-6 space-y-4">
      <h2 className="text-lg font-semibold">Filters</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search meals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2 ">
          <Label>Category</Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((item) => (
                <SelectItem value={item.id} key={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Min Price */}
        <div className="space-y-2">
          <Label htmlFor="minPrice">Min Price</Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        {/* Max Price */}
        <div className="space-y-2">
          <Label htmlFor="maxPrice">Max Price</Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        {/* Available Only */}
        <div className="flex items-center space-x-2 pt-8">
          <Checkbox
            id="available"
            checked={isAvailable}
            onCheckedChange={(checked) => setIsAvailable(checked as boolean)}
          />
          <Label htmlFor="available" className="cursor-pointer">
            Available only
          </Label>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={handleFilter}>Apply Filters</Button>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
