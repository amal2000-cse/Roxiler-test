const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require('axios')

dotenv.config();

const PORT = process.env.PORT || 3000;
const URL = process.env.URL;
const app = express();

app.use(express.json());
app.use(cors());

//FILTER BASED ON MONTH

app.get("/statistics/:month", async (req, res) => {
    //:month format : 1
  const { month } = req.params;
  try {
    const reponse = await fetch(URL);
    const data = await reponse.json();
    // const response = await axios.get(URL); // Use Axios to fetch data
    // const data = response.data; // Extract data from Axios response
    console.log(data)
    //filter data by selected month
    const filteredData = data.filter(item => {
        const saleDate = new Date(item.dateOfSale);
        const saleMonth = saleDate.getMonth() + 1; // Months are 0 indexed in JavaScript, so we add 1
        // console.log(saleMonth)

        return saleMonth === parseInt(month);
    });

    // console.log(filteredData);
    res.send(filteredData);

    

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
