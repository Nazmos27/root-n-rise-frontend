"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { forgetPasswordSchema } from "@/src/schema";
import { useForgetPassword } from "@/src/hooks/user.hook";
import { useEffect } from "react";
import RnRInput from "@/src/components/form/RnRInput";
import RnRForm from "@/src/components/form/RnRForm";

export interface IForgetPasswordFormProps {}
export default function ForgetPasswordForm({}: IForgetPasswordFormProps) {
  const {
    mutate: handleEmailSend,
    isPending,
    isSuccess,
    data,
  } = useForgetPassword();

  useEffect(() => {
    if (data && !data?.success) {
      toast.error(data?.message as string);
    } else if (data && data?.success) {
      toast.success(data.message);
    }
  }, [data]);
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleEmailSend(JSON.stringify(data));
  };

  return (
    <div>
      <RnRForm
        onSubmit={handleSubmit}
        resolver={zodResolver(forgetPasswordSchema)}
      >
        <RnRInput required label="Email" name="email" type="email" />

        <Button
          className="my-3"
          isDisabled={isPending}
          radius="sm"
          size="sm"
          type="submit"
          color="primary"
        >
          {isPending ? "Sending..." : "Send Email"}
        </Button>
      </RnRForm>
      <div>
        {!isPending && isSuccess && (
          <p className="text-red-500 text-xs my-2">
            An email sent to your email with reset password link
          </p>
        )}
      </div>
    </div>
  );
}
