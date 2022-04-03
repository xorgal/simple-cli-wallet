import { Account, FaucetClient, RestClient } from "./base";
import promptSync from "prompt-sync";

const prompter = promptSync();
console.log("");
const accountName: string = prompter("Enter account name: ");

const restClient = new RestClient();
const faucetClient = new FaucetClient(restClient);

const createAccount = async () => {
    const newAccount = new Account();
    newAccount.saveAccount(`./.accounts/${accountName}.key`);
    console.log("\nCreating keypairs...");
    await faucetClient.fundAccount(newAccount.pubKey(), 0);
    console.log("\n[OK]");
    console.log("\nNew address created:");
    console.log(`${newAccount.address()}`);
    console.log(`\nType "ts-node wallet" and use "${accountName}" to load your keypairs.\n`);
}

createAccount();