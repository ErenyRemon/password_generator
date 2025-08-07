# استخدم Python الرسمي
FROM python:3.10

# تعيين مسار العمل داخل الحاوية
WORKDIR /app

# نسخ ملفات المشروع
COPY . .

# تثبيت التبعيات
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# عمل collectstatic بدون تدخل
RUN python manage.py collectstatic --noinput

# تحديد البورت
EXPOSE 8000

# تشغيل السيرفر
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
