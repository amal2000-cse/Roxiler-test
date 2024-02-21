import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Graphcomponent from "./components/Graphcomponent";


function App() {
  const [month, setMonth] = useState();
  const [transactions, settransactions] = useState([]);

  // console.log(statistics);
  function getMonthName(month) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[parseInt(month) - 1];
  }

  //API call based on month
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/statistics/${month}`
        );
        settransactions(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    if (month) {
      fetchData();
    }
  }, [month]);

  // Calculate statistics
  const totalSaleAmount = transactions.reduce((total, item) => {
    return item.sold ? total + item.price : total;
  }, 0);
  const totalSoldItems = transactions.reduce((total, item) => {
    return item.sold ? total + 1 : total;
  }, 0);
  const totalUnsoldItems = transactions.length - totalSoldItems;

  // console.log(totalSaleAmount,totalSoldItems,totalUnsoldItems)

  return (
    <>
      <div>
        <div className="heading">
          <h1>Transaction Dashboard</h1>
        </div>

        <div className="selector-section">
          <div className="select-search">
            <input type="text" placeholder="Search.." />
          </div>

          <div className="select-month">
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="">Select Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
        </div>

        {/* TABLE SECTION */}

        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Sold</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.sold ? "Sold" : "Not Sold"}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: "100px" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* STATISTICS SECTION */}
        <div className="statistics-table">
          {<h2>Statistics - {getMonthName(month)}</h2>}
          <table>
            <thead>
              <tr>
                <th>Total Sale Amount</th>
                <th>Total Sold Items</th>
                <th>Total Unsold Items</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${totalSaleAmount.toFixed(2)}</td>
                <td>{totalSoldItems}</td>
                <td>{totalUnsoldItems}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* <Graphcomponent month={month} /> */}
    </>
  );
}

export default App;
