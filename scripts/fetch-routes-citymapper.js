const { fetch, writeFile } = require("../utils");

// Sample response: Circle Line
/*
const sample_response_CC = {
  routes: [
    {
      name: "CC",
      color: "#F79F07",
      text_color: "#FFFFFF",
      icon_name: "sg-singapore-MRT-CC",
      icon_contains_name: false,
      live_line_code: "SingaporeMRTCircleLine",
      brand: "SingaporeMRT",
      mode: "metro",
      supports_routeinfo: true,
      url: "https://citymapper.com/singapore/l/mrt-cc",
      patterns: [
        {
          name: "Dhoby Ghaut · HarbourFront",
          path: [line coordinates],
          stop_points: [
            {
            id: station name, 
            path_index: which line coordinate represents station
          },
          {...}
        ],
          id: "Cmpattern_Singaporemrtcircleline_1813__Stations",
          pattern_type: "multidirectional",
        },
        {
          name: "Marina Bay · Stadium",
          path: [...],
          stop_points: [...],
          id: "Cmpattern_Singaporemrtcircleline_1815__Stations",
          pattern_type: "multidirectional",
        },
        {
          name: "HarbourFront · Mountbatten",
          path: [...],
          stop_points: [...],
          id: "Cmpattern_Singaporemrtcircleline_4215__Stations",
          pattern_type: "multidirectional",
        },
        {
          name: "HarbourFront · Bartley",
          path: [...],
          stop_points: [...],
          id: "Cmpattern_Singaporemrtcircleline_4216__Stations",
          pattern_type: "multidirectional",
        },
        {
          name: "Dhoby Ghaut · Pasir Panjang",
          path: [...],
          stop_points: [...],
          id: "Cmpattern_Singaporemrtcircleline_4217__Stations",
          pattern_type: "multidirectional",
        },
        {
          name: "Dhoby Ghaut · one-north",
          path: [...],
          stop_points: [...],
          id: "Cmpattern_Singaporemrtcircleline_4218__Stations",
          pattern_type: "multidirectional",
        },
        {
          name: "Dhoby Ghaut · Caldecott",
          path: [...],
          stop_points: [...],
          id: "Cmpattern_Singaporemrtcircleline_4219__Stations",
          pattern_type: "multidirectional",
        },
        {
          name: "Dhoby Ghaut · Tai Seng",
          path: [...],
          stop_points: [...],
          id: "Cmpattern_Singaporemrtcircleline_4220__Stations",
          pattern_type: "multidirectional",
        },
        {
          name: "Stadium · HarbourFront",
          path: [...],
          stop_points: [...],
          id: "Cmpattern_Singaporemrtcircleline_9814__Stations",
          pattern_type: "multidirectional",
        },
        {
          name: "Stadium · Dhoby Ghaut",
          path: [...],
          stop_points: [...],
          id: "Cmpattern_Singaporemrtcircleline_9815__Stations",
          pattern_type: "multidirectional",
        },
      ],
      live_availability: 0,
      ui_color: "#F79F07",
      long_name: "Circle Line",
      status: {
        level: 0,
        summary: "Good Service",
      },
      aliases: ["mrt-cc"],
    },
  ],
  stops: {
    SingaporeStation_Serangoon: {
      live_code: "SingaporeStation_Serangoon",
      routes: ["SingaporeMRTCircleLine", "SingaporeMRTNortheastLine"],
      brands: ["SingaporeMRT"],
      name: "Serangoon",
      coords: [1.349807, 103.873771],
      route_icon_names: ["sg-singapore-MRT-CC", "sg-singapore-MRT-NE"],
      status: {
        description: "",
        effect_time_periods: [
          {
            end: "2023-12-07T02:01:56.742501+00:00",
            start: "2023-12-07T00:01:56.742501+00:00",
          },
        ],
        level: 0,
        station_id: "SingaporeStation_Serangoon",
        summary: "Serangoon: Station Open",
      },
    },
    ...other stops
  },
  feeds: [],
  status: 0,
};
*/

fetch("https://citymapper.com/api/2/routeinfo", {
  searchParams: {
    route_ids: [
      "SingaporeMRTCircleLine",
      "SingaporeMRTDowntownLine",
      "SingaporeMRTEastwestLine",
      "SingaporeMRTNortheastLine",
      "SingaporeMRTNorthsouthLine",
      "CM_SingaporeMRT_tel",
      "SingaporeLRTBukitPanjangLine",
      "SingaporeLRTPunggolLineEastLoop",
      "SingaporeLRTPunggolLineWestLoop",
      "SingaporeLRTSengkangLineEastLoop",
      "SingaporeLRTSengkangLineWestLoop",
    ].join(","),
    region_id: "sg-singapore",
    weekend: 1,
    status_format: "rich",
  },
}).then((res) => {
  const { body } = res;
  writeFile("data/raw/routes.citymapper.json", body);
});
