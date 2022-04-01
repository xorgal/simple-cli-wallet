import { Account, FaucetClient, RestClient } from "./base";
import promptSync from "prompt-sync";

const prompter = promptSync();
console.log ("");
const accountName: string = prompter("Enter account name: ");

// Currency settings
export const coinName = "TestCoin";

// Network settings
const networkName = "aptos-devnet";
const restClient = new RestClient();
const faucetClient = new FaucetClient(restClient);

const createAccount = async () => {
    const newAccount = new Account();
    newAccount.saveAccount(`./accounts/${accountName}.key`);
    console.log("\nCreating keypairs...");
    await faucetClient.fundAccount(newAccount.pubKey(), 0);
    console.log(`\nAddress: ${newAccount.address()}`);
    console.log(`Balance: ${await restClient.accountBalance(newAccount.address())} ${coinName}`);
}; 

const selectAccount = async () => {
    const existingAccount = new Account(`./accounts/${accountName}.key`);
    console.log("\nLoading keypairs...");
    console.log(`\nAddress: ${existingAccount.address()}`);
    console.log(`Balance: ${await restClient.accountBalance(existingAccount.address())} ${coinName}`);
};

const checkBalance = async () => {
    const existingAccount = new Account(`./accounts/${accountName}.key`);
    console.log(`\nBalance: ${await restClient.accountBalance(existingAccount.address())} ${coinName}`);
};

const receiveTestCoins = async () => {
    console.log("");
    const amountOfCoins = parseInt(prompter("Enter amount of coins: "));
    const existingAccount = new Account(`./accounts/${accountName}.key`);
    await faucetClient.fundAccount(existingAccount.pubKey(), amountOfCoins);
    console.log(`\nAddress: ${existingAccount.address()}`);
    console.log(`Balance: ${await restClient.accountBalance(existingAccount.address())} ${coinName}`);
};

const sendTestCoins = async () => {
    console.log("");
    const recipientAddress: string = prompter("Enter recipient address: ");
    const amountOfCoins = parseInt(prompter("Enter amount of coins: "));
    const existingAccount = new Account(`./accounts/${accountName}.key`);
    const txHash = await restClient.transfer(existingAccount, recipientAddress, amountOfCoins);
    await restClient.waitForTransaction(txHash);  
    console.log(`\nSent ${amountOfCoins} ${coinName} to ${recipientAddress}`);
};

const accountOptions = async () => {
    console.log("");
    const existingAccount = new Account(`./accounts/${accountName}.key`);
    var accountOption = parseInt(prompter(`${accountName}@${networkName}> `));
    if (accountOption == 1) {
        await checkBalance();
    }
    else if (accountOption == 2) {
        await sendTestCoins();
    }
    else if (accountOption == 3) {
        await receiveTestCoins();
    } 
    else if (accountOption == 4) {
        console.log("\nApp Quit\n")
        process.exit(0);
    }
    else {
    console.log("\nNo such option.");
    console.log("\n1. Check balance");
    console.log("2. Send coins");
    console.log("3. Generate TestCoins");
    console.log("4. Exit App");
    }
    accountOptions();
};

const showOptions = async () => {
    await selectAccount();
    console.log("\n1. Check balance");
    console.log("2. Send coins");
    console.log("3. Generate TestCoins");
    console.log("4. Exit App");
    accountOptions();
};

showOptions();