import { redirect } from "@sveltejs/kit";

import { credentials } from "../../lib/_credentials.svelte.ts";
import * as pronote from "pawnote";
export const load = async ({ cookies }) => {
  const handle = await pronote.createSessionHandle();
  try {
    const login = await pronote.loginQrCode(handle, {
      deviceUUID: credentials.deviceUUID,
      pin: credentials.pin,
      qr: JSON.parse(credentials.qr),
    });

    cookies.set("login", JSON.stringify(login), { path: "/" });
    redirect(303, "/");
  } catch (error) {
    if (error.name === "BadCredentialsError") {
      redirect(302, "/login");
    }
  }
};
