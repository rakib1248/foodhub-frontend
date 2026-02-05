"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { meal } from "@/types";
import { deleteMeal } from "@/actionServer/meal.action";
import { toast } from "sonner";

export default function ProviderMenuManager({ data }: { data: any }) {
  const { businessName, address, phone, meals } = data?.data;

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this meal?")) {
      const { data } = await deleteMeal(id);
   
      if (!data.ok) {
        toast.error(data?.message ? data.message : "meal Delet faild");
        return;
      }
      toast.success("meal deleted successFully");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <Card className="bg-slate-50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold text-orange-600">
              {businessName}
            </CardTitle>
            <div className="flex gap-4 mt-2 text-slate-600">
              <p className="flex items-center gap-1">
                <MapPin size={16} /> {address}
              </p>
              <p className="flex items-center gap-1">
                <Phone size={16} /> {phone}
              </p>
            </div>
          </div>
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link href="/dashboard/mealcreate">
              {" "}
              <Plus className="mr-2 h-4 w-4" /> Add New Meal
            </Link>
          </Button>
        </CardHeader>
      </Card>

      {/* প্রোডাক্ট টেবিল */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Your Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Meal Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meals.map((meal: meal) => (
                <TableRow key={meal.id}>
                  <TableCell className="font-medium">
                    <div>
                      <p>{meal.name}</p>
                      <p className="text-xs text-slate-500">
                        {meal.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {meal.isAvailable ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Unavailable</Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-semibold">৳{meal.price}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="text-blue-600 border-blue-200">
                      <Link href={`/dashboard/meal/${meal.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-600 border-red-200"
                      onClick={() => handleDelete(meal.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
