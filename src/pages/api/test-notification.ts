import type { APIRoute } from 'astro';
import { exec } from 'node:child_process';
import path from 'node:path';

export const POST: APIRoute = async () => {
    const botPath = path.resolve('gradechecker');

    return new Promise((resolve) => {
        exec(`${botPath} --test`, { cwd: process.cwd() }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Test notification failed: ${error.message}`);
                resolve(new Response(JSON.stringify({
                    success: false,
                    message: `Failed to send test: ${stderr || error.message}`
                }), { status: 500 }));
                return;
            }

            resolve(new Response(JSON.stringify({
                success: true,
                message: 'Test notification sent!'
            }), { status: 200 }));
        });
    });
};
