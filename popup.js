document.getElementById('export').addEventListener('click', async () => {
  const exportBtn = document.getElementById('export');

  // Show loading state
  exportBtn.disabled = true;
  exportBtn.classList.add('loading');
  exportBtn.querySelector('.btn-icon').textContent = '⏳';
  showStatus('Extracting conversation...', 'info');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractConversation
    });

    const conversation = results[0].result;

    if (conversation && conversation.trim() && !conversation.includes('No chat messages found')) {
      const blob = new Blob([conversation], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `copilot-chat-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`;
      a.click();

      showStatus('✅ Chat exported successfully!', 'success');
    } else {
      showStatus('⚠️ No conversation found. Make sure you\'re on a Copilot chat page.', 'error');
    }
  } catch (error) {
    console.error('Failed to extract conversation:', error);
    showStatus('❌ Export failed. Please try again.', 'error');
  } finally {
    // Reset button state
    setTimeout(() => {
      exportBtn.disabled = false;
      exportBtn.classList.remove('loading');
      exportBtn.querySelector('.btn-icon').textContent = '📥';
    }, 1000);
  }
});

function showStatus(message, type) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.className = `status-message show ${type}`;

  // Auto-hide success messages after 3 seconds
  if (type === 'success') {
    setTimeout(() => {
      statusDiv.classList.remove('show');
    }, 3000);
  }
}

function extractConversation() {
  console.log('Starting conversation extraction...');

  // Try multiple possible selectors for Copilot chat messages
  const possibleSelectors = [
    '[data-testid="chat-message"]',
    '.chat-message',
    '[role="article"]',
    '.message',
    '.conversation-item',
    '[data-testid="message"]',
    '.prose'
  ];

  let chatNodes = [];
  let usedSelector = '';

  for (const selector of possibleSelectors) {
    chatNodes = document.querySelectorAll(selector);
    if (chatNodes.length > 0) {
      usedSelector = selector;
      console.log(`Found ${chatNodes.length} messages using selector: ${selector}`);
      break;
    }
  }

  if (chatNodes.length === 0) {
    console.log('No chat messages found with specific selectors. Trying fallback...');
    // Fallback: try to get main content area
    const mainContent = document.querySelector('main') || document.querySelector('#app') || document.body;
    const allText = mainContent.innerText;
    console.log('Extracted all text from main content area');
    return allText || 'No content found';
  }

  const conversation = Array.from(chatNodes).map((node, index) => {
    const text = node.innerText || node.textContent;
    console.log(`Message ${index + 1}:`, text.substring(0, 100));
    return text;
  }).join('\n\n---\n\n');

  console.log(`Extracted conversation with ${chatNodes.length} messages using selector: ${usedSelector}`);
  return conversation;
}
