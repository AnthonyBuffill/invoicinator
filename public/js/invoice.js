
document.getElementById("send-invoice-button").onclick = createInvoice;

function createInvoice(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  console.log("createinvoice")


  // Retrieve input values
  const invoiceNumber = document.getElementById("invoice-num").value;
  const invoice_details = document.getElementById("invoice-details").value;
  const companyName = document.getElementById("company-name").value;
  const dueDate = document.getElementById("payment-due").value;
  const invoiceAmount = document.getElementById("amount-due").value;
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
  console.log("postinvoice")
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
    window.location.href = '/dashboard';
  })
  .catch(error => {
    console.error('Error sending invoice:', error);
  });
}