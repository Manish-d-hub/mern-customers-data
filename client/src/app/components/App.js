"use client";

import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { getCustomers } from "../api/apiData";
import Popup from "./popup";
import { useUserAuth } from "./auth/auth";
import Table from "./table";

import "../styles/login.css";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showPopup, setShowPopup] = useState(null);
  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getCustomers().then((response) => setCustomers(response));
  }, []);

  const handleAccountClick = (accountId) => {
    setSelectedAccount(accountId);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Address", accessor: "address" },
      {
        Header: "Accounts",
        accessor: "accounts",
        Cell: ({ row }) => {
          const accountNumbers = row.original.accounts.map(
            (accountNumber, index) => (
              <span
                key={index}
                onClick={() => handleAccountClick(accountNumber)}
                className="account-link"
              >
                {accountNumber}
              </span>
            )
          );
          return <div>{accountNumbers}</div>;
        },
      },
    ],
    [selectedAccount]
  );

  return (
    <>
      {customers.length > 0 && <Table columns={columns} data={customers} />}
      {showPopup === true && (
        <Popup selectedAccount={selectedAccount} onClose={handleClosePopup} />
      )}

      <div className="p-4 box">
        <div className="d-grid gap-2">
          <Button variant="primary" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </>
  );
};

export default App;
