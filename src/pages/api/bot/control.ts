import type { APIRoute } from 'astro';
import botManager from '../../../lib/botManager';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { action } = body;

        if (action === 'start') {
            botManager.start();
            return new Response(JSON.stringify({ success: true, message: 'Bot started' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else if (action === 'stop') {
            botManager.stop();
            return new Response(JSON.stringify({ success: true, message: 'Bot stopped' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            return new Response(JSON.stringify({ success: false, message: 'Invalid action' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
