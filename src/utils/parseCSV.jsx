import React from "react";

const parseCSV = (csv) => {
  const lines = csv.split("\n");
  const headers = lines[0].split(",");
  const rows = lines.slice(1).map((line) => {
    const values = line.split(",");
    return headers.reduce((obj, header, index) => {
      if (index === 4) {
        obj["Foto - Antes"] = [
          values[4].trim().replace(/^"|"$/g, ""),
          values[5].trim().replace(/^"|"$/g, ""),
        ];
      } else if (index === 5) {
        obj["Foto - Depois"] = [
          values[6].trim().replace(/^"|"$/g, ""),
          values[7].trim().replace(/^"|"$/g, ""),
        ];
      } else {
        obj[header.trim()] = values[index].trim().replace(/^"|"$/g, "");
      }
      return obj;
    }, {});
  });
  return rows;
};

export default parseCSV;
