const express = require("express");
const router = express.Router();
const Device = require("../../Models/Device");
const DeviceType = require("../../Models/DeviceType");

let devices = [];

router.get("/", (req, res) => {
  Device.find({})
    .populate("description")
    .exec(function (err, device) {
      if (err) return handleError(err);
      devices = device;
    });
  res.json(devices);
  // console.log(devices);
});

router.post("/add", async (req, res) => {
  console.log(req.body);

  const dtype = req.body.option;

  const retrievedDevice = await DeviceType.findOne({ type: dtype });
  console.log(retrievedDevice);
  const device = new Device({
    ...req.body,
    description: retrievedDevice._id,
    status: false,
  });

  res.json(retrievedDevice);

  await device.save();
});

// for device Type
// router.post("/add", async (req, res) => {
//   console.log(req.body);

//   const device = new DeviceType(req.body);

//   await device.save();

//   // await device.save();
// });

module.exports = router;
