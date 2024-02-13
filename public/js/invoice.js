document.onload = (event) =>{

  document.getElementById("send-invoice-button").onclick = createInvoice;
};

function createInvoice(event){
  const invoiceNumber = document.getElementById("invoice-num").value;
  const companyName = document.getElementById("company-name").value;
  const dueDate = document.getElementById("payment-due").value;
  const invoiceAmount = document.getElementById("amount-due").value;
  const companyEmail = document.getElementById("user-email").value;
  const username = document.getElementById("user-name").value;
  const companyStreetAddress = document.getElementById("user-address").value;
  const companyCityAddress = document.getElementById("user-city").value;
  const clientEmail = document.getElementById("client-email").value;
  const clientName = document.getElementById("client-name").value;
  const clientStreetAddress = document.getElementById("client-address").value;
  const clientCityAddress = document.getElementById("client-city").value;
  const invoiceDetails = document.getElementById("invoice-details").value;

  postInvoice({
    invoiceAmount, invoiceNumber, companyName,
    companyStreetAddress, companyCityAddress,
    companyEmail, clientName, clientStreetAddress,
    clientCityAddress, clientEmail, dueDate
  });
}

function postInvoice(jsonObject){
  console.log(JSON.stringify(jsonObject));
}