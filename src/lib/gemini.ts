export async function getFoodRecommendations(userHistory: string[], preferences: string) {
  try {
    const response = await fetch("/api/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        history: userHistory,
        preferences,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch recommendations: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("AI Recommendation error:", error);
    return [];
  }
}
