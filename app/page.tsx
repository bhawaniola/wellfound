"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import VendorList from "./components/VendorList";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: 200, justifyContent: "center" }}>
        <h2>Vendor Manager</h2>
        <button onClick={() => signIn("google")}>Login with Google</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <button onClick={() => signOut()}>Logout</button>
      </div>
      <VendorList />
    </div>
  );
}
