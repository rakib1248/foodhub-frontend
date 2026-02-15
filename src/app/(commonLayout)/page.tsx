import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categoryService } from "@/service/category.service";
import { mealService } from "@/service/meal.service";
import { meal } from "@/types";
import {
  ArrowRight,
  Badge,
  ShoppingCart,
  Star,
  Truck,
  Utensils,
  Zap,
} from "lucide-react";
import MealPage from "./meals/page";
import { MealCard } from "@/components/mealCard";

export default async function Home() {
  const { data: category } = await categoryService.getAllCategory();
  const { data: meal  } = await mealService.getAllMeal();

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* 1. Quick Categories */}
      <section className="container mx-auto px-4 mt-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              খুঁজে নিন আপনার পছন্দ
            </h2>
            <p className="text-slate-500">সেরা সব ক্যাটাগরি থেকে বেছে নিন</p>
          </div>
          <Button variant="ghost" className="text-orange-600">
            সব দেখুন <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {category?.data?.map((cat: { id: string; name: string }) => (
            <div
              key={cat.id}
              className="group cursor-pointer bg-white border border-slate-100 p-6 rounded-2xl flex flex-col items-center gap-3 hover:shadow-xl hover:shadow-orange-100 hover:border-orange-200 transition-all">
              <div className="h-16 w-16 bg-orange-50 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                <Utensils className="text-orange-600 group-hover:text-white" />
              </div>
              <span className="font-semibold text-slate-700">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Popular Meals Section */}
      <section className="container mx-auto px-4">
        <div className="mb-8">
          <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 border-none mb-2 px-3 py-1">
            Trending Now
          </Badge>
          <h2 className="text-3xl font-bold">জনপ্রিয় খাবারগুলো</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {meal?.data?.map((item: meal) => {
               return (
                 <div key={item.id}>
                   <MealCard meal={item} />
                 </div>
               );
             })}
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-slate-900">
            সহজ ৩টি ধাপে অর্ডার করুন
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 bg-white shadow-lg rounded-3xl flex items-center justify-center mb-6 text-orange-500">
                <ShoppingCart size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">পছন্দের খাবার বেছে নিন</h3>
              <p className="text-slate-500">
                আমাদের বিশাল মেনু থেকে আপনার পছন্দের খাবারটি সিলেক্ট করুন।
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 bg-white shadow-lg rounded-3xl flex items-center justify-center mb-6 text-blue-500">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">
                দ্রুত পেমেন্ট ও কনফার্ম
              </h3>
              <p className="text-slate-500">
                ক্যাশ অন ডেলিভারি বা অনলাইনের মাধ্যমে অর্ডারটি কনফার্ম করুন।
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 bg-white shadow-lg rounded-3xl flex items-center justify-center mb-6 text-green-500">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">গরম গরম ডেলিভারি</h3>
              <p className="text-slate-500">
                আপনার দরজায় খুব দ্রুত খাবার পৌঁছে দিবে আমাদের রাইডার।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Provider CTA Banner */}
      <section className="container mx-auto px-4">
        <div className="bg-orange-600 rounded-[2rem] p-8 md:p-16 relative overflow-hidden text-white flex flex-col md:flex-row items-center gap-10">
          <div className="z-10 flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              আপনার হাতের রান্না কি অসাধারণ?
            </h2>
            <p className="text-orange-100 text-lg">
              আজই আমাদের প্রোভাইডার হিসেবে জয়েন করুন এবং আপনার ব্যবসার সেল বাড়ান
              কয়েকগুণ!
            </p>
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-8 py-7 rounded-xl text-lg">
              Start Your Business Today
            </Button>
          </div>
          <div className="relative flex-1 w-full h-64 md:h-80 opacity-20">
            <Utensils
              size={300}
              className="absolute -right-20 -bottom-20 rotate-12"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
