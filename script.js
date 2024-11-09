"use strict";

updateTitle();

const WalletConnect = window.window.WalletConnect.default;
const WalletConnectQRCodeModal = window.WalletConnectQRCodeModal.default;
const bridge = "https://bridge.walletconnect.org";

let walletConnector = null;

function onInit() {
  walletConnector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org",
  });

  if (!walletConnector.connected) {
    walletConnector.createSession().then(() => {
      const uri = walletConnector.uri;
      console.log(uri);
      WalletConnectQRCodeModal.open(uri, () => {
        console.log("QR Code Modal closed");
      });
    });
  } else {
    const { accounts, chainId } = walletConnector;
    updateSessionDetails({ accounts, chainId });
  }

  onSubscribe();
}

async function connectMetaMask() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected account:", accounts[0]);
      document.getElementById(
        "page-actions"
      ).innerHTML = `Connected: ${accounts[0]}`;
      const toast = document.getElementById("toastSuccess");
      toast.style.display = "block";
      setTimeout(() => {
        toast.style.display = "none";
      }, 5000);
    } catch (error) {
      console.error("User rejected connection", error);
    }
  } else {
    alert("Please install MetaMask!");
  }
}

// async function updateTitle() {
//   const { version } = await getJsonFile("../../lerna.json");
//   const title = document.getElementById("page-title");
//   title.innerHTML =
//     title.innerHTML.replace(/\sv(\w.)+.\w+/gi, "") + ` v${version}`;
// }
