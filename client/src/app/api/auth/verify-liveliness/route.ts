
import { NextRequest } from 'next/server';

interface VerifyLivenessResponse {
    result?: any;
    error?: string;
}

export async function GET(request: NextRequest) {
    const url = new URL(request.url).searchParams.get('url');

    if (!url) {
        return new Response(JSON.stringify({ error: 'URL parameter is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const BACKEND_URL = process.env.VERIFICATION_SERVICE_BASE_URL as string;
        const response = await fetch(`${BACKEND_URL}/verify_liveness`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        });

        const data: VerifyLivenessResponse = await response.json();

        if (!response.ok) {
            return new Response(JSON.stringify({ error: data.error ?? 'Unknown error' }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ result: data.result }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error verifying image liveness:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
