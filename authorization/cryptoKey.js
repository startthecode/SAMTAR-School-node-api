import crypto from "crypto";

const secretKey = crypto.randomBytes(32).toString("hex"); // Replace with your actual shared secret key
export const encryptionKey = (unique_value) =>
  crypto
    .createHash("sha256")
    .update(unique_value + secretKey + "_db")
    .digest("base64");
