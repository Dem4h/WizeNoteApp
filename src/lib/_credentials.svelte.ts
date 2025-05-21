import { PUBLIC_PIN, PUBLIC_PRONOTE_URL, PUBLIC_QR } from "$env/static/public";
import { v4 as uuid4 } from "uuid";
export const credentials = {
  pronoteURL: PUBLIC_PRONOTE_URL,

  qr: PUBLIC_QR,
  pin: PUBLIC_PIN,

  deviceUUID: uuid4(),
};
