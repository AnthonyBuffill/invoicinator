const express = require('express');
const router = express.Router();
const withAuth = require('../../utils/auth')
const { Invoice, User } = require('../../models');
const Mailjet = require('node-mailjet');
const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE
});

// Route to create a new invoice
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new invoice

    const paidStatusText = req.body.paidStatus = false;
    const userID = req.body.user_id = req.session.user_id;

    const newInvoice = await Invoice.create(req.body);

   
<<<<<<< HEAD
    const companyUser = await User.findByPk(req.session.user_id);
    if (!companyUser) {
        console.error('User not found');
        // Handle the case where user is not found, e.g., return an error response
        return res.status(404).json({ error: 'User not found' });
    }
    
    // Now that we've ensured companyUser is not null, access its properties
    const companyEmail = companyUser.email;
    const companyName = companyUser.name;
    
=======
    // const companyUser = await User.findByPk( req.session.user_id);
    const companyEmail = "raider4414@gmail.com";
    const companyName = req.body.companyName;
>>>>>>> origin

    const clientEmail = req.body.clientEmail;
    const clientName = req.body.clientName;
    

    const body = req.body;
    // Construct the HTML content of the email
    const invoiceHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <style>
         body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #333;
          }
  
          .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }
  
          .header {
              text-align: left;
              margin-bottom: 20px;
              overflow: hidden; 
          }
  
          .invoice-title {
              font-size: 2em; /* Original size */
              color: #0066cc;
              margin: 0;
              float: left;
          }
  
          .invoice-number {
              font-size: 1.2em;
              float: right;
              margin: 0;
          }
  
          .invoice-details {
              margin-bottom: 30px;
              border-bottom: 2px solid #ddd;
              padding-bottom: 20px;
          }
  
          .due-date {
              font-size: 1.5em;
              font-weight: bold;
              margin-top: 10px;
          }
  
          .address {
              font-size: 1.2em;
              text-align: right;
              margin: 0;
          }
          .address {
              font-size: 1.2em;
              text-align: right;
              margin: 0;
          }
  
          .client{
              font-size: 1.2em;
              text-align: left;
              margin: 0;
          }
  
          .company {
              font-size: 1.2em;
              text-align: left;
              margin: 0;
          }
  
          .separator {
              margin: 20px 0;
              border-bottom: 1px solid #ddd;
          }
  
          .description {
              margin-top: 20px;
          }
  
          .footer {
              margin-top: 20px;
              text-align: center;
              color: #888;
          }
  
          .footer p {
              font-size: 0.8em;
          }
      </style>
    </head>
    <body>
    
        <div class="container">
            <div class="header">
                <h1 class="invoice-title">Invoice</h1>
                <div class="invoice-number">Invoice Number: ${body.invoiceNumber} <br>${body.companyStreetAddress}<br>${body.companyCityAddress}</div>
            </div>
            <div class="invoice-details">
                <div class="due-date">Date Due: ${body.dueDate}</div>
                <div class="due-date">Amount Due: ${body.invoiceAmount}</div>
               
            </div>
          
            <div class="separator"></div>
            <div class="company">From: ${body.companyName}</div>
            <div class="client">To: ${body.clientName}</div>
            <div class="description">
                <p>Invoice Details: ${body.invoice_details}</p>
            </div>
            <div class="footer">
                <p style="font-size: 0.9em;">Thank you for your business! <br> ${body.companyName}</p>
            </div>
        </div>
    </body>
    </html>

    `;
    console.log(invoiceHtml);
    console.log(companyEmail);
    console.log(companyName);
    console.log(clientEmail);
    console.log(clientName);

    // Send email using Mailjet
    await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: companyEmail,
            Name: companyName,
          },
          To: [
            {
              Email: clientEmail,
              Name: clientName,
            },
          ],
          Subject: 'New Invoice Created',
          HTMLPart: invoiceHtml, 
        },
      ],
    });

    
    // await request;

    
    res.status(201).json(newInvoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create invoice or send email' });
  }
});



// Route to update an existing invoice
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await Invoice.update(req.body, {
      where: { id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(200).json({ message: 'Invoice updated' });
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: 'Failed to update invoice' });
  }
});

// Route to delete an invoice
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRowCount = await Invoice.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(200).json({ message: 'Invoice deleted' });
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: 'Failed to delete invoice' });
  }
});

module.exports = router;
