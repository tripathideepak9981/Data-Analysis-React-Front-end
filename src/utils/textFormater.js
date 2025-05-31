export const formatMarkdown = (text) => {
  if (!text) return '';
  
  return text
    // Headers
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
    // Lists
    .replace(/^(\s*)\* (.*$)/gm, '<li class="ml-$1">$2</li>')
    .replace(/^( +)/gm, match => 'ml-' + (match.length * 4))
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italics
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Table names (wrapped in backticks)
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-purple-600 px-1 rounded font-mono">$1</code>')
    // Metrics formatting
    // Format percentage values (e.g., 42% or 42.5%)
    .replace(/(\d+(\.\d+)?%)/g, '<span class="text-gray-800 font-bold">$1</span>')
    // Format currency values (e.g., $42 or $42.50), including escaped dollar signs
    .replace(/\\\$(\d+(\.\d+)?)/g, '<span class="text-gray-700 font-bold">$$$1</span>')
    // Numbers with commas
    .replace(/\b(\d{1,3}(,\d{3})+)\b/g, '<span class="text-gray-700 font-bold">$1</span>')
    // Section titles
    .replace(/^([^:]+):/, '<span class="font-bold">$1:</span>');
};
 