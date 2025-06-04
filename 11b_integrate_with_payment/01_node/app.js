import express from 'express';
import Stripe from 'stripe';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 8081;

app.get("/", (req, res) => {
    res.send({data: "root route"});
});

app.use(express.static("public"));

app.listen(PORT, () => { console.log("server is running on port", PORT) }); 




// Setup
const stripe = new Stripe('sk_test_YOUR_SECRET_KEY'); // Replace with your secret key
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'T-Shirt' },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/success.html`,
      cancel_url: `${req.headers.origin}/cancel.html`,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => console.log('Server running at http://localhost:'+PORT));
