
type ClientController = ReadableStreamDefaultController;

const clients: Record<string, ClientController[]> = {};

export function addSSEClient(roomId: string, controller: ClientController) {
  if (!clients[roomId]) clients[roomId] = [];
  clients[roomId].push(controller);
}

export function removeSSEClient(roomId: string, controller: ClientController) {
  if (clients[roomId]) {
    clients[roomId] = clients[roomId].filter(c => c !== controller);
    if (clients[roomId].length == 0) delete clients[roomId];
  }
}

export function broadcast(roomId: string, event: string, data: any) {
  if (!clients[roomId]) return;
  const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
  for (const controller of clients[roomId]) {
    controller.enqueue(message)
  }
}
