const { readFile, writeFile } = require("../utils");

const fileJson = readFile("./data/v1/raw/mrtlrt.datamall.json");

const geoJson = {
  type: "FeatureCollection",
  features: fileJson.map((item) => {
    const { lon, lat, ...props } = item;
    return {
      type: "Feature",
      properties: { ...props },
      geometry: { type: "Point", coordinates: [lon, lat] },
    };
  }),
};

writeFile("./data/v1/mrtlrt.geojson", geoJson);
