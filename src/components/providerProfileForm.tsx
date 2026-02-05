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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";


import { Textarea } from "./ui/textarea";
import { providerprofileCreate } from "@/actionServer/provider.action";

const formSchema = z.object({
  businessName: z.string().min(1),
  description: z.string().min(1).max(500),
  address: z.string().min(1),
  phone: z.string().min(1).max(20),
});

export default function ProviderForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      businessName: "",
      description: "",
      address: "",
      phone: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const lodingId = toast.loading("Creating Bussness Profile");

      try {
    
        const result = await providerprofileCreate(value);
       

        if (!result.data) {
          toast.error("Someting Is Wron Pleas Try Again", { id: lodingId });
          return;
        }

        toast.success("Create Bussness Profile succecfull", { id: lodingId });
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
          <CardTitle>Complete your Provider Profile </CardTitle>
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
                name="businessName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        {" "}
                        BusinessName Name
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
                name="description"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Description Name
                      </FieldLabel>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        // type="text"
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
                name="address"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Your address</FieldLabel>
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
                name="phone"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
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
