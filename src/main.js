// Retro Macintosh/Windows 95 Classic OS Interactive Engine

document.addEventListener('DOMContentLoaded', () => {
  // --- Z-Index / Layering Manager for Application Windows & Stacked Tabs ---
  let highestZ = 10;
  const windowsAndTabs = document.querySelectorAll('.retro-window, .stacked-tab');

  function bringToFront(element) {
    highestZ += 1;
    element.style.zIndex = highestZ;
    
    // Add visual 'active' state to the header/title bar
    windowsAndTabs.forEach(item => {
      item.classList.remove('active-window');
      const titleBar = item.querySelector('.window-title-bar');
      if (titleBar) {
        titleBar.classList.remove('bg-black', 'text-white');
        titleBar.classList.add('bg-retro-light', 'text-retro-black');
      }
    });

    element.classList.add('active-window');
    const titleBar = element.querySelector('.window-title-bar');
    if (titleBar) {
      titleBar.classList.remove('bg-retro-light', 'text-retro-black');
      titleBar.classList.add('bg-black', 'text-white');
    }
  }

  windowsAndTabs.forEach(el => {
    el.addEventListener('mousedown', () => bringToFront(el));
    el.addEventListener('touchstart', () => bringToFront(el));
  });

  // --- CRT System Status Log Simulation ---
  const crtLogs = [
    "LOADING SYSTEM ARCHITECTURE...",
    "INIT SYSTEM CORE V4.0.0... OK",
    "CHECKING MEMORY REGISTERS... 640KB OK",
    "LOADING PORTFOLIO MODULES... DONE",
    "MOUNTING PROJECTS FILESYSTEM... OK",
    "MOUNTING BLOG DATABASE... OK",
    "CONNECTING TO PRANAV_ENGINE... LINKED",
    "SYSTEM_READY // STATUS: OK"
  ];
  
  const logContainer = document.getElementById('crt-log-lines');
  if (logContainer) {
    let logIndex = 0;
    
    function addLogLine() {
      if (logIndex < crtLogs.length) {
        const line = document.createElement('div');
        line.className = 'font-mono text-xs mb-1 text-black';
        line.innerHTML = `<span class="text-retro-gray">></span> ${crtLogs[logIndex]}`;
        logContainer.appendChild(line);
        logContainer.scrollTop = logContainer.scrollHeight;
        logIndex++;
        setTimeout(addLogLine, 600);
      } else {
        // Simple repeating ping status to show it's active
        setInterval(() => {
          const pingLine = document.createElement('div');
          pingLine.className = 'font-mono text-xs text-black opacity-80';
          const time = new Date().toLocaleTimeString();
          pingLine.innerHTML = `<span class="text-retro-gray">[${time}]</span> KEEPALIVE_PING // ACK`;
          logContainer.appendChild(pingLine);
          logContainer.scrollTop = logContainer.scrollHeight;
          // Keep it clean, delete old lines if count is high
          if (logContainer.children.length > 12) {
            logContainer.removeChild(logContainer.firstChild);
          }
        }, 5000);
      }
    }
    
    // Start logs after brief load delay
    setTimeout(addLogLine, 500);
  }

  // --- Technical Log Stack Tabs Manager ---
  const stackTabs = document.querySelectorAll('.stacked-tab');
  stackTabs.forEach((tab, index) => {
    // Initial staggered layout offsets for stacked visual presentation on desktop
    if (window.innerWidth >= 768) {
      tab.style.transform = `translate(${index * 24}px, ${index * 24}px)`;
    }
    
    tab.addEventListener('click', () => {
      // Bring tab forward and give it focus styling
      bringToFront(tab);
    });
  });

  // Handle window resizing to adjust stacked layout offsets
  window.addEventListener('resize', () => {
    stackTabs.forEach((tab, index) => {
      if (window.innerWidth >= 768) {
        tab.style.transform = `translate(${index * 24}px, ${index * 24}px)`;
      } else {
        tab.style.transform = 'none';
      }
    });
  });

  // --- Mobile Dropdown Navigation ("Classic Desktop Menu") ---
  const menuToggle = document.getElementById('menu-toggle');
  const navDropdown = document.getElementById('nav-dropdown');

  if (menuToggle && navDropdown) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navDropdown.classList.toggle('hidden');
    });

    // Close when clicking outside
    document.addEventListener('click', () => {
      navDropdown.classList.add('hidden');
    });

    navDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // --- Simulated Application Window Controls ---
  const closeButtons = document.querySelectorAll('.win-close-btn');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const win = btn.closest('.retro-window');
      if (win) {
        win.style.display = 'none';
        
        // Show a restore link or just output to log
        const sysBadge = document.getElementById('system-status-badge');
        if (sysBadge) {
          sysBadge.textContent = "WINDOW_CLOSED // OK";
          sysBadge.classList.remove('bg-black', 'text-white');
          sysBadge.classList.add('bg-white', 'text-black', 'border-black');
          setTimeout(() => {
            sysBadge.textContent = "SYSTEM_READY // OK";
            sysBadge.classList.remove('bg-white', 'text-black');
            sysBadge.classList.add('bg-black', 'text-white');
          }, 3000);
        }
      }
    });
  });

  // --- GitHub API Integration & Retro IDE Simulator ---
  const fallbacks = {
    "AdepuPranav/CS_ChatBotDiscord_-Rude-_VERSION-": {
      stars: 12,
      issues: 0,
      commit: "Implement async Discord message handlers and bot client",
      code: `using System;
using System.Threading.Tasks;
using Discord;
using Discord.WebSocket;

namespace RudeDiscordBot
{
    public class Program
    {
        private DiscordSocketClient _client;

        public static Task Main(string[] args) => new Program().MainAsync();

        public async Task MainAsync()
        {
            _client = new DiscordSocketClient();
            _client.MessageReceived += MessageReceivedAsync;
            await _client.LoginAsync(TokenType.Bot, "MOCK_TOKEN");
            await _client.StartAsync();
            await Task.Delay(-1);
        }

        private async Task MessageReceivedAsync(SocketMessage message)
        {
            if (message.Content.StartsWith("!hello"))
            {
                await message.Channel.SendMessageAsync("System Busy. Go away!");
            }
        }
    }
}`
    },
    "AdepuPranav/AI-based-Smart-Traffic-Optimization-System": {
      stars: 18,
      issues: 1,
      commit: "Incorporate computer vision contours vehicle counting module",
      code: `import cv2
import numpy as np

class TrafficOptimizer:
    def __init__(self, camera_id=0):
        self.cap = cv2.VideoCapture(camera_id)
        self.back_sub = cv2.createBackgroundSubtractorMOG2()

    def count_vehicles(self):
        ret, frame = self.cap.read()
        if not ret:
            return 0
        fg_mask = self.back_sub.apply(frame)
        contours, _ = cv2.findContours(fg_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        vehicles = 0
        for cnt in contours:
            if cv2.contourArea(cnt) > 500:
                vehicles += 1
        return vehicles

    def optimize_signal(self, vehicle_count):
        if vehicle_count > 15:
            return "GREEN_EXTEND // 45s"
        return "GREEN_STANDARD // 20s"`
    },
    "AdepuPranav/TorrentConsole": {
      stars: 24,
      issues: 0,
      commit: "Refactor peer socket handshake validation pipeline",
      code: `using System;
using System.Net.Sockets;
using System.Security.Cryptography;

namespace BitTorrentClient
{
    public class PieceDownloader
    {
        private TcpClient _client;
        private byte[] _infoHash;

        public PieceDownloader(string host, int port, byte[] infoHash)
        {
            _client = new TcpClient(host, port);
            _infoHash = infoHash;
        }

        public bool SendHandshake()
        {
            var stream = _client.GetStream();
            byte[] handshake = new byte[68];
            handshake[0] = 19;
            System.Text.Encoding.UTF8.GetBytes("BitTorrent protocol").CopyTo(handshake, 1);
            _infoHash.CopyTo(handshake, 28);
            stream.Write(handshake, 0, 68);
            
            byte[] response = new byte[68];
            stream.Read(response, 0, 68);
            return response[0] == 19;
        }
    }
}`
    },
    "AdepuPranav/ML-based-system-log-analyzer-using-Isolation-Forest-for-anomaly-detection": {
      stars: 15,
      issues: 2,
      commit: "Train scikit isolation forest model on log features dataset",
      code: `import pandas as pd
from sklearn.ensemble import IsolationForest

class LogAnomalyDetector:
    def __init__(self, contamination=0.01):
        self.model = IsolationForest(contamination=contamination, random_state=42)

    def train(self, log_features):
        df = pd.DataFrame(log_features)
        self.model.fit(df)

    def detect(self, log_entry):
        prediction = self.model.predict([log_entry])
        return "ANOMALY_DETECTED // CRITICAL" if prediction[0] == -1 else "INFO // NORMAL"`
    },
    "AdepuPranav/ChunkKeeper": {
      stars: 20,
      issues: 0,
      commit: "Integrate Go File WriteAt chunk alignment mapping",
      code: `package main

import (
	"fmt"
	"os"
)

type ChunkManager struct {
	file *os.File
	size int64
}

func NewChunkManager(path string) (*ChunkManager, error) {
	file, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE, 0644)
	if err != nil {
		return nil, err
	}
	return &ChunkManager{file: file, size: 0}, nil
}

func (cm *ChunkManager) WriteChunk(id int, data []byte) error {
	offset := int64(id * 4096)
	_, err := cm.file.WriteAt(data, offset)
	return err
}`
    },
    "AdepuPranav/HealthCare": {
      stars: 30,
      issues: 1,
      commit: "Initialize Azure health credentials and LUIS authoring client",
      code: `const { CognitiveServicesCredentials } = require("@azure/ms-rest-js");
const { LUISAuthoringClient } = require("@azure/cognitiveservices-luis-authoring");

class AzureHealthAssistant {
    constructor(endpoint, key) {
        const credentials = new CognitiveServicesCredentials(key);
        this.client = new LUISAuthoringClient(credentials, endpoint);
    }

    async analyzeTriage(utterance) {
        try {
            // Simulated Azure Cognitive text categorization endpoint parsing
            if (utterance.includes("fever") || utterance.includes("pain")) {
                return { triageStatus: "RECOMMEND_GP", severity: "MEDIUM" };
            }
            return { triageStatus: "MONITOR_SYMPTOMS", severity: "LOW" };
        } catch (err) {
            console.error("Azure NLP request failed:", err);
            return { error: "SERVICE_OFFLINE" };
        }
    }
}

module.exports = AzureHealthAssistant;`
    }
  };

  async function fetchGitHubData() {
    const projects = document.querySelectorAll('.retro-window[data-repo]');
    for (const project of projects) {
      const repo = project.getAttribute('data-repo');
      const starsEl = project.querySelector('.repo-stars');
      const issuesEl = project.querySelector('.repo-issues');
      const commitEl = project.querySelector('.repo-commit');
      
      // Load fallback data initially
      const fallback = fallbacks[repo];
      if (fallback) {
        if (starsEl) starsEl.textContent = fallback.stars;
        if (issuesEl) issuesEl.textContent = fallback.issues;
        if (commitEl) commitEl.textContent = fallback.commit;
      }
      
      try {
        // Fetch metadata (stars, open issues)
        const metaResponse = await fetch(`https://api.github.com/repos/${repo}`);
        if (!metaResponse.ok) throw new Error("API rate-limited or repo not found");
        const metaData = await metaResponse.json();
        
        if (starsEl) starsEl.textContent = metaData.stargazers_count;
        if (issuesEl) issuesEl.textContent = metaData.open_issues_count;
        
        // Fetch latest commit message
        const commitResponse = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`);
        if (commitResponse.ok) {
          const commitData = await commitResponse.json();
          if (commitData && commitData.length > 0 && commitEl) {
            commitEl.textContent = commitData[0].commit.message;
          }
        }
      } catch (err) {
        console.warn(`GitHub API lookup failed for ${repo}. Using offline database standard default.`, err);
        // Fallbacks are already populated
      }
    }
  }

  // --- Retro IDE View Toggle Controller ---
  const exploreButtons = document.querySelectorAll('.explore-code-btn');
  exploreButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const projectWindow = btn.closest('.retro-window');
      if (!projectWindow) return;

      const repo = projectWindow.getAttribute('data-repo');
      const filePath = projectWindow.getAttribute('data-file-path');
      const container = projectWindow.querySelector('.card-body-container');
      const originalContent = container.querySelector('.original-card-content');
      const ideContainer = container.querySelector('.retro-ide-container');
      const codeViewer = ideContainer.querySelector('.ide-code-viewer');

      // Swap view layer visibility
      originalContent.classList.add('hidden');
      ideContainer.classList.remove('hidden');
      codeViewer.textContent = "FETCHING REMOTE SOURCE CODE...\n==================================\nConnecting to raw.githubusercontent.com...";

      // Bring window to focus
      bringToFront(projectWindow);

      // Attempt to load code
      try {
        const rawUrl = `https://raw.githubusercontent.com/${repo}/main/${filePath}`;
        const response = await fetch(rawUrl);
        if (response.ok) {
          const codeText = await response.text();
          codeViewer.textContent = codeText;
        } else {
          // Try master branch as alternative fallback
          const backupUrl = `https://raw.githubusercontent.com/${repo}/master/${filePath}`;
          const backupResponse = await fetch(backupUrl);
          if (backupResponse.ok) {
            const codeText = await backupResponse.text();
            codeViewer.textContent = codeText;
          } else {
            throw new Error("Source file not found on main/master branch");
          }
        }
      } catch (err) {
        console.warn("Could not retrieve online codebase raw file. Falling back to local IDE emulator cache.", err);
        const fallback = fallbacks[repo];
        if (fallback) {
          codeViewer.textContent = `// LOCAL_CACHE_FALLBACK (GitHub Connection Offline)\n// FILE: ${filePath}\n\n${fallback.code}`;
        } else {
          codeViewer.textContent = `Error: Codebase could not be retrieved.\nReason: ${err.message}`;
        }
      }
    });
  });

  // IDE Close controller
  const ideCloseButtons = document.querySelectorAll('.ide-close-btn');
  ideCloseButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectWindow = btn.closest('.retro-window');
      if (!projectWindow) return;

      const container = projectWindow.querySelector('.card-body-container');
      const originalContent = container.querySelector('.original-card-content');
      const ideContainer = container.querySelector('.retro-ide-container');

      ideContainer.classList.add('hidden');
      originalContent.classList.remove('hidden');
    });
  });

  // Initialize GitHub fetch process
  fetchGitHubData();

  // --- Contact Form Submission to MongoDB ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'TRANSMITTING...';
      
      const payload = {
        name: nameInput.value,
        email: emailInput.value,
        text: messageInput.value
      };
      
      const apiURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000/api/messages'
        : '/api/messages';
        
      try {
        const response = await fetch(apiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        
        if (!response.ok) throw new Error('API response error');
        
        alert('Message Queued Successfully');
        contactForm.reset();
      } catch (err) {
        console.warn('Express backend message webhook offline. Mocking submission alert.', err);
        alert('Connection error.\nMessage Mocked successfully locally.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }

  // Focus the first window by default
  const firstWindow = document.querySelector('.retro-window');
  if (firstWindow) {
    bringToFront(firstWindow);
  }
});
