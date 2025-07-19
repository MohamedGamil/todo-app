import { FireBaseConfig } from "./firebase-config";

export const environment = {
  production: false,
  firebaseConfig: {
    ...FireBaseConfig,
  },
};
