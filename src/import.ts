import { Account, FaucetClient, RestClient } from "./base";
import promptSync from "prompt-sync";
import { sign, SignKeyPair } from "tweetnacl";
import { writeFileSync } from "fs";
import { mnemonicToSeed } from "bip39";

const prompter = promptSync();

console.log("");
const accountSeed: string = prompter("Enter seed phrase: ");
const accountName: string = prompter("Enter account name: ");

const restClient = new RestClient();
const faucetClient = new FaucetClient(restClient);

const keypairFromSeedPhrase = async (seedPhrase: string): Promise<SignKeyPair> => {
    const buffer = await mnemonicToSeed(accountSeed);
    let seed = new Uint8Array(buffer.toJSON().data.slice(0, 32));
    return sign.keyPair.fromSeed(seed);
};

const broadcastAccount = async () => {
    const importAccount = new Account(`./.accounts/${accountName}.key`);
    console.log("\nImporting account...");
    await faucetClient.fundAccount(importAccount.pubKey(), 0);
    console.log("\n[OK]");
    console.log(`\nAddress: ${importAccount.address()}`);
    console.log(`\nType "ts-node wallet" and use "${accountName}" to load your keypairs.\n`);
};

keypairFromSeedPhrase(accountSeed).then((newKeyPair) => {
    writeFileSync(`./.accounts/${accountName}.key`, newKeyPair.secretKey.toString());
    broadcastAccount();
});