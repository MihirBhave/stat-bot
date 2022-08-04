import { AttachmentBuilder } from "discord.js";

type Stats = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
};

export default function makeBoard(stats: Stats, type: string) {
  let url = "https://quickchart.io/chart?";

  const { labels, datasets } = stats;

  const params = {
    c: {
      type,
      data: {
        labels,
        datasets,
      },
    },
    bkg: "white",
  };

  const parameters = Object.entries(params);
  for (let p of parameters) {
    let index = parameters.indexOf(p);
    let next = index + 1 === parameters.length ? "" : "&";

    if (typeof p[1] === "object") {
      url += `${p[0]}=${JSON.stringify(p[1])}${next}`;
    } else url += `${p[0]}=${p[1]}${next}`;
  }

  return url;
}
