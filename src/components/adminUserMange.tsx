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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { editStatus } from "@/actionServer/user.action";
import { status } from "@/constants/roles";

export default function UserManagementTable({
  users: initialUsers,
}: {
  users: any[];
}) {
  const [users, setUsers] = useState(initialUsers);

  const handleStatusChange = async (userId: string, newStatus: string) => {
    const lodingId = toast.loading("Update user Status");

    try {
      const { data } = await editStatus({ id: userId, status: newStatus });
      console.log(data)

      if (!data.ok) {
        toast.error(data?.message ? data.message : "someting Is Wrong", {
          id: lodingId,
        });
        return;
      }

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user,
        ),
      );
      toast.success(`User is now ${newStatus}`, { id: lodingId });
    } catch (error) {
      toast.error("Failed to update status", { id: lodingId });
    }
  };

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[250px]">User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-slate-50/50 transition-colors">
              <TableCell className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border">
                  <AvatarImage src={user.image} />
                  <AvatarFallback className="bg-orange-100 text-orange-700 font-bold">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-slate-900">
                    {user.name}
                  </span>
                  <span className="text-xs text-slate-500">{user.email}</span>
                </div>
              </TableCell>

              <TableCell>
                <Badge
                  variant="secondary"
                  className={`${
                    user.role === "ADMIN"
                      ? "bg-purple-100 text-purple-700"
                      : user.role === "PROVIDER"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100"
                  }`}>
                  {user.role}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge
                  className={`${
                    user.status === "ACTIVE"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-red-100 text-red-700 border-red-200"
                  } hover:bg-transparent`}
                  variant="outline">
                  {user.status}
                </Badge>
              </TableCell>

              <TableCell className="text-slate-500 text-sm">
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                <Select
                  defaultValue={user.status}
                  onValueChange={(value) => handleStatusChange(user.id, value)}
                  disabled={user.role === "ADMIN"} 
                >
                  <SelectTrigger className="w-[130px] ml-auto h-8 text-xs">
                    <SelectValue placeholder="Change Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={status.active}>Active</SelectItem>
                    <SelectItem value={status.suspend}>Suspend</SelectItem>
                   
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
