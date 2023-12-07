// https://gis.stackexchange.com/questions/259551/options-for-js-shapefile-to-geojson-conversions-that-allow-multiple-input-files
const shapefile = require("shapefile");
const writeFile = require("../utils/writeFile");

let i = 1;

const features = [];
const mrtRegex = /MRT STATION$/gm;
const lrtRegex = /LRT STATION$/gm;
const depotRegex = / DEPOT$/gm;
const stationNames = {
  mrt: [],
  lrt: [],
  depot: [],
  misc: [],
};

shapefile
  .open("./data/v1/raw/TrainStation/RapidTransitSystemStation.shp")
  .then((source) =>
    source.read().then(function log(result) {
      if (result.done) return;
      const modified = {
        ...result.value,
      };
      const name = result.value.properties["STN_NAM_DE"];
      modified.properties = {
        STN_NAM: name,
        TYP_CD_DES: result.value.properties["TYP_CD_DES"],
      };
      if (name.match(mrtRegex)?.length > 0) {
        stationNames.mrt.push(name);
      } else if (name.match(lrtRegex)?.length > 0) {
        stationNames.lrt.push(name);
      } else if (name.match(depotRegex)?.length > 0) {
        stationNames.depot.push(name);
      } else {
        stationNames.misc.push(name);
        modified.properties.TYP_CD_DES = "MSC";
      }

      features.push(modified);
      i++;
      return source.read().then(log);
    })
  )
  .catch((error) => console.error(error.stack))
  .finally(() => {
    console.log("Read", i, "entries");
    writeFile("./data/v1/mrtlrt.json", {
      type: "FeatureCollection",
      features,
    });
    writeFile("./data/v1/stationNames.json", {
      stationNames,
    });
  });
