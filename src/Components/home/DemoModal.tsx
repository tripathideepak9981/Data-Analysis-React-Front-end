
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { X, Play, Pause } from "lucide-react";
import { useState } from "react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate video progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full h-[80vh] p-0 bg-gradient-to-br from-white via-violet-50/30 to-blue-50/30 border-0 shadow-2xl">
        {/* Header */}
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              See AI Data Whisperer in Action
            </DialogTitle>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </DialogHeader>

        {/* Video Container */}
        <div className="flex-1 p-6 pt-4">
          <div className="relative w-full h-full bg-black rounded-2xl shadow-2xl overflow-hidden">
            {/* Actual video placeholder - you can replace this with an actual video */}
            <video 
              className="w-full h-full object-cover" 
              poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
              controls={false}
            >
              <source src="/demo-video.mp4" type="video/mp4" />
              {/* Fallback content when video is not available */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
                <div className="text-center space-y-6 max-w-3xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-8">Demo Preview</h3>
                  
                  {/* Demo steps preview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <h4 className="text-lg font-semibold mb-2 text-violet-300">✨ Upload Data</h4>
                      <p className="text-gray-300 text-sm">Drag and drop CSV files</p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <h4 className="text-lg font-semibold mb-2 text-blue-300">🧠 AI Analysis</h4>
                      <p className="text-gray-300 text-sm">Automatic data cleaning</p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <h4 className="text-lg font-semibold mb-2 text-teal-300">💬 Natural Language</h4>
                      <p className="text-gray-300 text-sm">Ask questions in plain English</p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <h4 className="text-lg font-semibold mb-2 text-green-300">📊 Instant Results</h4>
                      <p className="text-gray-300 text-sm">Charts and insights generated</p>
                    </div>
                  </div>
                </div>
              </div>
            </video>

            {/* Custom video controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handlePlayPause}
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center justify-center group"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white ml-0" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </button>
              </div>

              {/* Bottom controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between text-white mb-2">
                  <span className="text-sm">0:00 / 2:30</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">HD</span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Status indicators */}
            <div className="absolute top-4 right-4 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm border border-green-500/30">
              ● Live Demo
            </div>
            
            <div className="absolute top-4 left-4 bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full text-sm border border-violet-500/30">
              2:30 duration
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 text-center">
          <p className="text-gray-600 mb-4">Ready to transform your data analysis workflow?</p>
          <button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-105">
            Try It Free Now
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;