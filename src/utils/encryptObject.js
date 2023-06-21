import CryptoJS from "crypto-js";

export const encryptString = (content, password) => {
  const encrypted = CryptoJS.AES.encrypt(
    content,
    `${process.env.SECRET}${password}`,
  ).toString();

  return encrypted; // return encrypted string
};

export const decryptString = (encryptedString, password) => {
  const decrypted = CryptoJS.AES.decrypt(
    encryptedString,
    `${process.env.SECRET}${password}`,
  ).toString(CryptoJS.enc.Utf8);

  return decrypted; // return decrypted string
};
