<<<<<<< HEAD
document.onload = (event) => {
  // Assign the createInvoice function to the click event of the button
  document.getElementById("send-invoice-button").onclick = createInvoice;
};
=======

document.getElementById("send-invoice-button").onclick = createInvoice;
>>>>>>> origin

function createInvoice(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

<<<<<<< HEAD
=======
  console.log("createinvoice")


>>>>>>> origin
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
<<<<<<< HEAD
=======
    invoice_details,
>>>>>>> origin
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

<<<<<<< HEAD
function postInvoice(jsonObject) {
  // Send the data to the server
  fetch('/api/posts', {
=======

function postInvoice(jsonObject) {
  console.log("postinvoice")
  // Send the data to the server
  fetch('/api/posts/', {
>>>>>>> origin
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
<<<<<<< HEAD
    console.log('Invoice successfully sent:', data);
=======
    window.location.href = '/dashboard';
>>>>>>> origin
  })
  .catch(error => {
    console.error('Error sending invoice:', error);
  });
<<<<<<< HEAD
}
=======
}
>>>>>>> origin
