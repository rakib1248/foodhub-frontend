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


const formSchema = z.object({
  name: z.string().min(1),
  id: z.string().min(1),
});

export default function EditForm({
  data,
}: {
  data: { name: string; id: string };
}) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: data.name,
      id: data.id,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const lodingId = toast.loading("Update user Name");

      try {
       
          const {data} = await editProfile(value);
         

        if (!data.ok) {
          toast.error("someting Is Wrong", { id: lodingId });
          return;
        }

        toast.success("Update succecfull", { id: lodingId });
        router.push("/dashboard/profile");
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
          <CardTitle>Edit Your Profile Name </CardTitle>
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
                name="id"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="hidden"
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
