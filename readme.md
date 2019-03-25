# IS4302 Charity Drive
## Installation Instructions
1. Clone this repository to any desired folder in your computer using the following command in cmd (Windows) or Terminal (MacOS):
    ```
    git clone https://github.com/yuannypants/IS4302-Charity.git
    cd is4302-charity
    ```
2. Make sure your system meets the prerequisites in this [link](https://hyperledger.github.io/composer/v0.19/installing/installing-prereqs.html#macos).
    * Note that instead of using the LTS (currently v10.15.3) version of Node, __use v8.9.4 instead__ or you will encounter errors when installing the CLI tools in step 2.
    ```
    nvm use 8.9.4
    ```
3. Install essential Composer tools by running the following command.
    ```
    npm install -g composer-cli@0.19 composer-rest-server@0.19 generator-hyperledger-composer@0.19
    ``` 
4. Install dependencies
    ```
    npm install
    ```
5. Download a copy of Hyperledger Fabric
    ```
    npm run downloadFabric
    ```
6.  Initiate the blockchain. This command deploys a local Fabric runtime, zips the files in /bna into a .bna file, installs the .bna file and installs a business card.
    ```
    npm run initBlockchain
    ```
    If the command does not work, you may have to remove existing Docker volumes that contain previous versions of Hyperledger Fabric. Run the following commands
    ```
    docker kill $(docker ps -q)
    docker rm $(docker ps -aq)
    docker rmi $(docker images dev-* -q)
    ```
7.  Start the server and Composer REST server using two separate command line windows.
    ```
    npm run start
    npm run startComposerRESTServer
    ```