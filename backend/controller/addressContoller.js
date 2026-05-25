import User from "../models/userModel.js";

// ================= GET ADDRESSES =================

export const getUserAddresses = async (
  req,
  res
) => {

  try {

    const { userId } = req.params;

    const user =
      await User.findById(userId);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    res.json({
      success: true,
      addresses:
        user.addresses || [],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch addresses",
    });

  }

};

// ================= ADD ADDRESS =================

export const addUserAddress = async (
  req,
  res
) => {

  try {

    const { userId } = req.params;

    const {
      name,
      house,
      area,
      city,
      pin,
      isDefault,
    } = req.body;

    const user =
      await User.findById(userId);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    const newAddress = {
      name,
      house,
      area,
      city,
      pin,
      isDefault:
        isDefault || false,
    };

    user.addresses.push(
      newAddress
    );

    await user.save();

    res.json({
      success: true,
      message:
        "Address added successfully",
      addresses:
        user.addresses,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to add address",
    });

  }

};