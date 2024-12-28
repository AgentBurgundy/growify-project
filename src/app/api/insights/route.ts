import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = "https://api.growify.ai/v1";
const SERVICES = [1792, 898];
const MAX_ITEMS = 5;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const breakdown = searchParams.get("breakdown");
  const since = searchParams.get("since");
  const until = searchParams.get("until");

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const promises = SERVICES.map((serviceId) =>
      fetch(
        `${API_BASE}/creatives/service/${serviceId}/insights?since=${since}&until=${until}&breakdowns=${breakdown}`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
            "Content-Type": "application/json",
          },
        }
      ).then(async (res) => {
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        console.log(`Service ${serviceId} response:`, data);
        return data;
      })
    );

    const responses = await Promise.all(promises);
    console.log("All responses:", responses);

    // Transform and merge the data from both services
    const mergedData = {
      data: responses
        .flatMap((response) => {
          if (!response || !response.items) {
            console.warn("Invalid response format:", response);
            return [];
          }
          return response.items.map((item: any) => ({
            creative: {
              id: item.creative.id,
              name: item.creative.name,
              type: item.creative.type,
              url: item.creative.url,
              text: item.creative.text,
              thumbnail: item.creative.thumbnail,
            },
            insights: {
              entityCounter: item.insights.entityCounter,
              spend: item.insights.spend,
              conversionValue: item.insights.conversionValue,
              conversions: item.insights.conversions,
              impressions: item.insights.impressions,
              clicks: item.insights.clicks,
              videoPlay3s: item.insights.videoPlay3s,
            },
            target: {
              accountId: item.target.accountId,
              accountName: item.target.accountName,
              serviceId: item.target.serviceId,
              serviceType: item.target.serviceType,
            },
          }));
        })
        // Sort by spend in descending order
        .sort((a, b) => b.insights.spend - a.insights.spend)
        // Limit to MAX_ITEMS
        .slice(0, MAX_ITEMS),
    };

    return NextResponse.json(mergedData);
  } catch (error) {
    console.error("Failed to fetch insights:", error);
    if (error instanceof Error) {
      console.error({
        message: error.message,
        stack: error.stack,
        cause: error.cause,
      });
    }
    return NextResponse.json(
      { error: "Failed to fetch insights", details: String(error) },
      { status: 500 }
    );
  }
}
