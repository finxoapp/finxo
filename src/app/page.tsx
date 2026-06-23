import { auth, signOut } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  // Middleware handles redirect for unauthenticated requests,
  // but we guard here too as a belt-and-suspenders check.
  if (!session) {
    redirect("/login");
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>FINXO</h1>
      <p>Welcome, {session.user?.name ?? session.user?.email}.</p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </main>
  );
}
