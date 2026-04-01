type ClientController = ReadableStreamDefaultController<Uint8Array>;
const encoder = new TextEncoder();

const globalClients = globalThis as unknown as {
  __sseClients: Record<string, Set<ClientController>>
};
if (!globalClients.__sseClients) globalClients.__sseClients = {};
const clients = globalClients.__sseClients;

export function addSSEClient(roomId: string, controller: ClientController) {
  if (!clients[roomId]) clients[roomId] = new Set();
  clients[roomId].add(controller);
}

export function removeSSEClient(roomId: string, controller: ClientController) {
  clients[roomId]?.delete(controller);
  if (clients[roomId]?.size === 0) delete clients[roomId];
}

export function broadcast(roomId: string, event: string, data: unknown) {
  const set = clients[roomId];

  console.log(`Broadcasting ${event} to room ${roomId} , clients ${set?.size ?? 0}`)
  if (!set || set.size === 0) return;

  // SSE format: "event: <name>\ndata: <json>\n\n"
  const message = encoder.encode(
    `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
  );

  for (const controller of set) {
    try {
      controller.enqueue(message);
    } catch {
      // Client already disconnected
      set.delete(controller);
    }
  }
}
