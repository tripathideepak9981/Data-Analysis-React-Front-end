
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface HelpTooltipProps {
  content: string;
  className?: string;
}

const HelpTooltip: React.FC<HelpTooltipProps> = ({ content, className = "" }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className={`h-4 w-4 bg-white text-gray-400 hover:text-gray-600 cursor-help ${className}`} />
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-sm text-gray-800 z-20 bg-white">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HelpTooltip;