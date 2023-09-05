const Customer = require('../models/Customer')

/* Reusable Sort Fxn*/
const generateSort = (sort) => {
  const sortParsed = JSON.parse(sort)
  const sortFormatted = {
    [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
  }

  return sortFormatted
}

const getAllCustomers = async (req, res) => {
  /* Req Params Default  */
  const { page = 0, pageSize = 20, sort = null, search = "" } = req.query

  /* formatted sort should look like { userId: -1 } */
  const sortFormatted = Boolean(sort) ? generateSort(sort) : {}

  /* Get Customers from MongoDB */
  const customers = await Customer.find({
    $or: [
      { firstName: { $regex: new RegExp(search, "i") } },
      { lastName: { $regex: new RegExp(search, "i") } },
      { email: { $regex: new RegExp(search, "i") } },
      { company: { $regex: new RegExp(search, "i") } },
      { phone: { $regex: new RegExp(search, "i") } }
    ],
  })
    .sort(sortFormatted)
    .skip(page * pageSize)
    .limit(pageSize)
    .select(['-password','-__v']).lean()

  /* If no Customers */
  if (!customers?.length) {
    return res.status(400).json({ message: 'No customers found' })
  }

  const total = await Customer.countDocuments({
    firstName: { $regex: search, $options: "i" },
    lastName: { $regex: search, $options: "i" }
  })

  res.status(200).json({
    count: customers.length,
    customers,
    total,
  })
}

const getActiveCustomers = async (req, res) => {
  /* Req Params Default  */
  const { page = 1, pageSize = 20, sort = null, search = "" } = req.query

  /* formatted sort should look like { userId: -1 } */
  const sortFormatted = Boolean(sort) ? generateSort(sort) : {}

  /* Get Active Customers from MongoDB */
  const customers = await Customer.find({ 
    active: true,
    $or: [
      { firstName: { $regex: new RegExp(search, "i") } },
      { lastName: { $regex: new RegExp(search, "i") } },
      { email: { $regex: new RegExp(search, "i") } },
      { company: { $regex: new RegExp(search, "i") } },
      { phone: { $regex: new RegExp(search, "i") } }
    ],
  })
    .sort(sortFormatted)
    .skip(page * pageSize)
    .limit(pageSize)
    .select(['-password','-__v']).lean()

  /* If no Customers */
  if (!customers?.length) {
    return res.status(400).json({ message: 'No customers found' })
  }

  const total = await Customer.countDocuments({
    active:true,
    firstName: { $regex: search, $options: "i" },
    lastName: { $regex: search, $options: "i" }
  })

  res.status(200).json({
    count: customers.length,
    customers,
    total,
  })
}

const getMemberCustomers = async (req, res) => {
  /* Req Params Default  */
  const { page = 0, pageSize = 20, sort = null, search = "" } = req.query

  /* formatted sort should look like { userId: -1 } */
  const sortFormatted = Boolean(sort) ? generateSort(sort) : {}

  /* Get Member Customers from MongoDB */
  const customers = await Customer.find({ 
    roles: "member",
    $or: [
      { firstName: { $regex: new RegExp(search, "i") } },
      { lastName: { $regex: new RegExp(search, "i") } },
      { email: { $regex: new RegExp(search, "i") } },
      { company: { $regex: new RegExp(search, "i") } },
      { phone: { $regex: new RegExp(search, "i") } }
    ],
  })
    .sort(sortFormatted)
    .skip(page * pageSize)
    .limit(pageSize)
    .select(['-password','-__v']).lean()

  /* If no Customers */
  if (!customers?.length) {
    return res.status(400).json({ message: 'No customers found' })
  }

  const total = await Customer.countDocuments({
    roles: "member",
    firstName: { $regex: search, $options: "i" },
    lastName: { $regex: search, $options: "i" }
  })

  res.status(200).json({
    count: customers.length,
    customers,
    total,
  })
}

module.exports = {
  getAllCustomers,
  getActiveCustomers,
  getMemberCustomers
}