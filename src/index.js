import SatelliteTrackerSetup from "./app";

const { cc } = SatelliteTrackerSetup({
  sat: {
    enabledTags: ["New"],
  },
});

cc.sats.addFromTleUrls([
  ["data/tle/groups/1982-092.txt",["1982-092"]],
  ["data/tle/groups/1999-025.txt",["1999-025"]],
  ["data/tle/groups/2019-006.txt",["2019-006"]],
  ["data/tle/groups/active.txt",["active"]],
  ["data/tle/groups/amateur.txt",["amateur"]],
  ["data/tle/groups/analyst.txt",["analyst"]],
  ["data/tle/groups/argos.txt",["argos"]],
  ["data/tle/groups/beidou.txt",["beidou"]],
  ["data/tle/groups/cosmos-2251-debris.txt",["cosmos-2251-debris"]],
  ["data/tle/groups/cubesat.txt",["cubesat"]],
  ["data/tle/groups/dmc.txt",["dmc"]],
  ["data/tle/groups/education.txt",["education"]],
  ["data/tle/groups/engineering.txt",["engineering"]],
  ["data/tle/groups/galileo.txt",["galileo"]],
  ["data/tle/groups/geo.txt",["geo"]],
  ["data/tle/groups/geodetic.txt",["geodetic"]],
  ["data/tle/groups/glo-ops.txt",["glo-ops"]],
  ["data/tle/groups/globalstar.txt",["globalstar"]],
  ["data/tle/groups/gnss.txt",["gnss"]],
  ["data/tle/groups/goes.txt",["goes"]],
  ["data/tle/groups/gorizont.txt",["gorizont"]],
  ["data/tle/groups/gps-ops.txt",["gps-ops"]],
  ["data/tle/groups/intelsat.txt",["intelsat"]],
  ["data/tle/groups/iridium-33-debris.txt",["iridium-33-debris"]],
  ["data/tle/groups/iridium-NEXT.txt",["iridium-NEXT"]],
  ["data/tle/groups/iridium.txt",["iridium"]],
  ["data/tle/groups/military.txt",["military"]],
  ["data/tle/groups/molniya.txt",["molniya"]],
  ["data/tle/groups/musson.txt",["musson"]],
  ["data/tle/groups/nnss.txt",["nnss"]],
  ["data/tle/groups/noaa.txt",["noaa"]],
  ["data/tle/groups/oneweb.txt",["oneweb"]],
  ["data/tle/groups/orbcomm.txt",["orbcomm"]],
  ["data/tle/groups/other-comm.txt",["other-comm"]],
  ["data/tle/groups/other.txt",["other"]],
  ["data/tle/groups/planet.txt",["planet"]],
  ["data/tle/groups/radar.txt",["radar"]],
  ["data/tle/groups/raduga.txt",["raduga"]],
  ["data/tle/groups/resource.txt",["resource"]],
  ["data/tle/groups/sarsat.txt",["sarsat"]],
  ["data/tle/groups/satnogs.txt",["satnogs"]],
  ["data/tle/groups/sbas.txt",["sbas"]],
  ["data/tle/groups/science.txt",["science"]],
  ["data/tle/groups/ses.txt",["ses"]],
  ["data/tle/groups/spire.txt",["spire"]],
  ["data/tle/groups/starlink.txt",["starlink"]],
  ["data/tle/groups/stations.txt",["stations"]],
  ["data/tle/groups/swarm.txt",["swarm"]],
  ["data/tle/groups/tdrss.txt",["tdrss"]],
  ["data/tle/groups/tle-new.txt",["tle-new"]],
  ["data/tle/groups/transporter-3.txt",["transporter-3"]],
  ["data/tle/groups/visual.txt",["visual"]],
  ["data/tle/groups/weather.txt",["weather"]],
  ["data/tle/groups/x-comm.txt",["x-comm"]],  
]);
