"use strict";

let accountManager;

// Hàm khởi tạo contract
function initContract() {
  const contractAddress = "0x540d7E428D5207B30EE03F2551Cbb5751D3c7569";
  const abi = [
    {
      inputs: [
        { internalType: "string", name: "_name", type: "string" },
        { internalType: "uint256", name: "_age", type: "uint256" },
      ],
      name: "createAccount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_walletAddress", type: "address" },
      ],
      name: "getAccount",
      outputs: [
        { internalType: "string", name: "", type: "string" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "_name", type: "string" },
        { internalType: "uint256", name: "_age", type: "uint256" },
      ],
      name: "updateAccount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "deleteAccount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "accounts",
      outputs: [
        { internalType: "string", name: "name", type: "string" },
        { internalType: "uint256", name: "age", type: "uint256" },
        { internalType: "address", name: "walletAddress", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  if (typeof window.ethereum !== "undefined") {
    const web3 = new Web3(window.ethereum);
    accountManager = new web3.eth.Contract(abi, contractAddress);
  } else {
    console.error("Web3 not detected. Make sure MetaMask is installed.");
  }
}

// Đảm bảo contract đã được khởi tạo trước khi sử dụng
async function ensureContractInitialized() {
  if (!accountManager) {
    initContract();
  }
}

// Kết nối MetaMask
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

      document.getElementById("btn_manage").style.display = "inline-block";

      return accounts[0]; // Trả về địa chỉ ví đã kết nối
    } catch (error) {
      console.error("User rejected connection", error);
    }
  } else {
    alert("Please install MetaMask!");
  }
}
// Chuyển sang custom 
function redirectToManage() {
  window.location.href = "http://127.0.0.1:5500/custom.html";
}
// Tạo tài khoản mới
async function createAccount() {
  await ensureContractInitialized();
  const account = await connectMetaMask();
  const name = document.getElementById("name").value;
  const age = parseInt(document.getElementById("age").value, 10);
  if (account) {
    await accountManager.methods
      .createAccount(name, age)
      .send({ from: account });
    console.log("Account created");
  }
}

// Lấy thông tin tài khoản
async function getAccount() {
  await ensureContractInitialized();
  const account = await connectMetaMask();
  if (account) {
    const result = await accountManager.methods.getAccount(account).call();
    console.log("Account Info:", result);
  }
}

// Cập nhật tài khoản
async function updateAccount(name, age) {
  await ensureContractInitialized();
  const account = await connectMetaMask();
  if (account) {
    await accountManager.methods
      .updateAccount(name, age)
      .send({ from: account });
    console.log("Account updated");
  }
}

// Xoá tài khoản
async function deleteAccount() {
  await ensureContractInitialized();
  const account = await connectMetaMask();
  if (account) {
    await accountManager.methods.deleteAccount().send({ from: account });
    console.log("Account deleted");
  }
}

window.onload = initContract;