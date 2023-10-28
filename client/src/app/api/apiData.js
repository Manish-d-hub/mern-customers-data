import axios from "axios";

const baseUrl = "http://localhost:3001/api/v1/app";

// Fetching customer data from API
export const getCustomers = async () => {
  try {
    const customers = await axios.get(`${baseUrl}/customers`);
    return customers.data.data;
  } catch (error) {
    console.error("Error fetching customers", error);
  }
};

// Fetching transaction data from API
export const getAccTransactions = async (accountId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/acc-transactions?accountId=${accountId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching transactions: ", error);
  }
};
