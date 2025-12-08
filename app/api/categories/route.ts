import { NextResponse } from 'next/server';
import { getStoreCategories } from '@/lib/googlesheets';

export async function GET() {
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!sheetId) {
      throw new Error("GOOGLE_SHEET_ID is not defined. Please check your .env.local file.");
    }
    const categories = await getStoreCategories(sheetId);
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error('[API/CATEGORIES] Failed to fetch categories:', error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
