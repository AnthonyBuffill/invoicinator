const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');

// GET route for the dashboard
router.get('/dashboard', async (req, res) => {
    try {
        // Check if user is logged in 
        if (!req.user) {
            // Redirect to login page or handle unauthorized access
            return res.redirect('/login');
        }

        // Fetch invoices from the database for the loggedin user
        const invoices = await Invoice.findAll({ where: { userId: req.user.id } });

        // Render the dashboard view with the fetched invoices
        res.render('dashboard', { user: req.user, invoices });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.render('error', { error });
    }
});

// POST, marking an invoice as paid
router.post('/dashboard/invoices/:id/mark-paid', async (req, res) => {
    try {
        // Check if user is logged in (you can define your own logic here)
        if (!req.user) {
            // Redirect to login page or handle unauthorized access
            return res.redirect('/login');
        }

        // Find the invoice by ID
        const invoice = await Invoice.findByPk(req.params.id);

        // Update the invoice status to 'paid'
        await invoice.update({ status: 'paid' });

        // Redirect back to the dashboard
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error marking invoice as paid:', error);
        res.render('error', { error });
    }
});

// PUT, update an existing invoice
router.put('/dashboard/invoices/:id/update', async (req, res) => {
    try {
        // Check if user is logged in 
        if (!req.user) {
            // Redirect to login page or handle unauthorized access
            return res.redirect('/login');
        }

        // Find the invoice by ID
        const invoice = await Invoice.findByPk(req.params.id);

        // Update the invoice with the new data
        await invoice.update(req.body);

        // Redirect back to the dashboard
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error updating invoice:', error);
        res.render('error', { error });
    }
});

// DELETE, invoice
router.delete('/dashboard/invoices/:id/delete', async (req, res) => {
    try {
        // Check if user is logged in
        if (!req.user) {
            // Redirect to login page or handle unauthorized access
            return res.redirect('/login');
        }

        // Find the invoice by ID and delete it
        await Invoice.destroy({ where: { id: req.params.id } });

        // Redirect back to the dashboard
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error deleting invoice:', error);
        res.render('error', { error });
    }
});

module.exports = router;