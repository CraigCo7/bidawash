import { NextResponse } from "next/server";
import { google } from "googleapis";

const SPREADSHEET_ID = "1ROV2aBc86tGrvwzrvsxyW20ixVTqZlcsUtFze0zfJ7E";
const SHEET_NAME = "Sheet1";

interface InterestFormBody {
  name: string;
  email: string;
  phone: string;
  address?: string;
  numberOfCars?: string;
  carModels?: string;
}

function isValidBody(body: unknown): body is InterestFormBody {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    b.email.trim().length > 0 &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0
  );
}

async function getAuthClient() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!credentials) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_KEY environment variable");
  }

  const parsed = JSON.parse(credentials);
  const auth = new google.auth.GoogleAuth({
    credentials: parsed,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return auth;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!isValidBody(body)) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 },
      );
    }

    const auth = await getAuthClient();
    const sheets = google.sheets({ version: "v4", auth });

    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      body.name.trim(),
      body.email.trim(),
      `'${body.phone.trim()}`,
      body.address?.trim() ?? "",
      body.numberOfCars?.trim() ?? "",
      body.carModels?.trim() ?? "",
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:G`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Interest form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again later." },
      { status: 500 },
    );
  }
}
