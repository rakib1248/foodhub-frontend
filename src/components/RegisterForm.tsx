"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Roles as userRole } from "@/constants/roles";
import { Input } from "./ui/input";
import Link from "next/link";
import { authClient } from "@/lib/auth-clint";
import { uploadImage } from "@/lib/claudinary";

const Roles = [
  { label: "Customer", value: userRole.user },
  { label: "Provider", value: userRole.provider },
  ,
] as const;

const formSchema = z.object({
  name: z.string().min(1, "This field is requred"),
  email: z.email(),
  password: z.string().min(8, "minimum length is 8"),

  role: z
    .string()
    .min(1, "Please select your Account.")
    .refine((val) => val !== "auto", {
      message: "Auto-detection is not allowed. Please select a specific Role.",
    }),
  image: z.any(),
  pablicID: z.any(),
});

export default function RegistationForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: null as File | null,
      pablicID: null,
      role: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const lodingId = toast.loading("Creating user...");
      console.log(value);

      try {
  

        const result = await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
          role: value.role,
       
        });
        console.log(result);
        if (!result.data) {
          toast.error(
            result.error.message
              ? result.error.message
              : "someting went Wron Please Try Again",
            { id: lodingId },
          );
          return;
        }
        toast.success("Account Create Successfull", { id: lodingId });
      } catch (erro) {
        toast.error("someting went Wron Please Try Again", {
          id: lodingId,
        });
      }

      form.reset();
    },
  });

  return (
    <Card className="w-full sm:max-w-lg">
      <CardHeader>
        <CardTitle>Registation account</CardTitle>
        <CardDescription>
          Create FoodHub Buyer or Seller Account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-tanstack-select"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}>
          <FieldGroup>
            <FieldGroup>
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="image"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Profile Image
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="file"
                        // value={field.state.value}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          field.handleChange(file);
                        }}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
            <form.Field
              name="role"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field orientation="responsive" data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor="form-tanstack-select-language">
                        select role
                      </FieldLabel>
                      <FieldDescription>
                        select buyer account customer or Seller acoount Provider
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}>
                      <SelectTrigger
                        id="form-tanstack-select-language"
                        aria-invalid={isInvalid}
                        className="min-w-[120px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectSeparator />
                        {Roles.map((role) => (
                          <SelectItem
                            key={role?.value}
                            value={role ? role.value : ""}>
                            {role?.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-tanstack-select">
            Save
          </Button>
        </Field>
      </CardFooter>
      <FieldDescription className="px-6 text-center">
        Already have an account? <Link href="/logine">Sign in</Link>
      </FieldDescription>
    </Card>
  );
}
