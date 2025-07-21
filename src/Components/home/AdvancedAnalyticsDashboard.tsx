import { useEffect, useState } from "react";
import { TrendingUp, BarChart3, Brain, Zap, Users, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip } from 'recharts';

interface ChartBarProps {
  height: number;
  delay: number;
  color: string;
}

const ChartBar = ({ height, delay, color }: ChartBarProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`relative overflow-hidden rounded-t-lg transition-all duration-1000 ease-out ${color}`}
      style={{
        height: animate ? `${height}%` : '0%',
        opacity: animate ? 1 : 0,
        '--chart-height': `${height}%`
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
    </div>
  );
};

const AdvancedAnalyticsDashboard = () => {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [chartDataIndex, setChartDataIndex] = useState(0);

  const insights = [
    "APAC region showing accelerating growth trajectory",
    "Customer retention increased by 23% this quarter",
    "New AI model detected anomaly in EU sales data",
    "Revenue forecasting accuracy improved to 97.3%"
  ];

  const chartDataSets = [
    [
      { region: "EU", value: 850, revenue: 2.1, growth: 12, color: "#8B5CF6" },
      { region: "APAC", value: 720, revenue: 1.8, growth: 23, color: "#06B6D4" },
      { region: "SA", value: 450, revenue: 1.1, growth: 8, color: "#10B981" },
      { region: "NA", value: 680, revenue: 1.7, growth: 15, color: "#3B82F6" },
      { region: "AF", value: 250, revenue: 0.6, growth: 18, color: "#8B5CF6" }
    ],
    [
      { region: "EU", value: 890, revenue: 2.2, growth: 15, color: "#8B5CF6" },
      { region: "APAC", value: 880, revenue: 2.2, growth: 28, color: "#06B6D4" },
      { region: "SA", value: 480, revenue: 1.2, growth: 12, color: "#10B981" },
      { region: "NA", value: 720, revenue: 1.8, growth: 18, color: "#3B82F6" },
      { region: "AF", value: 290, revenue: 0.7, growth: 22, color: "#8B5CF6" }
    ],
    [
      { region: "EU", value: 820, revenue: 2.0, growth: 8, color: "#8B5CF6" },
      { region: "APAC", value: 950, revenue: 2.4, growth: 32, color: "#06B6D4" },
      { region: "SA", value: 520, revenue: 1.3, growth: 16, color: "#10B981" },
      { region: "NA", value: 760, revenue: 1.9, growth: 22, color: "#3B82F6" },
      { region: "AF", value: 320, revenue: 0.8, growth: 26, color: "#8B5CF6" }
    ]
  ];

  const currentChartData = chartDataSets[chartDataIndex];
  const totalRevenue = currentChartData.reduce((sum, item) => sum + item.revenue, 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-xl">
          <p className="text-gray-800 font-medium">{label}</p>
          <p className="text-blue-600">Revenue: ${data.revenue}M</p>
          <p className="text-green-600">Growth: +{data.growth}%</p>
          <p className="text-purple-600">Value: {data.value}</p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [insights.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartDataIndex((prev) => (prev + 1) % chartDataSets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [chartDataSets.length]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="relative w-[40vw] h-[70vh] bg-white rounded-3xl p-6 shadow-lg border border-gray-200 animate-slide-up overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Asklytics</h3>
              <p className="text-gray-500 text-sm">AI-Powered Analytics Platform</p>
            </div>
          </div>
        </div>

        {/* AI Insight Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-blue-500 animate-pulse" />
            <span className="text-gray-700 font-medium">{insights[currentInsight]}</span>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-semibold text-gray-700">Revenue by Region</h4>
            <div className="p-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-md">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="region"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={1000}>
                  {currentChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-100 rounded-lg p-2 text-center">
            <Users className="h-4 w-4 text-blue-500 mb-1 mx-auto" />
            <p className="text-xs text-gray-500">Segments</p>
            <p className="text-lg font-semibold text-gray-700">5</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-2 text-center">
            <AlertCircle className="h-4 w-4 text-purple-500 mb-1 mx-auto" />
            <p className="text-xs text-gray-500">Quality</p>
            <p className="text-lg font-semibold text-gray-700">98%</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-2 text-center">
            <TrendingUp className="h-4 w-4 text-green-500 mb-1 mx-auto" />
            <p className="text-xs text-gray-500">Growth</p>
            <p className="text-lg font-semibold text-gray-700">+23%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;
