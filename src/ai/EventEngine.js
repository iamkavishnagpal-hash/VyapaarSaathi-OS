// VYAPAARSAATHI OS — DOMAIN EVENT ENGINE

class EventEngine {
  constructor() {
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  emit(eventType, payload) {
    const event = {
      id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      type: eventType,
      payload
    };

    this.listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (err) {
        console.error("EventEngine listener error:", err);
      }
    });

    return event;
  }
}

export const eventEngine = new EventEngine();
