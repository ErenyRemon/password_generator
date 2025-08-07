from django.shortcuts import render
import random
import string

def index(request):
    password = ''
    error = ''
    strength = ''
    
    if request.method == 'POST':
        try:
            total = int(request.POST.get('total'))
            letters = int(request.POST.get('letters'))
            numbers = int(request.POST.get('numbers'))
            symbols = int(request.POST.get('symbols'))

            if total != letters + numbers + symbols:
                error = "❌ المجموع لا يساوي العدد الكلي"
            else:
                password_chars = (
                    random.choices(string.ascii_letters, k=letters) +
                    random.choices(string.digits, k=numbers) +
                    random.choices(string.punctuation, k=symbols)
                )
                random.shuffle(password_chars)
                password = ''.join(password_chars)

                # تقييم الأمان
                if total < 8:
                    strength = 'ضعيف'
                elif total < 12:
                    strength = 'متوسط'
                else:
                    strength = 'قوي'
        except:
            error = "❌ يرجى إدخال أرقام صحيحة"

    return render(request, 'generator/index.html', {
        'password': password,
        'error': error,
        'strength': strength,
    })
