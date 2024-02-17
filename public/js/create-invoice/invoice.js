
document.getElementById("send-invoice-button").onclick = createInvoice;
document.getElementById("invoice-num").value = Math.floor((1 + Math.random()) * 0x100000000)
.toString(16)
.substring(1);
document.getElementById("amount-due").onchange = ()=>{
  let value = document.getElementById("amount-due")
              .value.replace(/[^0-9.]/g, '');
  if(!isNaN(value) && value.length > 0){
    value = parseFloat(value).toFixed(2);
  }
  else{
    value = "0.00";
  }
  document.getElementById("amount-due").value = "$" + value;
}
document.getElementById("closePopup").onclick = ()=>{
  const allInput = document.querySelectorAll("input");
  allInput.forEach(el=>el.disabled = false);
  document.querySelector("textarea").disabled = false;
  document.getElementById("send-invoice-button").disabled = false;
};

function createInvoice(event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  event.target.disabled = true;

  const allInput = document.querySelectorAll("input");
  allInput.forEach(el=>el.disabled = true);
  document.querySelector("textarea").disabled = true;
  // Retrieve input values
  const invoiceNumber = document.getElementById("invoice-num").value;
  const invoice_details = document.getElementById("invoice-details").value;
  const companyName = document.getElementById("company-name").value;
  const dueDate = document.getElementById("payment-due").value;
  let invoiceAmount = document.getElementById("amount-due").value;
  if(invoiceAmount[0] === '$')
    invoiceAmount = invoiceAmount.substring(1);
  const companyEmail = document.getElementById("user-email").value;
  const companyStreetAddress = document.getElementById("user-address").value;
  const companyCityAddress = document.getElementById("user-city").value;
  const clientEmail = document.getElementById("client-email").value;
  const clientName = document.getElementById("client-name").value;
  const clientStreetAddress = document.getElementById("client-address").value;
  const clientCityAddress = document.getElementById("client-city").value;

  // Call postInvoice with the collected data
  postInvoice({
    invoiceAmount,
    invoice_details,
    invoiceNumber,
    companyName,
    companyStreetAddress,
    companyCityAddress,
    companyEmail,
    clientName,
    clientStreetAddress,
    clientCityAddress,
    clientEmail,
    dueDate
  });
}


function postInvoice(jsonObject) {
  
  // Send the data to the server
  fetch('/api/posts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonObject),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response failed');
    }
    return response.json();
  })
  .then(data => {
    document.getElementById("popup").style.display = 'block';
    document.getElementById('invoice-email').innerHTML = data.html;
  })
  .catch(error => {
    console.error('Error sending invoice:', error);
  });
}

