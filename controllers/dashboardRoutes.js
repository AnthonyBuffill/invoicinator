const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const withAuth = require('../utils/auth')
// GET route for the dashboard
router.get('/', withAuth, async (req, res) => {
    try {
      

        // Fetch invoices from the database for the loggedin user
        const invoices = await Invoice.findAll({ where: { user_id: req.session.user_id } });

        // Render the dashboard view with the fetched invoices
        res.render('dashboard', { invoices });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.json(error)
    }
});

// POST, marking an invoice as paid
router.post('/dashboard/invoices/:id/mark-paid', withAuth, async (req, res) => {
    try {
        // Check if user is logged in (you can define your own logic here)
     

        // Find the invoice by ID
        const invoice = await Invoice.findByPk(req.params.id);

        // Update the invoice status to 'paid'
        await invoice.update({ status: 'paid' });

        // Redirect back to the dashboard
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error marking invoice as paid:', error);
        res.json(error)
    }
});

// PUT, update an existing invoice
router.put('/dashboard/invoices/:id/update', withAuth, async (req, res) => {
    try {
       

        // Find the invoice by ID
        const invoice = await Invoice.findByPk(req.params.id);

        // Update the invoice with the new data
        await invoice.update(req.body);

        // Redirect back to the dashboard
        res.redirect('/dashboard');
    } catch (error) {
        console.error();
        res.json(error)
    }
});

// DELETE, invoice
router.delete('/dashboard/invoices/:id/delete', withAuth, async (req, res) => {
    try {
       

        // Find the invoice by ID and delete it
        await Invoice.destroy({ where: { id: req.params.id } });

        // Redirect back to the dashboard
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error deleting invoice:', error);
        res.json(error)
    }
});

module.exports = router;  