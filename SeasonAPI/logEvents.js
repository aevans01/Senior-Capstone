//this used for node date formats:
const { format } = require("date-fns");
//used to create unique ID's here:
const { v4: uuid } = require("uuid");

//require file system basically:
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

//keeping this here for now, but not being called
const { contentDisposition } = require("express/lib/utils");

//just creates a quick const with the data sent from app.js (which is whatever you wanted to put in a log.txt file),
// then also takes the location of where you want to send the data (logName),
// adds on the date and the unique ID to this data, and puts it in the required log.txt file.
//if the file doesn't exist, it will be created!!
const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyy/MM/dd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(path.join(__dirname, "logs", logName), logItem);
  } catch (err) {
    console.log(err);
  }
};

module.exports = logEvents;
