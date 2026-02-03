import { authService } from "@/service/auth.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { userService } from "@/service/user.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Roles } from "@/constants/roles";

export default async function ProfilePage() {
  const { data } = await userService.getProfile();
  const user = data?.data;

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center relative gap-6 mb-8 bg-muted/30 p-8 rounded-2xl border">
        <Avatar className="h-24 w-24 border-4 border-primary/10">
          <AvatarImage src={user.image || ""} />
          <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
            {user.name?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left space-y-2">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <Badge
              variant={user.status === "ACTIVE" ? "default" : "destructive"}>
              {user.status}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {user.role}
            </Badge>
          </div>
          <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2">
            <Mail className="h-4 w-4" /> {user.email}
          </p>
        </div>
        <div className=" absolute top-5 right-5  flex flex-col gap-2">
          <Button asChild>
            <Link href="/dashboard/profile/edit">Edit Profile</Link>
          </Button>

          {user.role === Roles.provider && (
            <>
              <>
                {user?.providerProfile ? (
                  ""
                ) : (
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/profile/provider">
                      Please Complete your Profile
                    </Link>
                  </Button>
                )}
              </>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Joined
              </span>
              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-muted-foreground">Email Verified</span>
              <Badge variant={user.emailVerified ? "default" : "secondary"}>
                {user.emailVerified ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">User ID</span>
              <span className="text-xs font-mono bg-muted p-1 rounded">
                {user.id}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Provider/Business Profile Section */}
        {user.providerProfile ? (
          <Card className="border-primary/20 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Business Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Business Name
                </label>
                <p className="text-lg font-semibold">
                  {user.providerProfile.businessName}
                </p>
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Description
                </label>
                <p className="text-sm text-muted-foreground">
                  {user.providerProfile.description}
                </p>
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{user.providerProfile.phone || "No phone added"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>
                    {user.providerProfile.address || "No address added"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
