"use client";
import { useRouter, useSearchParams } from "next/navigation"; // To handle redirection
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link } from "@nextui-org/link";

import { loginSchema } from "@/src/schema";
import { useUser } from "@/src/context/user.provider";
import { useLoginUser } from "@/src/hooks/user.hook";
import RnRForm from "@/src/components/form/RnRForm";
import RnRInput from "@/src/components/form/RnRInput";

export interface ILoginFormProps {}
export default function LoginForm({}: ILoginFormProps) {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const { setIsLoading: userLoading } = useUser();
  const { mutate: handleLogin, isPending, data } = useLoginUser();

  useEffect(() => {
    if (data && !data?.success) {
      toast.error(data?.message as string);
    } else if (data && data?.success) {
      toast.success(data.message);
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [data]);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleLogin(JSON.stringify(data));
    userLoading(true);
  };

  return (
    <div>
      <RnRForm onSubmit={handleSubmit} resolver={zodResolver(loginSchema)}>
        <RnRInput required label="Email" name="email" type="email" />
        <div className="relative">
          <RnRInput
            required
            label="Password"
            name="password"
            type={`${show ? "text" : "password"}`}
          />

          <button
            type="button"
            className="absolute top-5 right-2"
            onClick={() => setShow(!show)}
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <p className="mt-1">
          <Link
            href="/forget-password"
            className="text-sm font-bold hover:underline"
          >
            Forget Password?
          </Link>
        </p>

        <Button
          className="mt-2"
          isDisabled={isPending}
          radius="sm"
          size="sm"
          type="submit"
          fullWidth
          color="primary"
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </RnRForm>
    </div>
  );
}
