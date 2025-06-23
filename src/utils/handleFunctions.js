export function transformChartData(result) {
  if (!Array.isArray(result) || result.length === 0) {
    return {
      labels: [],
      data: [],
      keys: [],
      multi_value: false,
    };
  }

  const allKeys = Object.keys(result[0]);
  const labelKey = allKeys[0]; // e.g., "district"
  const valueKeys = allKeys.slice(1); // e.g., ["total_admission", "total_treated"]
  const multi_value = valueKeys.length > 1;
  const primaryKey = valueKeys[0]; // we will sort by this key

  // ✅ Sort by primaryKey DESCENDING
  const sorted = [...result].sort((a, b) => {
    const valA = Number(String(a[primaryKey]).replace(/,/g, '')) || 0;
    const valB = Number(String(b[primaryKey]).replace(/,/g, '')) || 0;
    return valB - valA;
  });

  // ✅ Confirm: log the sorted array for verification
  console.log("Sorted result (descending by total_admission):", sorted);

  // ✅ Build labels
  const labels = sorted.map((item) => item[labelKey]);

  // ✅ Build data
  const data = valueKeys.map((key) => sorted.map((item) => item[key]));

  return {
    labels,
    data,
    keys: valueKeys,
    multi_value,
  };
}
