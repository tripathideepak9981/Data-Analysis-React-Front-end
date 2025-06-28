
import { Crown, Sparkles, ArrowRight, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function UpgradeCard() {
  return (
    <Card className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white border-0 shadow-2xl shadow-purple-500/25 overflow-hidden">
      <div className="p-3 relative">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8 blur-sm" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-6 -translate-x-6 blur-sm" />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-yellow-300/60 rounded-full animate-pulse" />
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/40 rounded-full animate-pulse delay-700" />
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <Crown className="w-5 h-5 text-yellow-300" />
            </div>
            <span className="font-bold text-sm">Upgrade to Pro</span>
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          </div>
          
          {/* <p className="text-sm text-purple-100 mb-6 leading-relaxed font-medium">
            Unlock advanced analytics, unlimited reports, and AI-powered insights to supercharge your data workflow
          </p> */}
          
          {/* <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">$29</span>
              <span className="text-purple-200 text-sm font-medium">/month</span>
            </div>
            <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-xs font-bold">POPULAR</span>
            </div>
          </div> */}
          
          <Button 
            size="sm" 
            className="w-full bg-white text-purple-700 hover:bg-purple-50 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl h-11"
          >
            Upgrade Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
}