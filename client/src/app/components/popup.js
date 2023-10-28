"use client";

import React, { useEffect, useState } from "react";
import { getAccTransactions } from "../api/apiData";
import "../styles/popup.css";

const Popup = ({ selectedAccount, onClose }) => {
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  useEffect(() => {
    getAccTransactions(selectedAccount).then((response) =>
      setSelectedTransactions(response)
    );
  }, []);

  return (
    <>
      {selectedTransactions.length > 0 && (
        <div className="popup-container">
          <div className="popup-content">
            <h2>Transactions</h2>
            <button onClick={onClose}>❌</button>

            <ul className="transactions-list">
              {selectedTransactions.map((transaction, index) => (
                <li key={index}>
                  <b>
                    {transaction.amount} {transaction.transaction_code}
                  </b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
