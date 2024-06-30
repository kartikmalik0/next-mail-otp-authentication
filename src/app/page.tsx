"use client"
import { useSession } from "next-auth/react";
import Dashboard from "./(dashboard)/dashboard/page";

export default function Home() {
  const { data, status } = useSession()
  console.log(data?.user, status, "sessions")
  return (
    <div>
      <Dashboard />
    </div>
  );
}
