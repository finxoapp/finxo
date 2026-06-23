import { signIn } from "@/server/auth";

export default function LoginPage() {
  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 360 }}>
        <h1 style={{ marginBottom: "0.5rem" }}>FINXO</h1>
        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
          Sign in with Google to continue.
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            style={{
              padding: "0.75rem 1.5rem",
              background: "#4285f4",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </main>
  );
}
