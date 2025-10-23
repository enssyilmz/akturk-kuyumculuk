import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GOLD_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Fetch Gold Price in USD from goldapi.io
    const myHeaders = new Headers();
    myHeaders.append('x-access-token', apiKey);
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      cache: 'no-store',
    };

    const response = await fetch(
      'https://www.goldapi.io/api/XAU/USD',
      requestOptions
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gold API Error:', response.status, errorText);
      return NextResponse.json(
        { error: `Gold API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const result = await response.json();
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching gold prices:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch gold prices', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
