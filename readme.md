# IS4302 Charity Drive
## Installation Instructions
1. Clone this repository to any desired folder in your computer using the following command:
    ```
    git clone https://github.com/yuannypants/IS4302-Charity.git
    cd is4302-charity
    ```
2. Make sure your system meets the prerequisites in this [link](https://hyperledger.github.io/composer/v0.19/installing/installing-prereqs.html#macos).
3. In your CLIs, enter the follow command to __use Node v8.9.4__. Hyperledger Fabric v0.19 is only compatible with Node v8.9.4.
    ```
    nvm use 8.9.4
    ```
4. Install essential Composer v0.19 tools by running the following command:
    ```
    npm install -g composer-cli@0.19 composer-rest-server@0.19 generator-hyperledger-composer@0.19
    ``` 
5. Install dependencies.
    ```
    npm install
    ```
6. Download a copy of Hyperledger Fabric.
    ```
    npm run downloadFabric
    ```
7.  Initiate the blockchain. This command deploys a local Fabric runtime, zips the files in /bna into a .bna file, installs the .bna file and installs a business card.
    ```
    npm run initBlockchain
    ```
    If the command fails, you may have to remove existing Docker volumes that contain previous versions of Hyperledger Fabric. Run the following commands:
    ```
    npm run resetDocker
    ```
    If the command fails and give an error saying that the admin@is4302-charity business card isn't found, you may have to import it
    ```
    npm run importBNC
    ```
8.  Start the server and Composer REST servers using two separate command line windows.
    ```
    npm run start
    npm run startCRS
    npm run startMCRS
    ```
## Seeding Instructions
1.  Clear the blockchain by resetting it.
    ```
    npm run resetDocker
    npm run initBlockchain
    ```
2.  Start the server and Composer REST servers using three separate command line windows.
    ```
    npm run start
    npm run startCRS
    npm run startMCRS
    ```
3.  Run the seed command to populate both blockchain and Firebase database with test data.
    ```
    npm run seed
    ```
