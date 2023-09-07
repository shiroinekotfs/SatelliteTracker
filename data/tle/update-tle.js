#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const process = require("process");

// Change dir to the location of this script
process.chdir(__dirname);

function downloadTLE(groupName) {
  const url = `https://celestrak.org/NORAD/elements/gp.php?GROUP=${groupName}&FORMAT=tle`;
  const path = "groups/";
  const filename = `${groupName}.txt`;

  https.get(url, (res) => {
    const writeStream = fs.createWriteStream(path + filename);
    res.pipe(writeStream);
    writeStream.on("finish", () => {
      writeStream.close();
      console.log(`Downloaded ${filename}`);
    });
  });
}

// https://celestrak.org/NORAD/elements/
// [...document.links].filter((link) => link.href.match(/gp.php\?GROUP=/)).map((link => link.href.match(/GROUP=(?<name>.*)&FORMAT/).groups.name));
const groups = [
  "1982-092",
  "1999-025",
  "2019-006",
  "active",
  "amateur",
  "analyst",
  "argos",
  "beidou",
  "cosmos-2251-debris",
  "cubesat",
  "dmc",
  "education",
  "engineering",
  "galileo",
  "geo",
  "geodetic",
  "glo-ops",
  "globalstar",
  "gnss",
  "goes",
  "gorizont",
  "gps-ops",
  "intelsat",
  "iridium-33-debris",
  "iridium-NEXT",
  "iridium",
  "military",
  "molniya",
  "musson",
  "nnss",
  "noaa",
  "oneweb",
  "orbcomm",
  "other-comm",
  "other",
  "planet",
  "radar",
  "raduga",
  "resource",
  "sarsat",
  "satnogs",
  "sbas",
  "science",
  "ses",
  "spire",
  "starlink",
  "stations",
  "swarm",
  "tdrss",
  "tle-new",
  "transporter-3",
  "visual",
  "weather",
  "x-comm",
];

groups.forEach((group) => {
  downloadTLE(group);
});
