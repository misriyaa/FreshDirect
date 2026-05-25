import User from "../models/userModel.js";

// GET USER CART
export const getCart = async (req, res) => {

  try {

    const user = await User.findById(
      req.params.userId
    );

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    res.json({
      success: true,
      cart: user.cart || [],
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// SAVE CART
export const saveCart = async (req, res) => {

  try {

    const { cart } = req.body;

    const user =
      await User.findByIdAndUpdate(
        req.params.userId,
        { cart },
        {
          returnDocument: "after",
        }
      );

    res.json({
      success: true,
      cart: user.cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};