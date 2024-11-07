import { Link } from "@nextui-org/link";
import React from "react";

import SignupForm from "./SignupForm";

const Singnup = () => {
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h1 className="text-3xl text-center">Root n Rise <span className="text-green-500">Sign Up</span></h1>
      <SignupForm />
      <div>
        <p className="text-sm">
          Already have an account? <Link href="/login">login</Link>
        </p>
      </div>
    </div>
  );
};

export default Singnup;
