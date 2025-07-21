import BarChartIcon from "@mui/icons-material/BarChart";
import InsightsIcon from "@mui/icons-material/Insights";
import PieChartIcon from "@mui/icons-material/PieChart";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import GroupedBar from "../../assets/icons/GroupedBar.svg";
import GroupedLine from "../../assets/icons/GroupedLine.svg";

export function transformChartData(result) {
  if (!Array.isArray(result) || result.length === 0) {
    return {
      labels: [],
      data: [],
      multi_value: false,
      keys: [],
    };
  }

  const allKeys = Object.keys(result[0]);
  const labelKey = allKeys[0];
  const valueKeys = allKeys.slice(1);

  const labels = result.map((item) => item[labelKey]);

  const multi_value = valueKeys.length > 1;

  const data = multi_value
    ? valueKeys.map((key) => result.map((item) => item[key]))
    : result.map((item) => item[valueKeys[0]]);

  return {
    labels,
    data,
    keys: valueKeys,
    multi_value,
  };
}

export const loaderMessages = [
  "AI is Analyzing your data...",
  "AI is generating a response...",
];

