import crypto from "crypto";

const secretKey = process.env.SECRET_KEY_CRYPTO; // Replace with your actual shared secret key
export const encryptionKey = (unique_value) =>
  crypto
    .createHash("sha256")
    .update(unique_value + secretKey + "_db")
    .digest("base64");
