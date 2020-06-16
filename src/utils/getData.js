export default function getData(result, graphLabel, days) {
  const d = Object.entries(result.data).reverse().slice(0, days).reverse();

  let labels = [];
  let data = [];
  d.forEach((o) => {
    labels.push(o[0]);
    data.push(o[1].length);
  });
  const stats = {
    labels,
    datasets: [
      {
        label: graphLabel,
        data: data,
        fill: false,
        borderColor: "#007be5",
      },
    ],
  };
  return stats;
}
