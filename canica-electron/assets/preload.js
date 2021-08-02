// eslint-disable-next-line @typescript-eslint/no-var-requires
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'canica',
  {
    dispatchCommand: (command) => ipcRenderer.send(`annotatron:commands`, command),
    dispatchQuery: (query) => ipcRenderer.send(`annotatron:queries`, query),
    events$: {
      subscribe: (observer) => {
        const ipcHandler = (evt, payload) => observer(payload);

        ipcRenderer.on(`annotatron:results`, ipcHandler);
        ipcRenderer.on(`annotatron:errors`, ipcHandler);
        ipcRenderer.on(`annotatron:events`, ipcHandler);

        return {
          unsubscribe: function() {
            ipcRenderer.removeListener(`annotatron:results`, ipcHandler);
            ipcRenderer.removeListener(`annotatron:errors`, ipcHandler);
            ipcRenderer.removeListener(`annotatron:events`, ipcHandler);
          }
        };
      }
    }
  }
);
