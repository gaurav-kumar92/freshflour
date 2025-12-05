
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

export async function getSheetData(spreadsheetId: string, range: string) {
  console.log(`[getSheetData] Fetching data for spreadsheet: ${spreadsheetId}, range: ${range}`);
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    console.log(`[getSheetData] Successfully fetched data for range: ${range}`);
    return response.data.values;
  } catch (err) {
    console.error('[getSheetData] Error fetching sheet data:', err);
    throw new Error('Could not fetch sheet data from Google Sheets API.');
  }
}

export async function getStoreCategories(spreadsheetId: string) {
    console.log(`[getStoreCategories] Fetching categories for spreadsheet: ${spreadsheetId}`);
    const range = 'Categories!A:A';
    const data = await getSheetData(spreadsheetId, range);
    if (!data) {
        console.log('[getStoreCategories] No data returned for categories range.');
        return [];
    }

    // The data arrives as an array of arrays (e.g., [['single grain'], ['multi grain']]).
    // We use flat() to turn it into a single array, then map and filter.
    const categories = data
        .flat() 
        .map(category => String(category).trim())
        .filter(category => category); // Filter out any empty strings

    console.log(`[getStoreCategories] Found categories: ${categories.join(', ')}`);
    return categories;
}


export async function getProductBySku(spreadsheetId: string, sku: string) {
    if (!sku) {
        console.error("[Diagnostic] getProductBySku was called without a valid SKU.");
        return null;
    }

    const urlSku = sku.trim();
    console.log(`[Diagnostic] Searching for SKU: "${urlSku}"`);

    const range = 'Products!A:J';
    const data = await getSheetData(spreadsheetId, range);
    if (!data || data.length < 2) {
        console.error("[Diagnostic] No data or only a header row found.");
        return null;
    }

    const header = data.shift();
    if (!header) {
        console.error("[Diagnostic] Could not extract header row.");
        return null;
    }

    const skuIndex = header.map(h => h.toLowerCase()).indexOf('sku');
    if (skuIndex === -1) {
        console.error(`[Diagnostic] 'sku' column not found in header: [${header.join(', ')}]`);
        return null;
    }

    let productRow = null;
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (!row || !row[skuIndex]) continue;

        const sheetSkuAsString = String(row[skuIndex]).trim();

        if (sheetSkuAsString === urlSku) {
            productRow = row;
            console.log(`[Diagnostic] Match found at row ${i + 2}!`);
            break;
        }
    }

    if (!productRow) {
        console.error(`[Diagnostic] SKU "${urlSku}" not found in any of the ${data.length} data rows.`);
        return null;
    }

    const product = header.reduce((obj, key, index) => {
        obj[key.trim()] = productRow[index];
        return obj;
    }, {} as Record<string, any>);

    // Type conversions and price formatting
    if (product.price) product.price = Number(product.price);
    if (product.rating) product.rating = parseFloat(product.rating);
    if (product.review) product.review = parseInt(product.review, 10);
    if (product.inStock) product.inStock = String(product.inStock).toUpperCase() === 'TRUE';

    return product;
}


export async function getBestSellers(spreadsheetId: string) {
    const range = 'Products!A:J';
    const data = await getSheetData(spreadsheetId, range);
    if (!data || data.length < 2) return [];

    const header = data.shift();
    if (!header) return [];

    const lowerCaseHeader = header.map(h => h.toLowerCase());
    const skuIndex = lowerCaseHeader.indexOf('sku');
    const nameIndex = lowerCaseHeader.indexOf('name');
    const priceIndex = lowerCaseHeader.indexOf('price');
    const imageIndex = lowerCaseHeader.indexOf('image');
    const isBestsellerIndex = lowerCaseHeader.indexOf('isbestseller');

    return data
        .filter(row => row[isBestsellerIndex] && String(row[isBestsellerIndex]).toUpperCase() === 'TRUE')
        .map(row => ({
            sku: row[skuIndex] ? String(row[skuIndex]).trim() : '',
            name: row[nameIndex],
            price: row[priceIndex],
            image: "/flour3.jpg",
        }));
}

export async function getAllProductSkus(spreadsheetId: string) {
    const range = 'Products!A2:A';
    const data = await getSheetData(spreadsheetId, range);
    if (!data) return [];

    // Map over rows, trim the SKU, and filter out any that are empty or invalid.
    const skus = data
        .map(row => {
            const sku = row && row[0] ? String(row[0]).trim() : null;
            return sku ? { sku } : null;
        })
        .filter(Boolean); // This cleverly removes all null/undefined entries.

    return skus;
}
