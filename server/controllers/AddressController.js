import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipCode', 'country', 'phone'];
    for (let field of requiredFields) {
      if (!address[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    await Address.create({
      ...address,
      userId
    });

    res.status(200).json({
      success: true,
      message: 'Address added successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
}


export const getAddress = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ success: false, message: 'userId is required' });

    const addresses = await Address.find({ userId });
    res.status(200).json({
      success: true,
      addresses
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


