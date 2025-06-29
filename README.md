# 💬 Copilot Chat Saver

A Chrome extension that allows you to easily export and save your Microsoft Copilot conversations as text files.

## ✨ Features

- **One-click export** of your current Copilot conversation
- **Professional UI** with modern design and smooth animations
- **Smart conversation detection** with multiple selector fallbacks
- **Timestamped filenames** for easy organization
- **Real-time status feedback** with loading states and error handling
- **Responsive design** that works on all screen sizes

## 🚀 Installation

### Option 1: Load Unpacked (Development)

1. **Clone or download** this repository
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable "Developer mode"** (toggle in the top right)
4. **Click "Load unpacked"** and select the project folder
5. **Pin the extension** to your toolbar for easy access

### Option 2: Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store soon!

## 📖 Usage

1. **Navigate** to [Microsoft Copilot](https://copilot.microsoft.com/)
2. **Have a conversation** with Copilot
3. **Click the extension icon** in your toolbar
4. **Click "Export Current Chat"** button
5. **Your conversation** will be downloaded as a `.txt` file

## 🛠️ Development

### Prerequisites

- Chrome browser
- Basic knowledge of Chrome extensions

### Project Structure

```
copilotchatsaver/
├── manifest.json          # Extension configuration
├── popup.html             # Extension popup interface
├── popup.css              # Styling for the popup
├── popup.js               # Main functionality
├── content.js             # Content script (legacy)
├── background.js          # Background service worker
└── README.md              # This file
```

### Key Files

- **`manifest.json`**: Defines extension permissions and configuration
- **`popup.html/css/js`**: The main user interface and functionality
- **`content.js`**: Legacy content script (currently unused)
- **`background.js`**: Service worker for background tasks

### Debugging

1. **Load the extension** in developer mode
2. **Use VS Code debugger**: Press F5 or use the "Debug Copilot Extension" configuration
3. **Check browser console**: Right-click on Copilot page → Inspect → Console
4. **View extension logs**: Go to `chrome://extensions/` → Click "Details" → "Inspect views"

## 🔧 Technical Details

### How It Works

1. **Content Script Injection**: Uses `chrome.scripting.executeScript()` to run code on the Copilot page
2. **DOM Parsing**: Searches for chat messages using multiple CSS selectors
3. **Text Extraction**: Extracts conversation text and formats it for export
4. **File Download**: Creates a blob and triggers download via the browser

### Permissions

- **`storage`**: For future settings storage
- **`activeTab`**: To access the current tab
- **`scripting`**: To inject scripts into web pages
- **`host_permissions`**: Access to copilot.microsoft.com

## 🐛 Troubleshooting

### Empty Export File

- **Check console logs** for debugging information
- **Ensure you're on** a Copilot chat page with an active conversation
- **Try refreshing** the page and starting a new conversation

### Extension Not Working

- **Reload the extension** in `chrome://extensions/`
- **Check permissions** are granted
- **Verify you're on** the correct Copilot domain

### CSP Errors

- The extension uses `chrome.scripting.executeScript()` to avoid CSP issues
- If problems persist, check the browser console for specific errors

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the Microsoft Copilot platform
- Uses modern Chrome Extension Manifest V3
- Designed with user experience in mind

## 📞 Support

If you encounter any issues or have suggestions:

1. **Check** the troubleshooting section above
2. **Open an issue** on GitHub
3. **Provide** detailed information about your browser and the error

---

**Made with ❤️ for the Copilot community**
