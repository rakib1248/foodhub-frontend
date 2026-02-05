"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";

import { editProfile } from "@/actionServer/user.action";
import { mealUpdate } from "@/actionServer/meal.action";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(2),
});

export default function MealUpdateForm({
  data,
  id,
}: {
  data: { name: string; description: string; price: Number };
  id: string;
}) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: data.name,
      description: data.description,
      price: Number(data.price),
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const lodingId = toast.loading("Update user Name");

      try {
        const {data} = await mealUpdate(id, value);
        console.log(data)

        if (!data?.ok) {
          toast.error( data?.message ? data?.message: "someting Is Wrong", { id: lodingId });
          return;
        }

        toast.success(" meal Update succecfull", { id: lodingId });
        router.push("/dashboard/meal");
      } catch (erro) {
        toast.error("someting went Wron Please Try Again", {
          id: lodingId,
        });
      }

      form.reset();
    },
  });

  return (
    <div className="flex justify-center items-center mt-6">
      <Card className="w-full sm:max-w-lg">
        <CardHeader>
          <CardTitle>Edit Your Meal </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="form-tanstack-select"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}>
            <FieldGroup>
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Profile Name</FieldLabel>
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
                      <FieldLabel htmlFor={field.name}>Profile Name</FieldLabel>
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
                      <FieldLabel htmlFor={field.name}>Profile Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        value={field.state.value as number}
                        onChange={(e) => {
                          const value = e.target.value;

                          if (/^\d*$/.test(value)) {
                            field.handleChange(
                              value === "" ? 0 : Number(value),
                            );
                          }
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
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit" form="form-tanstack-select">
              Save
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
