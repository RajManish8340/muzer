import { addSSEClient, removeSSEClient } from "@/lib/sseClient";

export async function GET(request: Request, { params }: { params: Promise<{ roomId: string }> }) {

  const { roomId } = await params

  const stream = new ReadableStream({
    start(controller) {

      addSSEClient(roomId, controller);

      request.signal.addEventListener("abort", () => {
        removeSSEClient(roomId, controller);
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })

}
