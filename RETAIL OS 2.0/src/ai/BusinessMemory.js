// VYAPAARSAATHI OS — BUSINESS MEMORY LAYER

class BusinessMemory {
  constructor() {
    this.memoryKey = "vyapaarsaathi_business_memory";
    this.data = this.loadMemory();
  }

  loadMemory() {
    try {
      const saved = localStorage.getItem(this.memoryKey);
      return saved ? JSON.parse(saved) : { queryHistory: [], intentCounts: {}, lastScan: null };
    } catch {
      return { queryHistory: [], intentCounts: {}, lastScan: null };
    }
  }

  recordIntent(intent, query) {
    this.data.queryHistory.unshift({ query, intent, timestamp: new Date().toISOString() });
    this.data.intentCounts[intent] = (this.data.intentCounts[intent] || 0) + 1;
    if (this.data.queryHistory.length > 50) this.data.queryHistory.pop();
    try {
      localStorage.setItem(this.memoryKey, JSON.stringify(this.data));
    } catch (e) {}
  }

  getTopIntents() {
    return Object.entries(this.data.intentCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([intent]) => intent);
  }
}

export const businessMemory = new BusinessMemory();
