const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Purchase = require("../models/purchaseModel");
const mongoose = require("mongoose");
const excelJS = require("exceljs");

const getPurchases = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }

  const { sort, pageSize, page, order } = req.query;

  const count = await Purchase.countDocuments({ user: req.user.id });
  const total = await Purchase.aggregate([
    { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
    { $group: { _id: null, total: { $sum: "$value" } } },
  ]);
  const prices = total[0]?.total;
  const purchases = await Purchase.find({ user: req.user.id })
    .sort({ [sort]: order })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  res.status(200).json({
    purchases,
    count,
    total: prices,
  });
});

const getAllPurchases = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  const { sort, pageSize, page, order } = req.query;
  const today = new Date();
  const year = today.getFullYear();
  const count = await Purchase.countDocuments();
  const total = await Purchase.aggregate([
    {
      $match: {
        date: {
          $gt: new Date(`${year}-01-01`).toISOString(),
          $lte: new Date(`${year}-12-31`).toISOString(),
        },
      },
    },
    { $group: { _id: null, total: { $sum: "$value" } } },
  ]);
  const prices = total[0].total;
  const purchases = await Purchase.find()
    .sort({ [sort]: order })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  res.status(200).json({
    purchases,
    count,
    total: prices,
  });
});

const giveReport = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  const { type, sort, date } = req.query;

  const sortArray = sort.split(",");
  const sortText = sortArray[0];
  const sortOrder = sortArray[1];
  let purchases, total;

  if (date !== "all" || type !== "all") {
    total = await Purchase.aggregate([
      {
        $match: {
          $and: [
            {
              date: {
                $gt: new Date(`${date}-01-01`).toISOString(),
                $lte: new Date(`${date}-12-31`).toISOString(),
              },
            },
            { status: `${type}` },
          ],
        },
      },
      { $group: { _id: null, total: { $sum: "$value" } } },
    ]);

    purchases = await Purchase.find(
      {
        $and: [
          {
            date: {
              $gt: new Date(`${date}-01-01`).toISOString(),
              $lte: new Date(`${date}-12-31`).toISOString(),
            },
          },
          { status: `${type}` },
        ],
      },
      {
        title: 1,
        status: 1,
        value: 1,
        _id: 0,
        date: 1,
      }
    ).sort({ [sortText]: sortOrder });
  }

  if (date === "all" && type !== "all") {
    total = await Purchase.aggregate([
      {
        $match: {
          status: `${type}`,
        },
      },
      { $group: { _id: null, total: { $sum: "$value" } } },
    ]);

    purchases = await Purchase.find(
      {
        status: `${type}`,
      },
      {
        title: 1,
        status: 1,
        value: 1,
        _id: 0,
        date: 1,
      }
    ).sort({ [sortText]: sortOrder });
  }

  if (type === "all" && date !== "all") {
    total = await Purchase.aggregate([
      {
        $match: {
          date: {
            $gt: new Date(`${date}-01-01`).toISOString(),
            $lte: new Date(`${date}-12-31`).toISOString(),
          },
        },
      },
      { $group: { _id: null, total: { $sum: "$value" } } },
    ]);

    purchases = await Purchase.find(
      {
        date: {
          $gt: new Date(`${date}-01-01`).toISOString(),
          $lte: new Date(`${date}-12-31`).toISOString(),
        },
      },

      {
        title: 1,
        status: 1,
        value: 1,
        _id: 0,
        date: 1,
      }
    ).sort({ [sortText]: sortOrder });
  }

  if (type === "all" && date === "all") {
    total = await Purchase.aggregate([
      { $group: { _id: null, total: { $sum: "$value" } } },
    ]);

    purchases = await Purchase.find(
      {},

      {
        title: 1,
        status: 1,
        value: 1,
        _id: 0,
        date: 1,
      }
    ).sort({ [sortText]: sortOrder });
  }

  const formatPurchases = purchases.map((purchase, index) => {
    let formatPurchase = purchase._doc;
    let dateArray = purchase.date.split("-");
    return {
      rbr: index + 1,
      ...formatPurchase,
      date: dateArray[2] + "." + dateArray[1] + "." + dateArray[0],
    };
  });

  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet("извјештај");
  worksheet.getCell(`A1`).value = `Извјештај ${
    date === "all" ? `свих набавки` : `за ${date} годину`
  } `;
  worksheet.mergeCells("A1:E1"); // Extend cell over all column headers
  worksheet.getCell(`A1`).alignment = { horizontal: "center" }; // Horizontally center your text

  worksheet.getRow(3).values = [
    "Редни број",
    "Наслов",
    "Статус",
    "Датум",
    "Вриједност",
  ];

  // Path to download excel
  // Column for data in excel. key must match data key
  worksheet.columns = [
    { key: "rbr", width: 14 },
    { key: "title", width: 30 },
    { key: "status", width: 15 },
    { key: "date", width: 30 },
    { key: "value", width: 15 },
  ];

  // Looping through purchase data
  formatPurchases.forEach((purchase) => {
    worksheet.addRow(purchase); // Add data in worksheet
  });
  worksheet.addRow();
  worksheet.addRow().values = [
    "",
    "",
    "",
    "Укупна вриједност набавки:",
    total[0].total,
  ];
  // Making first line in excel bold
  worksheet.getRow(3).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "Report.xlsx"
    );
    workbook.xlsx.write(res).then(function (data) {
      res.end();
    });
  } catch (err) {
    res.send({
      status: err,
      message: "Something went wrong",
    });
  }
});

const getPurchase = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(401);
    throw new Error("Набавка није пронађена");
  }

  const purchase = await Purchase.findById(req.params.id);
  if (!purchase) {
    res.status(404);
    throw new Error("Набавка није пронађена");
  }
  if (!user.isAdmin && purchase.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Нисте ауторизовани");
  }
  res.status(200).json(purchase);
});

const createPurchase = asyncHandler(async (req, res) => {
  const { date, title, status, description, value } = req.body;

  if (!title || !description || !status || !value || !date) {
    res.status(400);
    throw new Error("Молим Вас унесите назив набавке и опис исте");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  const purchase = await Purchase.create({
    title,
    description,
    user: req.user.id,
    status,
    value,
    date,
  });
  res.status(201).json(purchase);
});

const deletePurchase = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(401);
    throw new Error("Набавка није пронађена");
  }
  const purchase = await Purchase.findById(req.params.id);
  if (!purchase) {
    res.status(404);
    throw new Error("Набавка није пронађена");
  }
  if (purchase.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Нисте ауторизовани");
  }
  try {
    await Purchase.deleteOne({ _id: req.params.id });
  } catch (error) {
    throw new Error(error);
  }

  res.status(200).json({ success: true });
});

const updatePurchase = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  const purchase = await Purchase.findById(req.params.id);
  if (!purchase) {
    res.status(404);
    throw new Error("Набавка није пронађена");
  }
  if (purchase.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Нисте ауторизовани");
  }

  const updatedPurchase = await Purchase.findByIdAndUpdate(
    req.params.id,
    req.body,

    { new: true }
  );
  res.status(200).json(updatedPurchase);
});

const getDates = asyncHandler(async (req, res) => {
  const { type } = req.query;
  let purchases;
  function removeDuplicates(arr) {
    return arr?.filter((item, index) => arr?.indexOf(item) === index);
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  if (type === "all") {
    purchases = await Purchase.find(
      {},
      {
        date: 1,
      }
    );
  } else {
    purchases = await Purchase.find(
      { status: `${type}` },
      {
        date: 1,
      }
    );
  }

  let dates = purchases?.map((item) => {
    return item.date;
  });
  dates = dates?.map((date) => {
    const ymh = date.split("-");
    return parseInt(ymh[0]);
  });
  dates = removeDuplicates(dates);

  res.status(200).json(dates || []);
});

module.exports = {
  giveReport,
  getPurchase,
  getPurchases,
  createPurchase,
  getPurchase,
  deletePurchase,
  updatePurchase,
  getAllPurchases,
  getDates,
};
