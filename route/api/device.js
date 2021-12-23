const express = require("express");
const router = express.Router();
const Device = require("../../Models/Device");
const DeviceType = require("../../Models/DeviceType");

router.get("/", (req, res, next) => {
  Device.find({}, { _id: 0 })
    .populate("description")
    .exec(function (err, device) {
      if (err) return handleError(err);
      req.encryptUserData = device;
      next();
    });
});

router.post("/add", async (req, res) => {
  const deviceType = req.body.option;

  const retrievedDevice = await DeviceType.findOne({ type: deviceType });

  const device = new Device({
    ...req.body,
    description: retrievedDevice._id,
    status: false,
  });

  res.json(retrievedDevice);

  await device.save();
});

// for device Type

// router.post("/addDevice", async (req, res) => {
//   console.log(req);

//   const device = new DeviceType(req.body);

//   await device.save();
// });

module.exports = router;
