import { decode } from "next-auth/jwt";

const secret = "ZALgCVp9YLeoUAkRptdsdsT2+jHF1xLsti4YvLb8isA="; // Your secret key
const encryptedToken = process.argv[2];

const token = async () =>
  decode({
    token: encryptedToken,
    secret: secret,
  }).then((d) => console.log(d));

token();
