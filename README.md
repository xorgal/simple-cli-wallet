## simple-cli-wallet
### install nodejs & typescript
```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g typescript
sudo npm install -g ts-node
```

### clone repository and install dependencies
```
git clone https://github.com/xorgal/simple-cli-wallet.git
cd ~/simple-cli-wallet
npm install
cd src
```

### create and save new keypair
`$ ts-node new`

### import existing account from seed phrase
`$ ts-node import`

### launch wallet
`$ ts-node wallet`