import db from "../../connection/dbmaster.js";

const CustomerModel = db.collection("customers");
const AccountsModel = db.collection("accounts");
const TransactionModel = db.collection("transactions");

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await CustomerModel.aggregate([
      { $match: { active: true } },
      { $project: { name: 1, address: 1, accounts: 1 } },
    ]).toArray();

    res.status(200).send({
      status: "success",
      data: customers,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

export const getAccTransactions = async (req, res) => {
  try {
    const { accountId } = req.query;
    const response = await TransactionModel.findOne({
      account_id: +accountId,
    });
    const dataObj = response.transactions;
    res.status(200).send({
      status: "success",
      data: dataObj,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

export const getAccIds = async (req, res) => {
  try {
    // Query to list down account ids having at least one transaction below the amount 5000
    const response = await TransactionModel.aggregate([
      { $match: { "transactions.amount": { $lt: 5000 } } },
      { $project: { account_id: 1 } },
    ]).toArray();
    res.status(200).send({
      status: "success",
      total: response.length,
      data: response,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // Query to list down distinct list of products available in the system
    const response = await AccountsModel.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: null,
          products: { $addToSet: "$products" },
        },
      },
    ]).toArray();

    res.status(200).send({
      status: "success",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error,
    });
  }
};
