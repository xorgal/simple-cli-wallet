## simple-cli-wallet

Demo wallet that can be run from command line. It works on Aptos devnet and supports basic functions, such as sending transactions to other addresses, checking account balance as well as funding address by minting TestCoins.

### Installation:

```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g typescript
sudo npm install -g ts-node
git clone https://github.com/xorgal/simple-cli-wallet.git
cd ~/simple-cli-wallet
npm install
cd src
```

### create and save new keypair

`$ ts-node new`

### import existing account from seed phrase

`$ ts-node import`

### generate keypair & address from seed phrase

`$ ts-node keypair`

### launch wallet

`$ ts-node wallet`
