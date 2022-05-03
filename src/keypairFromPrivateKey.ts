import { Buffer } from "buffer";
import { sign } from "tweetnacl";
import { sha3_256 } from "js-sha3";
import { writeFileSync } from "fs";
import promptSync from "prompt-sync";

const prompter = promptSync();

console.log("");
const pk: string = prompter("Enter private key: ");
const accountName: string = prompter("Enter account name: ");

const keypairFromPrivateKey = () => {
  let data = Uint8Array.from(Buffer.from(pk, "hex"));
  let keypair = sign.keyPair.fromSeed(data);
  let hash = sha3_256.create();
  hash.update(Buffer.from(keypair.publicKey));
  hash.update("\x00");
  let private_key = Buffer.from(keypair.secretKey).toString("hex").slice(0, 64);
  let public_key = Buffer.from(keypair.publicKey).toString("hex");
  let address = hash.hex();
  console.log("\nKeypair sucessfully created.\n");
  writeFileSync(
    `./.accounts/${accountName}_keypair.key`,
    `private_key: 0x${private_key}\npublic_key: 0x${public_key}\naddress: 0x${address}`
  );
};

keypairFromPrivateKey();
