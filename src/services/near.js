import { keyStores, Near, WalletConnection, utils } from "near-api-js";
import BN from "bn.js";

export const CONTRACT_ID = "dev-1634131199153-23397978180139";
export const REGISTRY_CONTRACT_ID = "dev-1631276003404-61262416620213";
const gas = new BN("70000000000000");

// new NEAR is using  here to avoid async/await
export const near = new Near({
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
});

export const wallet = new WalletConnection(near, "thankyou");

// function to get all recipients from registry contract
export const getRecipients = () => {
  return wallet.account().viewFunction(REGISTRY_CONTRACT_ID, "list_all");
};

// function to get all messages from thankyou contract
export const getMessages = () => {
  return wallet.account().viewFunction(CONTRACT_ID, "list");
};

// function to transfer funds to  owner
export const transfer = () => {
  return wallet.account().viewFunction(CONTRACT_ID, "transfer");
};

// function to sendMessage
export const sendMessage = ({ message, anonymous, attachedDeposit }) => {
  attachedDeposit = utils.format.parseNearAmount(attachedDeposit);
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: "say",
    args: { message, anonymous },
    attachedDeposit: attachedDeposit,
  });
};
