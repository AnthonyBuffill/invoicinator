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

   
    // const companyUser = await User.findByPk( req.session.user_id);
    const companyEmail = "raider4414@gmail.com";
    const companyName = req.body.companyName;

    const clientEmail = req.body.clientEmail;
    const clientName = req.body.clientName;
    

    const body = req.body;
    // Construct the HTML content of the email
    const invoiceHtml = `
    <h2>New Invoice Created</h2>
    <p>Invoice Amount: $${body.invoiceAmount}</p>
    <p>Invoice Number: ${body.invoiceNumber}</p>
    <p>Company Name: ${body.companyName}</p>
    <p>Company Street Address: ${body.companyStreetAddress}</p>
    <p>Company City Address: ${body.companyCityAddress}</p>
    <p>Company Email: ${body.companyEmail}</p>
    <p>Client Name: ${body.clientName}</p>
    <p>Client Street Address: ${body.clientStreetAddress}</p>
    <p>Client City Address: ${body.clientCityAddress}</p>
    <p>Client Email: ${body.clientEmail}</p>
    <p>Date Created: ${body.dateCreated}</p>
    <p>Due Date: ${body.dueDate}</p>
    <p>Paid Status: ${body.paidStatusText}</p>
    <p>User ID: ${body.user_id}</p>
    <p>Invoice Details: ${body.invoice_details}</p>
      <!-- Add more invoice details here as needed -->
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
