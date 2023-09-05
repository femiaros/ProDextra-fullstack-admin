const Transaction = require('../models/Transaction')
const Customer = require('../models/Customer')

const getTransactions = async (req, res) => {
    /* Get Transactions from MongoDB */
    const transactions = await Transaction.find().sort({ closedAt: -1 }).select('-__v').lean()

    /* If no Transactions */
    if (!transactions?.length) {
        return res.status(400).json({ message: 'No transactions found' })
    }

    const transactionsWithCustomer = await Promise.all(transactions.map(async (transaction) => {
        const customer = await Customer.findById(transaction.customerId).lean().exec()
        return { ...transaction, customerName: `${customer.firstName} ${customer.lastName}`, customerImage: customer.avatar}
    }))

    res.status(200).json({
      transactions: transactionsWithCustomer
    })
}

module.exports = {
  getTransactions
}