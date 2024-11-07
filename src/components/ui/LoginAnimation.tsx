"use client";

import React from "react";
import Lottie from "lottie-react";

import animation from "@/src/assets/loginAnimation.json";
export default function LoginAnimation() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "100%",
      }}
    >
      <Lottie animationData={animation} loop={true} />
    </div>
  );
}
