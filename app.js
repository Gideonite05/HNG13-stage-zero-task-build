
import express from 'express';
import https from 'https'
import { resolve } from 'path';

const app = express();
const PORT = process.env.PORT || 3000

// Middleware for JSON parsing
app.use(express.json());

// GET /me endpoint
app.get('/me', async (req, res) => {

    try {
        const timestamp = newDate().toISOString();

            // Fetch cat fact using https module
            let fact = 'No cat fact available'; // Fallback in case of failure
            await new Promise((resolve, reject) => {
                https.get("https://catfact.ninja/fact", { timeout: 5000 }, (apiRes) => {

                    let data = "";
                    apiRes.on('data', (chunk) => { data += chunk; });
                    apiRes.on('end', () => {
                        try{
                            const parsedData = JSON.parse(data);
                            fact = parsedData.fact;
                            resolve();
                        } catch (parseErr) {
                            console.error('Error cat fact parsing:', parseErr);
                            resolve();
                        }
                    });
                }).on('error', (err) => {
                console.error('Error capture:', err.message);

                resolve(); // this use fallback on error
            });
        });

     // Profile data
     const responseData = {
        status: 'success',
      user: {
        email: 'gideonokunogbe@gmail.com',
        name: 'Gideon Oluwatumininu Okunogbe',
        stack: 'Node.js/Express'
        },
        timestamp: timestamp,
        fact: fact
     };

     //Logging for debugging
     console.log(`Request to /me at ${timestamp} - Fasct: ${fact}`);

     res.setHeader('Content-Type', 'application/json');
     res.status(200).json(responseData);
    } catch (err) {
        console.error('Server got error:', err);
        res.status(500).json({ status:'error', message: 'Internal server error'}); 
    }
});


// Start the running of the server
app.listen(PORT, ()=> {
    console.log(`Access API server running at: http://localhost:${PORT}`);
});


