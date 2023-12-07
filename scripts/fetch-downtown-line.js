const { fetch, writeFile } = require("../utils");
const nearestPointOnLine = require("@turf/nearest-point-on-line").default;
const { lineString, point } = require("@turf/helpers");
const pointToLineDistance = require("@turf/point-to-line-distance").default;
const lineSlice = require("@turf/line-slice");

const extractLine = (body) => {
  // Body is a json containing metadata in other keys and array coordinates of nodes in "elements"
  const { elements } = body;
  /*
  const sample_element = {
    type: "node",
    id: 1840076836,
    lat: 1.3622771,
    lon: 103.767437,
    timestamp: "2021-05-02T06:22:15Z",
    version: 11,
    changeset: 103980753,
    user: "testerx1",
    uid: 3415779,
    tags: {
      level: "-1",
      location: "underground",
      name: "Hillview",
      "name:en": "Hillview",
      "name:zh": "山景",
      network: "Downtown Line (DTL)",
      operator: "SBS Transit",
      public_transport: "stop_position",
      railway: "stop",
      ref: "DT3",
      subway: "yes",
    },
  };
  */
  const line = elements
    .map((element) => {
      if (
        element.type === "way" &&
        (element.tags?.construction !== "subway" ||
          element.tags?.railway !== "construction")
      ) {
        if (element.id === 544673198) return; // skip this line
        console.log(element);
        const nodes = element.nodes.map((node) => {
          const fullNode = elements.find((n) => n.id === node);
          return [fullNode.lon, fullNode.lat];
        });
        return nodes;
      }
    })
    .filter(Boolean);
  return line;
};

fetch("https://www.openstreetmap.org/api/0.6/relation/2313458/full.json").then(
  (res) => {
    const { body } = res;
    const line = extractLine(body);
    writeFile("data/raw/dtl-way.json", line);
  }
);
