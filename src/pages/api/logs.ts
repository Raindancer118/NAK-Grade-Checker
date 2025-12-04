import type { APIRoute } from 'astro';
import botManager from '../../lib/botManager';

export const GET: APIRoute = async () => {
    return new Response(JSON.stringify({
        logs: botManager.getLogs(),
        running: botManager.isRunning()
    }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
