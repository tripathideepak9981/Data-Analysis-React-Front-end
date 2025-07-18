import {
  CheckCircle,
  Database,
  Shield,
  BarChart3,
  Settings,
  Users,
  Zap,
  Lock,
} from "lucide-react";

export const WhyWeStandOutSection = () => {
  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      text: "No SQL, no training needed",
      delayClass: ""
    },
    {
      icon: <Database className="w-5 h-5" />,
      text: "Works with your existing data",
      delayClass: "delay-75"
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Smart enough to understand context",
      delayClass: "delay-150"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Secure & enterprise-ready",
      delayClass: "delay-300"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      text: "Generates charts, dashboards, and exports",
      delayClass: "delay-500"
    },
    // {
    //   icon: <Lock className="w-5 h-5" />,
    //   text: "Connects via VPN to any database securely",
    //   delayClass: "delay-700"
    // },
    // {
    //   icon: <Settings className="w-5 h-5" />,
    //   text: "Edit or refine the AI-generated SQL before execution",
    //   delayClass: "delay-1000"
    // }
  ];

  return (
    <section className="h-full w-full bg-white relative overflow-hidden flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 font-medium text-sm mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            Why Our AI Stands Out
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Built for{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Business Teams
            </span>
            ,<br />
            Backed by{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI
            </span>
            .
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 h-full items-center">
          {/* Features List */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group flex items-start gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${feature.delayClass}`}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  {feature.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">
                      {feature.text}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side Card */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl p-8 shadow-2xl border border-white/20 backdrop-blur-sm transition-transform duration-700">
              {/* Floating Icons */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg animate-bounce">
                <BarChart3 className="w-8 h-8" />
              </div>

              {/* Card Content */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Database className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Full Control Meets Simplicity
                </h3>
                <p className="text-gray-600 text-base">
                  Designed for teams who want <span className="font-semibold text-blue-600">answers</span>, not <span className="font-semibold text-red-500">wait times</span>.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">30s</div>
                    <div className="text-xs text-gray-500">Setup Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600">100%</div>
                    <div className="text-xs text-gray-500">Secure</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">0</div>
                    <div className="text-xs text-gray-500">SQL Required</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
