import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.webprofusion.openchargemap",
  appName: "Apna EV",
  webDir: "www\browser",
  android: {
    buildOptions: {
      keystorePath: "c:/Work/GIT/ocm-private/Certs/Android/android.keystore",
      keystoreAlias: "ocm",
    },
  },
};

export default config;
