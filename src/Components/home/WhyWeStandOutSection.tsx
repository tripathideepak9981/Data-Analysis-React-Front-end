import { FC } from "react";
import {
  Zap,
  Wrench,
  CheckCircle,
  Code,
  Database,
} from "lucide-react";

export const WhyWeStandOutSection = () => {
  return (
    <section className="bg-white py-8 px-4 mt-4 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute w-16 h-16 bg-indigo-100 rounded-full top-1/4 right-12 animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute w-10 h-10 bg-purple-100 rounded-full bottom-1/3 left-8 animate-[float_6s_ease-in-out_infinite_delay-2000]" />
      <div className="absolute w-8 h-8 bg-blue-100 rounded-full top-3/4 right-1/4 animate-[float_6s_ease-in-out_infinite_delay-4000]" />

      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Who Is This For?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          {/* Benefit Card 1 */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-indigo-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                Quick Insights, No Tech Team
              </h3>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Perfect for business users who need instant data insights
              without waiting for technical teams or learning complex tools.
            </p>
            <ul className="space-y-2">
              {[
                "Ask questions in plain English",
                "Get instant visualizations",
                "No coding or SQL knowledge required",
                "Business users can be self-sufficient",
              ].map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-slate-700 font-medium"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Benefit Card 2 */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-indigo-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                Generate & Customize SQL
              </h3>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              For those who want more control, get the actual SQL queries
              behind your insights and modify them to get exactly what you
              need.
            </p>
            <ul className="space-y-2">
              {[
                "Auto-generate SQL from natural language",
                "View and edit the generated queries",
                "Learn SQL while getting results",
                "Save and reuse custom queries",
              ].map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-slate-700 font-medium"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* SQL Demo */}
            <div className="bg-slate-800 rounded-xl p-6 mt-6 relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400 text-sm font-medium">
                  Generated Query
                </span>
                <span className="bg-indigo-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Editable
                </span>
              </div>
              <pre className="bg-slate-900 text-slate-200 text-sm rounded-lg p-4 border border-slate-700 font-mono scrollbar-hide leading-6 overflow-x-auto">
                <code>
                  <span className="text-pink-400 font-semibold">SELECT</span>{" "}
                  region, <span className="text-blue-400">SUM</span>(revenue){" "}
                  <span className="text-pink-400 font-semibold">as</span>{" "}
                  total_revenue
                  {"\n"}
                  <span className="text-pink-400 font-semibold">FROM</span>{" "}
                  sales_data
                  {"\n"}
                  <span className="text-pink-400 font-semibold">WHERE</span>{" "}
                  date &gt;= <span className="text-green-400">'2024-01-01'</span>
                  {"\n"}
                  <span className="text-pink-400 font-semibold">GROUP BY</span>{" "}
                  region
                  {"\n"}
                  <span className="text-pink-400 font-semibold">ORDER BY</span>{" "}
                  total_revenue{" "}
                  <span className="text-pink-400 font-semibold">DESC</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
