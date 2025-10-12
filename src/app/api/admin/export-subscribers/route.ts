import { database } from "@/lib/supabase";

export async function GET() {
  try {
    const result = await database.exportNewsletterSubscribersToExcel();

    // Return the Excel file as a downloadable response
    return new Response(result.buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${result.fileName}"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to export subscribers",
      },
      { status: 500 }
    );
  }
}
