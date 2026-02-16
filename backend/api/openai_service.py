import os
from openai import OpenAI
from django.conf import settings

def get_openai_client():
    api_key = os.getenv('OPENAI_API_KEY') or settings.OPENAI_API_KEY
    if not api_key:
        return None
    return OpenAI(api_key=api_key)

def get_city_assistant_response(city_name, user_message, conversation_history):
    client = get_openai_client()
    if not client:
        raise Exception("OpenAI API key not configured")
    
    system_prompt = f"""You are a helpful Smart City Assistant for {city_name}. You provide information about:
- Weather conditions and climate
- Air quality and pollution levels
- Local events and attractions
- Public transportation options (buses, metro, trains)
- Restaurant recommendations
- Hotel suggestions
- Travel tips and local insights

Be friendly, informative, and concise. Use your knowledge to provide accurate information about {city_name}."""

    messages = [{"role": "system", "content": system_prompt}]
    messages.extend(conversation_history)
    messages.append({"role": "user", "content": user_message})

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        max_tokens=500
    )

    return response.choices[0].message.content
