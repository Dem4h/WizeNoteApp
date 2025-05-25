import * as pronote from "pawnote";
import { credentials } from "../lib/_credentials.svelte.ts";
//import { CapacitorCookies } from "@capacitor/core";

export const load = async ({ cookies }) => {
  console.log("------ PIN:");
  const handle = pronote.createSessionHandle();
  const login = await pronote.loginQrCode(handle, {
    deviceUUID: credentials.deviceUUID,
    pin: credentials.pin, // 4 numbers you provided in Pronote.
    qr: JSON.parse(credentials.qr),
  });
  // cookies.set("login", login, { path: "/" });

  console.log(login);
  console.log("--------- Session HANDLE ");

  console.log(handle);

  console.log("\n------ TOKEN:");
  console.log(login.username);
  const next_handle = pronote.createSessionHandle();
  const next_login = await pronote.loginToken(next_handle, {
    kind: login.kind,
    url: login.url,
    username: login.username,
    token: login.token,
    deviceUUID: credentials.deviceUUID,
  });

  console.info("Username:", next_login.username);
  console.info("Next-Time Token:", next_login.token);
  cookies.set("login", JSON.stringify(next_login), { path: "/" });

  return {
    login,
  };
};
//en gros export token
//si token existe bah on permet a l'utilisateur de se co dessus (deja fait juste load les elements)
//sinon bah qr code hein
