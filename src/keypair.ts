import {Buffer } from "buffer";
import { sign } from "tweetnacl";
import { writeFileSync } from "fs";
import { mnemonicToSeed } from "bip39";
import { sha3_256 } from "js-sha3";
import promptSync from "prompt-sync";

const prompter = promptSync();

console.log("");
const mnemonic: string = prompter("Enter seed phrase: ");
const accountName: string = prompter("Enter account name: ");

const keypairFromSeedPhrase = async () => {

    try {
    const userSeed = await mnemonicToSeed(mnemonic);
    let seed = new Uint8Array(userSeed.toJSON().data.slice(0, 32));
    let keypair = sign.keyPair.fromSeed(seed);
    let hash = sha3_256.create();
    hash.update(Buffer.from(keypair.publicKey));
    hash.update("\x00");
    let private_key = Buffer.from(keypair.secretKey).toString('hex').slice(0, 64); 
    let public_key = Buffer.from(keypair.publicKey).toString('hex');
    let address = hash.hex();
    console.log("\nKeypair sucessfully created.\n");
    writeFileSync(`./.accounts/${accountName}_keypair.key`,
    `private_key: 0x${private_key}\npublic_key: 0x${public_key}\naddress: 0x${address}`);
    } catch (error) {
        console.log("\nFailed create keypair.\n")
        console.log(error);
    }
  }






keypairFromSeedPhrase();


