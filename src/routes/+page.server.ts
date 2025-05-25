import * as pronote from "pawnote";
import { credentials } from "../lib/_credentials.svelte.ts";
//import { CapacitorCookies } from "@capacitor/core";

export const load = async ({ cookies }) => {
  if (cookies.get("login") == undefined) {
    console.log("No Token");
    const handle = await pronote.createSessionHandle();
    const login = await pronote.loginQrCode(handle, {
      deviceUUID: credentials.deviceUUID,
      pin: credentials.pin,
      qr: JSON.parse(credentials.qr),
    });
    const account = await pronote.account(handle);
    console.log(account);
    console.log(login);

    cookies.set("login", JSON.stringify(login), { path: "/" });
    return {
      login,
    };
  } else {
    console.log("Token");
    const prev_login = await JSON.parse(cookies.get("login"));
    console.log(prev_login);
    const handle = pronote.createSessionHandle();
    const login = await pronote.loginToken(handle, {
      deviceUUID: credentials.deviceUUID,
      kind: prev_login.kind,
      url: prev_login.url,
      username: prev_login.username,
      token: prev_login.token,
    });

    const account = await pronote.account(handle);
    console.log(account);
    return {
      login,
    };
  }
  /*

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
  console.log(cookies.get("lugin"));
  */
};

// check login == udefined :
// true -> go for qr and pin auth and add cookie
// false -> login = token : , username :, kind:,url:,navigatorIdentifier:,
// auth with token and add cookie
