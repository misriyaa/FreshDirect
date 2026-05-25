// controllers/orderController.js
import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrders = async (
  req,
  res
) => {

  try {

    const { email } = req.query;

    const orders =
      await Order.find({
        userEmail: email,
      }).sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      orders,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};