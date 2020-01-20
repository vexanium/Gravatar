# Gravatar
DApp for storing Avatars by utilizing [IPFS](https://ipfs.io/) developed using ReactJS

## Installation
Below the step by step installation procedure to activate the FrontEnd App
1. **Clone** this repository  
   ```git clone https://github.com/vexanium/Gravatar.git```  
2. Go to **frontend directory**  
   ```cd /{placeyouput}/Gravatar/frontend```  
3. Change the **port (optional)**  
   By default ReactJS will use port **3000**, if you don't mind with it, skip this and go to next step.  
   Otherwise, open and edit [package.json](frontend/package.json) on your server, change the "start" option into something like this:
   ```js
   "scripts": {
      "start": "PORT=2000 react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test --env=jsdom",
      "eject": "react-scripts eject"
   },
   ```  
   > The example above is setting the port into 2000.  
5. **Install** and be patient for it   
   ```npm install```  
   >  As it's developed using ReactJS, you need to be connected to the internet, and patiently wait for it to download and setup all dependencies  
6. **Start** the app   
   ```npm start &```  

## Smart Contract
This app is using [vexaniumacct](https://explorer.vexanium.com/account/vexaniumacct) smart contract  
You can find the setup at [frontend/src/config/default.js](frontend/src/config/default.js)  
And if you want to learn the smart contract, you can brush up on [smartcontract/accountphoto.cpp](smartcontract/accountphoto.cpp)   
### Compiling the smart contract:  
```cpp
eosio-cpp accountphoto.cpp -o accountphoto.wasm
```  
> Please read our [Technical Documentation](http://dev.vexanium.com/tutorial) for this  
### Publishing the smart contract
You can publish the smart contract to your own Vexanium Account, for example: **yourownaccnt**  
```bash
./cleos --url http://209.97.162.124:8080 set contract yourownaccnt /dir/youput/contracts/accountphoto -p yourownaccnt@active
```  
Then edit [frontend/src/config/default.js](frontend/src/config/default.js), change into:  
```js
"contract": "yourownaccnt"
```  
re[install](#Installation) and re[start](#Installation) the app
