import SatelliteTrackerSetup from "./app";

const { cc } = SatelliteTrackerSetup({
  sat: {
    enabledTags: ["MOVE"],
  },
});

cc.sats.addFromTleUrl("data/tle/move.txt", ["MOVE"]);
