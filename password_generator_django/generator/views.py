from django.http import JsonResponse
import random
import string
import json


def generate_password(request):
    if request.method == "POST":
        data = json.loads(request.body)

        total = int(data.get("total", 0))
        letters = int(data.get("letters", 0))
        numbers = int(data.get("numbers", 0))
        symbols = int(data.get("symbols", 0))

        letters_set = string.ascii_letters
        numbers_set = string.digits
        symbols_set = "!@#$%^&*()_+"

        password = (
            "".join(random.choice(letters_set) for _ in range(letters)) +
            "".join(random.choice(numbers_set) for _ in range(numbers)) +
            "".join(random.choice(symbols_set) for _ in range(symbols))
        )

        password = ''.join(random.sample(password, len(password)))

        return JsonResponse({"password": password})

    return JsonResponse({"error": "Invalid request"}, status=400)


