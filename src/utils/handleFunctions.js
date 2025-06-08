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

    // Prepare data based on whether it's single or multi-value
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