
import express, { response } from 'express';
import https from 'https'
import { resolve } from 'path';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000

// fetchData function
function fetchData() {
    //This will generate fresh timestamp for each request
    const API_URL = 'https://catfact.ninja/fact';
    const timestamp = new Date().toISOString();
    const HEADERS = {
        'Content-Type': 'application/json',
        'X-Timestamp': timestamp,
    };

    return axios.get(API_URL, {headers:HEADERS})
        .then (response => {
            if (response.status === 200) {
                console.log ('success - status: 200');
                console.log('Data:', response.data);
                return response.data; 
                } else {
                    console.error('invalid status:', response.status);
                    return Promise.reject(new Error('Unexpected status: ${response.status}'));
                }
            })
            .catch(error => {
                if (error.response) {
        console.error('Error Status:', error.response.status);
        console.error('Error Data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request error:', error.message);
      }
      return Promise.reject(error);  // Propagate error
    });
}

// Middleware for JSON parsing
app.use(express.json());

app.post('json-data', (req,res) => {
    console.log(req.body);
    const { status, userEmail, userName, userStack} = req.body;
})

// Optional: Add CORS headers if testing from frontend (uncomment if needed)
app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// GET /me endpoint
app.get('/me', async (req, res) => {

    try {
        const timestamp = new Date().toISOString();


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
        Email: 'gideonokunogbe@gmail.com',
        Name: 'Gideon Oluwatumininu Okunogbe',
        Stack: 'Node.js/Express'
        },
        timestamp: timestamp,
        fact: fact
     };

     //Logging for debugging
     console.log(`Request to /me at ${timestamp} - fact: ${fact}`);

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


// Run the fetch (using .then for chaining)
fetchData()
  .then(data => {
    // Handle successful data here if needed
    console.log('Fetched data processed:', data);
  })
  .catch(err => {
    // Handle any errors
    console.error('Fetch failed:', err);
  });