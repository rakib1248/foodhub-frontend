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
import { createCategory } from "@/actionServer/category.action";

const formSchema = z.object({
  name: z.string().min(1),
});

export default function CreateCategoryForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const lodingId = toast.loading("Creating Category");

      try {
        const { data } = await createCategory(value.name);

        if (!data.ok) {
          toast.error(data.message? data.message :"someting Is Wrong", { id: lodingId });
          return;
        }

        toast.success("Create Category succecfull", { id: lodingId });
        router.push("/dashboard/category");
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
          <CardTitle>Create Your Category </CardTitle>
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
                      <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
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
