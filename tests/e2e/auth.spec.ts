import { test, expect } from "@playwright/test";

test("unauthenticated request to / redirects to /login", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/login/);
});

test("/login page renders the sign-in button", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("button", { name: /sign in with google/i })).toBeVisible();
});
