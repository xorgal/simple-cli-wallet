## simple-cli-wallet
### install nodejs & typescipt
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
```

### create and save new keypair
`$ ts-node newkey`

### launch wallet
`$ ts-node wallet`
