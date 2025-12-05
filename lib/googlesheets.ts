
import { google } from 'googleapis';

export async function getSheetData(spreadsheetId: string, range: string) {
  // Authenticate with Google Sheets API using environment variables
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      // The private key is read from the environment variable and newlines are un-escaped
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  try {
    // Fetch spreadsheet data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return response.data.values;
  } catch (err) {
    console.error('Error fetching sheet data:', err);
    // In case of an error, throw an exception to be handled by the calling function
    throw new Error('Could not fetch sheet data from Google Sheets API.');
  }
}
