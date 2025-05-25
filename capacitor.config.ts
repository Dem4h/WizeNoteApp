import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.wizenote.app",
  appName: "wizenote",
  webDir: "build",
  server: {
    url: "http://127.0.0.1:5173",
    cleartext: true,
  },
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
