const express = require('express');
const router = express.Router();
const { Invoice, User } = require('../../models');
const Mailjet = require('node-mailjet');
const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE
});

// Route to create a new invoice
router.post('/', async (req, res) => {
  try {
    // Create a new invoice
    const newInvoice = await Invoice.create(req.body);

   
    const companyUser = await User.findByPk(req.session.user_id);
    if (!companyUser) {
        console.error('User not found');
        // Handle the case where user is not found, e.g., return an error response
        return res.status(404).json({ error: 'User not found' });
    }
    
    // Now that we've ensured companyUser is not null, access its properties
    const companyEmail = companyUser.email;
    const companyName = companyUser.name;
    

    
    const clientEmail = req.body.clientEmail;
    const clientName = req.body.clientName;

    // Construct the HTML content of the email
    const invoiceHtml = `
    <h2>New Invoice Created</h2>
    <p>Invoice Amount: $${this.invoiceAmount}</p>
    <p>Invoice Number: ${this.invoiceNumber}</p>
    <p>Company Name: ${this.companyName}</p>
    <p>Company Street Address: ${this.companyStreetAddress}</p>
    <p>Company City Address: ${this.companyCityAddress}</p>
    <p>Company Email: ${this.companyEmail}</p>
    <p>Client Name: ${this.clientName}</p>
    <p>Client Street Address: ${this.clientStreetAddress}</p>
    <p>Client City Address: ${this.clientCityAddress}</p>
    <p>Client Email: ${this.clientEmail}</p>
    <p>Date Created: ${this.dateCreated}</p>
    <p>Due Date: ${this.dueDate}</p>
    <p>Paid Status: ${paidStatusText}</p>
    <p>User ID: ${this.user_id}</p>
    <p>Invoice Details: ${this.invoice_details}</p>
      <!-- Add more invoice details here as needed -->
    `;

    // Send email using Mailjet
    const request = mailjet.post('send', { version: 'v3.1' }).request({
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

    
    await request;

    
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
