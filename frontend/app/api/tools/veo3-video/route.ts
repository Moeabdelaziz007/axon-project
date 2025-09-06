import { NextRequest, NextResponse } from 'next/server';

/**
 * API route to generate video using Veo3.
 * This route handles the secure call to the Veo3 API, keeping the API key server-side.
 */
export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const { prompt, duration = 10 } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required for video generation.' }, { status: 400 });
    }

    if (!process.env.RUNWAY_API_KEY) {
      return NextResponse.json({ error: 'RUNWAY_API_KEY is not configured on the server.' }, { status: 500 });
    }

    // Call the Veo3 API
    const response = await fetch('https://api.runwayml.com/v1/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        model: 'veo-3',
        duration,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Veo3 API Error:', errorData);
      return NextResponse.json({ error: errorData.message || 'Failed to generate video from Veo3.' }, { status: response.status });
    }

    const data = await response.json();
    const videoUrl = data.video_url; // Assuming the API returns video_url directly

    return NextResponse.json({ videoUrl, executionTime: Date.now() - startTime });

  } catch (error) {
    console.error('API Route Error (veo3-video):', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' }, { status: 500 });
  }
}
