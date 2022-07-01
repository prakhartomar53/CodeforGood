const ApplicationSchema = require("../models/Application/application.model");
const crypto = require("crypto");
const ipfs = require("ipfs-http-client");
const client = ipfs.create("https://ipfs.infura.io:5001/api/v0");

exports.AddReport = async (req, res, next) => {
  if (req.file) {
    const algorithm = "aes-256-cbc";
    const secretKey = process.env.HASH + process.env.HASH;
    const iv = "5183666c72eec9e4";
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    console.log(req.file.buffer);
    const crypted = Buffer.concat([
      cipher.update(req.file.buffer),
      cipher.final(),
    ]);
    console.log(crypto.createHash("sha256").update(crypted).digest("hex"));
    console.log(crypted.length);
    const data = await client.add(crypted);
    let hash = data.path;

    console.log(hash);
    const body = {
      ...req.body,
      metadata: {
        hash,
        secretKey,
      },
    };
    await ApplicationSchema.create(body);
    return res.status(200).json({
      success: true,
      message: "Application submitted!",
    });
  } else {
    return res.status(500).json({
      success: false,
      error: "No file attached",
    });
  }
};

exports.GetApplicationDetails = async (req, res, next) => {
  try {
    const { application } = req.query;
    const details = await ApplicationSchema.findById(application);

    const algorithm = "aes-256-cbc";
    const iv = "5183666c72eec9e4";
    const hash = details.metadata.hash;
    const secretKey = details.metadata.secretKey;
    const recData = await client.cat(hash);
    var data = new Uint8Array();
    for await (const item of recData) {
      prevData = data;
      data = new Uint8Array(data.length + item.length);
      data.set(prevData);
      data.set(item, prevData.length);
    }
    console.log(crypto.createHash("sha256").update(data).digest("hex"));
    console.log(data.length);
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decData = decipher.update(data);
    decData = Buffer.concat([decData, decipher.final()]);
    return res.status(200).json({
      success: true,
      details,
      data: decData.toString("base64"),
    });
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.RejectApplication = async (req, res) => {
  try {
    const { application } = req.body;
    const details = await ApplicationSchema.findOne({
      _id: application,
      status: "ONGOING",
    });
    if (!details)
      return res.status(400).json({
        success: false,
        message: "Application not found",
      });
    details.status = "REJECTED";
    await details.save();
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("ERROR");
    console.log(err);
  }
};

exports.AcceptApplication = async (req, res) => {
  try {
    const { application } = req.body;
    const details = await ApplicationSchema.findOne({
      _id: application,
      status: "ONGOING",
    });
    if (!details)
      return res.status(400).json({
        success: false,
        message: "Application not found",
      });
    details.status = "ACCEPTED";
    await details.save();
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("ERROR");
    console.log(err);
  }
};

exports.GetAllApplicationsForRole = async (req, res) => {
  try {
    const role = req.query;
    const applications = await ApplicationSchema.find({ role });
    return res.status(200).json(applications);
  } catch (er) {
    console.log(er);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.GetAllApplications = async (req, res) => {
  try {
    const applications = await ApplicationSchema.find({});
    const result = [];
    for (let details of applications) {
      const algorithm = "aes-256-cbc";
      const iv = "5183666c72eec9e4";
      const hash = details.metadata.hash;
      const secretKey = details.metadata.secretKey;
      const recData = await client.cat(hash);
      var data = new Uint8Array();
      for await (const item of recData) {
        prevData = data;
        data = new Uint8Array(data.length + item.length);
        data.set(prevData);
        data.set(item, prevData.length);
      }
      console.log(crypto.createHash("sha256").update(data).digest("hex"));
      console.log(data.length);
      const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
      let decData = decipher.update(data);
      decData = Buffer.concat([decData, decipher.final()]);
      result.push({ image: decData.toString("base64"), ...details._doc });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
