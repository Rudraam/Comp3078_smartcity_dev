from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .openai_service import get_city_assistant_response

@api_view(['POST'])
def ai_chat(request):
    city_name = request.data.get('cityName')
    message = request.data.get('message')
    history = request.data.get('history', [])

    if not city_name or not message:
        return Response(
            {'error': 'Missing required fields'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        response = get_city_assistant_response(city_name, message, history)
        return Response({'response': response})
    except Exception as e:
        return Response(
            {'error': 'Failed to get AI response', 'details': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
