import { getUserId } from "@/lib/auth";
import { fetchExportIncome } from "@/lib/data";

export async function GET(request: Request) {
  const userIdCookie = await getUserId();
  const userId = userIdCookie?.value;
  if (!userId) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const incomeItems = await fetchExportIncome(userId);

    const fastapiUrl = process.env.FASTAPI_EXPORT_URL;
    const response = await fetch(`${fastapiUrl}/generate-csv-income`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: incomeItems,
        headers: ["description", "amount", "date"],
        filename: "income.csv",
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return new Response(text, { status: response.status });
    }

    const blob = await response.blob();
    return new Response(blob, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="income.csv"',
      },
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
