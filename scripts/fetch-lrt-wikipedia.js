const { fetch, writeFile } = require("../utils");
const cheerio = require("cheerio");

const data = [];

// Trawl through wikipedia for station codes.
fetch("https://en.m.wikipedia.org/wiki/List_of_Singapore_LRT_stations", {
  responseType: "text",
}).then((res) => {
  const $ = cheerio.load(res.body);
  const $td1s = $("#mf-section-1 .wikitable tr td:first-child");

  // Iterate through rows of table
  $td1s.each((i, tdFirst) => {
    const $tdFirst = $(tdFirst);
    if ($tdFirst.attr("colspan")) return;
    // On wikipedia, codes are written in <b></b> tags
    const $codes = $tdFirst.find("b");

    // Only care about current stations, not future ones
    // If first column is empty, means it's a future station
    if ($codes.length) {
      const codes = $codes
        .map((i, el) => $(el).text().trim())
        .get()
        .sort();

      // Find the next <td></td>
      let $td1 = $tdFirst.next("td");
      if ($td1.attr("rowspan")) {
        $td1 = $td1.next("td");
      }

      // Find the first <a></a> tag within td1, which contains station information in english
      const $a = $td1.find("a");
      const url = $a.length ? $a.attr("href") : null;
      const title =
        $a.length && $a.attr("title") ? $a.attr("title").trim() : null;
      const name = $td1.text().trim();

      // Subsequent tds, td2 and td3, contain station name in other languages (mandarin then tamil)
      const $td2 = $td1.next("td");
      const name_zh_Hans = $td2.text().trim();

      const $td3 = $td2.next("td");
      const name_ta = $td3.text().trim();

      data.push({ codes, name, name_zh_Hans, name_ta, title, url });
    }
  });

  writeFile("./data/raw/wikipedia-lrt.json", data);
});
