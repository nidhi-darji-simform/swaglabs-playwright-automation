// "This utility provides centralized logging throughout the framework.
// Instead of using console.log everywhere, I created reusable logging methods."

// logger.js
const logger = {
  info: (msg) => console.log(`[INFO] ${new Date().toISOString()} - ${msg}`),
  error: (msg) => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`),
  warn: (msg) => console.warn(`[WARN] ${new Date().toISOString()} - ${msg}`)
};

module.exports = logger;
