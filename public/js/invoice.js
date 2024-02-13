document.onload = (event) =>{

  document.getElementById("send-invoice-button").onclick = createInvoice;
};

function createInvoice(event){
  const invoiceNumber = document.getElementById("invoice-num").value;
}