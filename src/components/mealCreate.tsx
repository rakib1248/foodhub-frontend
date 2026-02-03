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

const Roles = [
  { label: "Customer", value: userRole.user },
  { label: "Provider", value: userRole.provider },
  ,
] as const;

const formSchema = z.object({
  name: z.string().min(1, "This field is requred"),
  description: z.string().min(1, "This field is requred"),
  price: z.number().min(1, "This field is requred"),
  categoryId: z.string().min(1, "This field is requred"),
});

export default function MealCreateForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const lodingId = toast.loading("Creating Meal...");

      try {
        // const result = await authClient.signUp.email({
        //   name: value.name,
        //   email: value.email,
        //   password: value.password,
        //   role: value.role,
        // });
        console.log(value);
        // if (!result.data) {
        //   toast.error(
        //     result.error.message
        //       ? result.error.message
        //       : "someting went Wron Please Try Again",
        //     { id: lodingId },
        //   );
        //   return;
        // }
        toast.success("Meal Create Successfull", { id: lodingId });
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
        <CardTitle>ADD your New Meal</CardTitle>
        <CardDescription>
           FoodHub  Seller 
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
                name="description"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Meal description
                      </FieldLabel>
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
                name="price"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Meal Price</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
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
              name="categoryId"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field orientation="responsive" data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor="form-tanstack-select-language">
                        select Category
                      </FieldLabel>

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
    </Card>
  );
}
