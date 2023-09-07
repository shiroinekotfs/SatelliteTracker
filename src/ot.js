import SatelliteTrackerSetup from "./app";

const { cc } = SatelliteTrackerSetup({
  sat: {
    enabledTags: ["OT"],
    enabledComponents: ["Point", "Label", "Orbit", "Sensor cone"],
  },
  cesium: {
    layers: ["ArcGis"],
  },
});

cc.sats.addFromTleUrls([
  ["data/tle/ot.txt", ["OT"]],
  ["data/tle/wfs.txt", ["WFS"]],
  ["data/tle/groups/globalstar.txt", ["Globalstar"]],
  ["data/tle/groups/iridium-NEXT.txt", ["IridiumNEXT"]],
  ["data/tle/groups/planet.txt", ["Planet"]],
  ["data/tle/groups/spire.txt", ["Spire"]],
]);
