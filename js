// ================================
//  Quant Signal Tracker — app.js
//  Built with research + vibe coding
//  Author: [Shourya Raj]
// ================================

// ---------- STATE ----------
// signals array stores all submitted signals
let signals = [];

// currentSignal stores which button is selected (BUY/SELL/HOLD)
let currentSignal = "BUY";

// leaderboard data (mock researchers with scores)
let researchers = [
  { name: "Researcher_7f2a", signals: 24, accuracy: 78 },
  { name: "Researcher_3c9d", signals: 18, accuracy: 71 },
  { name: "Researcher_b1e5", signals: 31, accuracy: 68 },
  { name: "Researcher_a44f", signals: 12, accuracy: 65 },
  { name: "Researcher_0d8c", signals: 9,  accuracy: 61 },
];

// Some mock signals to pre-fill the feed so it doesn't look empty
let mockSignals = [
  { symbol: "RELIANCE",   type: "BUY",  confidence: 75, horizon: "1W", time: "2 min ago" },
  { symbol: "TCS",        type: "SELL", confidence: 60, horizon: "1D", time: "8 min ago" },
  { symbol: "HDFCBANK",   type: "HOLD", confidence: 55, horizon: "1M", time: "15 min ago" },
  { symbol: "INFY",       type: "BUY",  confidence: 82, horizon: "1W", time: "21 min ago" },
  { symbol: "BAJFINANCE", type: "SELL", confidence: 70, horizon: "3M", time: "34 min ago" },
];


// ---------- ON PAGE LOAD ----------
window.onload = function () {
  renderFeed();       // show mock signals in feed
  renderLeaderboard(); // show leaderboard
  updateStats();       // update top stats bar
};


// ---------- SIGNAL TYPE SELECTION ----------
// This runs when user clicks BUY / SELL / HOLD button
function selectSignal(type) {
  currentSignal = type;

  // Remove 'active' class from all buttons first
  document.getElementById("btn-buy").classList.remove("active", "buy");
  document.getElementById("btn-sell").classList.remove("active", "sell");
  document.getElementById("btn-hold").classList.remove("active", "hold");

  // Add active class to the clicked button
  if (type === "BUY") {
    document.getElementById("btn-buy").classList.add("active", "buy");
  } else if (type === "SELL") {
    document.getElementById("btn-sell").classList.add("active", "sell");
  } else {
    document.getElementById("btn-hold").classList.add("active", "hold");
  }
}


// ---------- SUBMIT SIGNAL ----------
function submitSignal() {
  // Read all form values
  const symbol     = document.getElementById("symbol").value.trim().toUpperCase();
  const confidence = document.getElementById("confidence").value;
  const target     = document.getElementById("target").value;
  const horizon    = document.getElementById("horizon").value;
  const reason     = document.getElementById("reason").value.trim();

  // Basic validation — symbol is required
  if (!symbol) {
    alert("Please enter a stock symbol.");
    return;
  }

  // Build the new signal object
  const newSignal = {
    symbol:     symbol,
    type:       currentSignal,
    confidence: parseInt(confidence),
    target:     target ? "₹" + target : null,
    horizon:    horizon,
    reason:     reason,
    time:       "just now",
  };

  // Add to beginning of array so newest shows first
  signals.unshift(newSignal);

  // Also add to mockSignals so it shows in the feed
  mockSignals.unshift(newSignal);

  // Update the UI
  renderFeed();
  updateStats();
  showToast("Signal submitted! 🎯");
  resetForm();
}


// ---------- RENDER SIGNAL FEED ----------
// Reads from mockSignals and creates HTML cards
function renderFeed() {
  const feed = document.getElementById("signal-feed");
  feed.innerHTML = ""; // clear old content

  // Show max 8 signals in the feed
  const toShow = mockSignals.slice(0, 8);

  toShow.forEach(function (signal) {
    const badgeClass = getBadgeClass(signal.type);

    // Build the HTML for one signal card
    const card = document.createElement("div");
    card.className = "signal-item";
    card.innerHTML = `
      <div class="signal-left">
        <span class="signal-symbol">${signal.symbol}</span>
        <span class="signal-meta">${signal.horizon} horizon · ${signal.time}</span>
      </div>
      <div class="signal-right">
        <span class="signal-badge ${badgeClass}">${signal.type}</span>
        <span class="signal-conf">Confidence: ${signal.confidence}%</span>
      </div>
    `;
    feed.appendChild(card);
  });
}


// ---------- RENDER LEADERBOARD ----------
function renderLeaderboard() {
  const lb = document.getElementById("leaderboard");
  lb.innerHTML = "";

  researchers.forEach(function (r, index) {
    const rankClass = index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : "";
    const rankText  = index + 1;

    const row = document.createElement("div");
    row.className = "lb-row";
    row.innerHTML = `
      <span class="lb-rank ${rankClass}">#${rankText}</span>
      <span class="lb-name">${r.name}</span>
      <span class="lb-signals">${r.signals} signals</span>
      <span class="lb-score">${r.accuracy}%</span>
    `;
    lb.appendChild(row);
  });
}


// ---------- UPDATE STATS BAR ----------
function updateStats() {
  const total = mockSignals.length;

  // Calculate average confidence as a rough proxy for "accuracy"
  const avgConf = Math.round(
    mockSignals.reduce(function (sum, s) { return sum + s.confidence; }, 0) / total
  );

  document.getElementById("total-signals").textContent    = total;
  document.getElementById("avg-accuracy").textContent     = avgConf + "%";
  document.getElementById("active-researchers").textContent = researchers.length;
}


// ---------- TOAST NOTIFICATION ----------
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");

  // Hide after 3 seconds
  setTimeout(function () {
    toast.classList.add("hidden");
  }, 3000);
}


// ---------- RESET FORM ----------
function resetForm() {
  document.getElementById("symbol").value     = "";
  document.getElementById("confidence").value  = 50;
  document.getElementById("confidence-label").textContent = "50%";
  document.getElementById("target").value     = "";
  document.getElementById("reason").value     = "";
  document.getElementById("horizon").value    = "1W";
  selectSignal("BUY"); // reset to BUY
}


// ---------- HELPER FUNCTIONS ----------

// Returns the right CSS class for the signal badge color
function getBadgeClass(type) {
  if (type === "BUY")  return "badge-buy";
  if (type === "SELL") return "badge-sell";
  return "badge-hold";
}
