const app = {
  state: {},
  events: new Map(),
};

app.emit = (eventName, ...args) => {
  let handlers = app.events.get(eventName) || [];
  for (let handler of handlers) {
    handler(...args);
  }
};

app.on = (eventName, handler) => {
  let handlers = app.events.get(eventName) || [];
  handlers.push(handler);
  app.events.set(eventName, handlers);
};

app.subscribeState = (stateKey, handler) => {
  app.on("updateState", (oldState, newState, key) => {
    if (stateKey == key) {
      handler(oldState, newState);
    }
  });
};

app.pushState = (key, value) => {
  const state = app.state[key] || [];
  state.push(value);
  app.setState(key, state);
};

app.setState = (key, value) => {
  const oldState = app.state[key];
  const newState = value;
  app.state[key] = newState;
  app.emit("updateState", oldState, newState, key);
};

app.getState = (key) => {
  return app.state[key];
};
