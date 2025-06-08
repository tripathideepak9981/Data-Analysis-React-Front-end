export const formatMarkdown = (text) => {
  if (!text) return '';

  return text
    // H1 and H2 headers
    .replace(/^# (.*$)/gm, '<h1 class=" text-lg font-bold text-gray-900 mb-3 font-[Roboto Flex]">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class=" text-lg font-semibold text-gray-900 mb-2 font-[Roboto Flex]">$1</h2>')

    // List items (supports leading spaces)
    .replace(/^(\s*)\* (.*$)/gm, (_, space, content) =>
      `<li class="ml-${space.length * 2} chat-ui list-disc text-sm font-[Roboto Flex]">${content}</li>`
    )

    // Bold text: **text**
    .replace(/\*\*(.*?)\*\*/g, '<span class="font-semibold text-gray-800 font-[Roboto Flex]">$1</span>')

    // Italics: *text*
    .replace(/\*(.*?)\*/g, '<span class="italic text-gray-700 font-[Roboto Flex]">$1</span>')

    // Inline code: `code`
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-800 font-mono text-sm px-1.5 py-0.5 rounded">$1</code>')

    // Percentages like 45% or 12.3%
    .replace(/(\d+(\.\d+)?%)/g, '<span class="font-bold font-[Roboto Flex]">$1</span>')

    // Dollar values like \$45 or \$45.50
    .replace(/\\\$(\d+(\.\d+)?)/g, '<span class="font-semibold text-gray-800 font-[Roboto Flex]">$$$1</span>')

    // Numbers with commas: 1,000 or 12,000,000
    .replace(/\b(\d{1,3}(,\d{3})+)\b/g, '<span class="text-gray-800 font-medium font-[Roboto Flex]">$1</span>')

    // Labels like "Total:" → bolded label
    .replace(/^([^:\n]+):/gm, '<span class="font-bold font-[Roboto Flex]">$1:</span>');
};
