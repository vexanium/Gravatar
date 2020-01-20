# Gravatar
DApp for storing Avatars by utilizing IPFS developed using ReactJS

## Installation
Below the step by step installation procedure to activate the FrontEnd App
1. **Clone** this repository  
   ```git clone https://github.com/vexanium/Gravatar.git```  
2. Go to **frontend directory**  
   ```cd /{placeyouput}/Gravatar/frontend```  
3. Change the **port (optional)**  
   By default ReactJS will use port **3000**, if you don't mind with it, skip this and go to next step.  
   Otherwise, open and edit **package.json**  
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
