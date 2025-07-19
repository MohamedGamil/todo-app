import { FireBaseConfig } from "./firebase-config";

export const environment = {
  production: true,
  firebaseConfig: {
    ...FireBaseConfig,
  },
};
