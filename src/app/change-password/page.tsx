import { Link } from "@nextui-org/link";
import { Metadata } from "next";
import ChangePasswordForm from "./ChangePasswordForm";

export const metadata: Metadata = {
  title: "Change Password",
  description:
    "Update your password securely at Root & Rise to keep your account safe and protected.",
};

export default function ChangePassword() {
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h1 className="text-3xl text-center">
        <span className="text-blue-400 font-bold">G</span>arden
        <span className="text-blue-400 font-bold">B</span>ook change password
      </h1>
      <ChangePasswordForm />
      <div>
        <p className="text-sm">
          Not ready to change password? <Link href="/signup">Home</Link>
        </p>
      </div>
    </div>
  );
}