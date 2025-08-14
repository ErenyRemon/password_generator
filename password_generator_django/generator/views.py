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



# from django.shortcuts import render
# import random
# import string

# def index(request):
#     password = ''
#     error = ''
#     strength = ''
    
#     if request.method == 'POST':
#         try:
#             total = int(request.POST.get('total'))
#             letters = int(request.POST.get('letters'))
#             numbers = int(request.POST.get('numbers'))
#             symbols = int(request.POST.get('symbols'))

#             if total != letters + numbers + symbols:
#                 error = "❌ المجموع لا يساوي العدد الكلي"
#             else:
#                 password_chars = (
#                     random.choices(string.ascii_letters, k=letters) +
#                     random.choices(string.digits, k=numbers) +
#                     random.choices(string.punctuation, k=symbols)
#                 )
#                 random.shuffle(password_chars)
#                 password = ''.join(password_chars)

#                 # تقييم الأمان
#                 if total < 8:
#                     strength = 'ضعيف'
#                 elif total < 12:
#                     strength = 'متوسط'
#                 else:
#                     strength = 'قوي'
#         except:
#             error = "❌ يرجى إدخال أرقام صحيحة"

#     return render(request, 'generator/index.html', {
#         'password': password,
#         'error': error,
#         'strength': strength,
#     })
