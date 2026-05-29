const {
  generateClientInsights,
} = require("../ai/ai.service");

const generateInsights = async (
  req,
  res,
  next
) => {
  try {
    const { clientName, notes } = req.body;

    const insights =
      await generateClientInsights(
        clientName,
        notes
      );

    res.status(200).json({
      success: true,
      insights,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateInsights,
};