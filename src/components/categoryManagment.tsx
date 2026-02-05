"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, FolderEdit, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { deleteCategory, updateCategory } from "@/actionServer/category.action";
import Link from "next/link";

export default function CategoryManager({ categories }: { categories: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClick = (category: any) => {
    setSelectedCategory(category);
    setIsEditOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure? This will delete the category!")) {
      try {
        const { data } = await deleteCategory(id);
        
        if (!data.ok) {
          toast.error(data?.message ? data?.message : "Category Deleted Faild");
          return;
        }
        toast.success("category Deleted Successfully");
      } catch (error) {
        toast.error("someting is Wrong Please Try agaian");
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating Category:", selectedCategory);

    try {
      const { data } = await updateCategory(
        selectedCategory.id,
        selectedCategory.name,
      );
      console.log(data);

      if (!data.ok) {
        toast.error("someting Is Wrong");
        return;
      }

      toast.success("Update succecfull");
    } catch (error) {
      toast.error("somting is wrong Please try again");
    }

    setIsEditOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FolderEdit className="text-orange-500" /> Manage Categories
        </h2>
        <Button asChild className="bg-orange-500 hover:bg-orange-600">
          <Link href="/dashboard/categorycreate">
            {" "}
            <Plus className="mr-2 h-4 w-4" /> Add New Category
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
            <TableHead>Total Meals</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell className="font-medium capitalize">
                {cat.name}
              </TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-slate-100 rounded-md text-xs font-semibold">
                  {cat.meals?.length || 0} Items
                </span>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:bg-blue-50"
                  onClick={() => handleEditClick(cat)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(cat.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* --- EDIT MODAL --- */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <form onSubmit={handleUpdate}>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={selectedCategory?.name || ""}
                  onChange={(e) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600">
                Update Category
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
