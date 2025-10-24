import { NextResponse } from 'next/server';

interface NosyApiItem {
  code: string;
  ShortName: string;
  FullName: string;
  buying: number;
  selling: number;
  latest: number;
  changeRate: number;
  dayMin: number | null;
  dayMax: number | null;
  lastupdate: string;
}

interface NosyApiResponse {
  status: string;
  data: NosyApiItem[];
  creditUsed?: number;
  creditLeft?: number;
}

interface CurrencyData {
  buying: number;
  selling: number;
  change: number;
}

interface GoldPriceData {
  dolar: CurrencyData;
  euro: CurrencyData;
  gramAltin: CurrencyData;
  ingilizSterlini: CurrencyData;
  euroDolar: CurrencyData;
  onsAltin: CurrencyData;
  gumus: CurrencyData;
  altinGumus: CurrencyData;
}

export async function GET() {
  try {
    const apiKey = process.env.NOSY_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Fetch exchange rates from NosyAPI
    const response = await fetch(
      'https://www.nosyapi.com/apiv2/service/economy/currency/exchange-rate',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Nosy API Error:', response.status, errorText);
      return NextResponse.json(
        { error: `Nosy API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data: NosyApiResponse = await response.json();
    
    if (data.status !== 'success' || !data.data) {
      return NextResponse.json(
        { error: 'Invalid API response' },
        { status: 500 }
      );
    }

    // NosyAPI'den gelen verileri dönüştür
    const result: GoldPriceData = {
      dolar: { buying: 0, selling: 0, change: 0 },
      euro: { buying: 0, selling: 0, change: 0 },
      gramAltin: { buying: 0, selling: 0, change: 0 },
      ingilizSterlini: { buying: 0, selling: 0, change: 0 },
      euroDolar: { buying: 0, selling: 0, change: 0 },
      onsAltin: { buying: 0, selling: 0, change: 0 },
      gumus: { buying: 0, selling: 0, change: 0 },
      altinGumus: { buying: 0, selling: 0, change: 0 },
    };

    // API'den gelen verileri map et
    data.data.forEach((item) => {
      const currency: CurrencyData = {
        buying: item.buying,
        selling: item.selling,
        change: item.changeRate,
      };

      switch (item.code) {
        case 'USD':
          result.dolar = currency;
          break;
        case 'EUR':
          result.euro = currency;
          break;
        case 'gram-altin':
          result.gramAltin = currency;
          break;
        case 'GBP':
          result.ingilizSterlini = currency;
          break;
        case 'ons':
          result.onsAltin = currency;
          break;
        case 'gumus':
          result.gumus = currency;
          break;
      }
    });

    // Euro Dolar hesaplaması (EUR/USD)
    if (result.euro.buying > 0 && result.dolar.buying > 0) {
      result.euroDolar = {
        buying: result.euro.buying / result.dolar.buying,
        selling: result.euro.selling / result.dolar.selling,
        change: result.euro.change - result.dolar.change,
      };
    }

    // Altın/Gümüş oranı
    if (result.gramAltin.buying > 0 && result.gumus.buying > 0) {
      result.altinGumus = {
        buying: result.gramAltin.buying / result.gumus.buying,
        selling: result.gramAltin.selling / result.gumus.selling,
        change: 0, // Oran için değişim hesaplaması yapılabilir
      };
    }
    
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
