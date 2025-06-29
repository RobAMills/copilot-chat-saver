function extractConversation() {
  const chatNodes = document.querySelectorAll('.your-chat-message-selector');
  return Array.from(chatNodes).map(node => node.innerText).join('\n\n');
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'get_conversation') {
    const text = extractConversation();
    sendResponse({ conversation: text });
  }
});
