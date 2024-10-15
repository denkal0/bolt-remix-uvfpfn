import { useState } from "react";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useToast } from "~/components/ui/use-toast";
import { createUser } from "~/models/user.server";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await createUser(email, password);
    return redirect("/login");
  } catch (error) {
    return json({ error: error.message }, { status: 400 });
  }
};

// ... rest of the component remains the same