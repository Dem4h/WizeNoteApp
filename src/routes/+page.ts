import * as pronote from "pawnote";
import { credentials } from "../lib/_credentials.svelte.ts";
import cookie from "cookiejs";
export const load = () => {
  if ( == "") {
    (async () => {
      console.log("------ PIN:");
      const handle = pronote.createSessionHandle();
      const refresh = await pronote.loginQrCode(handle, {
        deviceUUID: credentials.deviceUUID,
        pin: credentials.pin, // 4 numbers you provided in Pronote.
        qr: JSON.parse(credentials.qr),
      });

      //cookie.set("refresh", refresh, { path: "/" });
      console.info("Username:", refresh.username);
      console.info("Next-Time Token:", refresh.token);
      console.log("--------- Session HANDLE ");

      console.log(handle);
    });
  } else {
    (async () => {
     // const refresh = cookie.get("refresh");
      const next_handle = pronote.createSessionHandle();
      const next_refresh = await pronote.loginToken(next_handle, {
        kind: refresh.kind,
        url: refresh.url,
        username: refresh.username,
        token: refresh.token,
        deviceUUID: credentials.deviceUUID,
      });

      console.log("/---------\n");
      console.log("\n------ TOKEN:");
    })();
  }
};
//en gros export token
//si token existe bah on permet a l'utilisateur de se co dessus (deja fait juste load les elements)
//sinon bah qr code hein
