import OpenAI from "openai";

// Reference: blueprint:javascript_openai integration
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getCityAssistantResponse(
  cityName: string,
  userMessage: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }>
): Promise<string> {
  try {
    const systemPrompt = `You are a helpful Smart City Assistant for ${cityName}. You provide information about:
- Weather conditions and climate
- Air quality and pollution levels
- Local events and attractions
- Public transportation options (buses, metro, trains)
- Restaurant recommendations
- Hotel suggestions
- Travel tips and local insights

Be friendly, informative, and concise. Use your knowledge to provide accurate information about ${cityName}.`;

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: userMessage }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: messages,
      max_completion_tokens: 500,
    });

    return response.choices[0].message.content || "I apologize, I couldn't generate a response.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to get AI response");
  }
}

export async function getCityRecommendations(
  cityName: string,
  category: "restaurants" | "hotels" | "attractions"
): Promise<string> {
  try {
    const prompt = `Provide 3 brief recommendations for ${category} in ${cityName}. 
    For each recommendation, include: name, brief description, and one key feature. 
    Format as JSON with this structure: { "recommendations": [{ "name": string, "description": string, "feature": string }] }`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are a travel expert providing concise recommendations. Always respond with valid JSON."
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 500,
    });

    return response.choices[0].message.content || "{}";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to get recommendations");
  }
}
