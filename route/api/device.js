const express = require("express");

const router = express.Router();
const Device = require("../../Models/Device");
const DeviceType = require("../../Models/DeviceType");

const changeStream = Device.watch().on("change", (change) =>
  console.log(change.operationType)
);

router.get("/", (req, res, next) => {
  Device.find({}, { _id: 0, __v: 0 })
    .populate("description")
    .exec(function (err, device) {
      if (err) return handleError(err);
      req.encryptUserData = device;
      next();
    });
});

router.post("/add", async (req, res, next) => {
  console.log(req.body);

  const deviceType = req.body.option;

  const retrievedDevice = await DeviceType.findOne({ type: deviceType });

  const device = new Device({
    ...req.body,
    description: retrievedDevice._id,
    status: false,
  });
  await device.save();

  console.log(retrievedDevice)
  req.encryptUserData = retrievedDevice;
  next();
  // res.json(retrievedDevice);
});

router.post("/remove", async (req, res) => {
  const deviceID = req.body.deviceID;
  await Device.findOneAndDelete({ deviceID: deviceID }).exec(function (
    err,
    device
  ) {
    if (err) console.log(err);
    else res.send("Device Removed...");
  });
});

// for device Type

// router.post("/addDevice", async (req, res) => {
//   console.log(req);

//   const device = new DeviceType(req.body);

//   await device.save();
// });

module.exports = router;
