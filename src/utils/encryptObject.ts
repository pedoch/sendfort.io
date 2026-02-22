import CryptoJS from "crypto-js";

export const encryptString = (content: string, password: string): string => {
  const encrypted = CryptoJS.AES.encrypt(
    content,
    `${process.env.SECRET}${password}`,
  ).toString();

  return encrypted; // return encrypted string
};

export const decryptString = (encryptedString: string, password: string): string => {
  const decrypted = CryptoJS.AES.decrypt(
    encryptedString,
    `${process.env.SECRET}${password}`,
  ).toString(CryptoJS.enc.Utf8);

  return decrypted; // return decrypted string
};
