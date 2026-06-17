"use client";
import StableButton from "@/components/common/button";
import { useAuth } from "@/hooks/useAuth";

import Link from "next/link";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className=" flex-1 flex flex-col text-text-custom items-start justify-evenly pl-10 h-full">
      <h1 className="w-100  text-5xl">
        Get your Resume Reviewed <span className="font-bold">Intantly</span>
      </h1>
      <StableButton className="rounded-full! px-8 py-4">
        <Link href={user ? "/resume" : "/login"}>Upload Your Resume</Link>
      </StableButton>
    </div>
  );
}
