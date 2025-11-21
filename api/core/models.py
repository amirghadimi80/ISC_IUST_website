from django.db import models

# Create your models here.

class EventRegistration(models.Model):
    full_name = models.CharField(max_length=200, verbose_name='نام و نام خانوادگی')
    email = models.EmailField(verbose_name='ایمیل')
    student_id = models.CharField(max_length=50, blank=True, null=True, verbose_name='شماره دانشجویی')
    event = models.ForeignKey('Event', on_delete=models.CASCADE, related_name='registrations', blank=True, null=True, verbose_name='رویداد')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ثبت')
    
    class Meta:
        verbose_name = 'ثبت‌نام رویداد'
        verbose_name_plural = 'ثبت‌نام‌های رویداد'
        ordering = ['-created_at']
    
    def __str__(self):
        if self.event:
            return f"{self.full_name} - {self.event.title}"
        return f"{self.full_name}"


class Membership(models.Model):
    ROLE_CHOICES = [
        ('student', 'دانشجو'),
        ('researcher', 'پژوهشگر'),
        ('faculty', 'عضو هیئت علمی'),
    ]
    
    name = models.CharField(max_length=200, verbose_name='نام و نام خانوادگی')
    email = models.EmailField(verbose_name='ایمیل')
    phone = models.CharField(max_length=20, verbose_name='شماره تماس')
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, verbose_name='نقش')
    interest = models.TextField(blank=True, null=True, verbose_name='زمینه علاقه‌مندی')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ثبت')
    
    class Meta:
        verbose_name = 'عضویت'
        verbose_name_plural = 'عضویت‌ها'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.get_role_display()}"


class News(models.Model):
    title = models.CharField(max_length=200, verbose_name='عنوان خبر')
    content = models.TextField(verbose_name='متن خبر')
    image = models.ImageField(upload_to='news/', blank=True, null=True, verbose_name='تصویر خبر')
    is_published = models.BooleanField(default=True, verbose_name='منتشر شده')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='تاریخ به‌روزرسانی')
    
    class Meta:
        verbose_name = 'خبر'
        verbose_name_plural = 'اخبار'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title


class Event(models.Model):
    EVENT_TYPE_CHOICES = [
        ('workshop', 'کارگاه'),
        ('course', 'دوره'),
        ('seminar', 'سمینار'),
        ('ctf', 'مسابقه CTF'),
        ('conference', 'همایش'),
        ('other', 'سایر'),
    ]
    
    title = models.CharField(max_length=200, verbose_name='عنوان رویداد/دوره')
    description = models.TextField(verbose_name='توضیحات')
    event_type = models.CharField(max_length=50, choices=EVENT_TYPE_CHOICES, default='other', verbose_name='نوع رویداد')
    event_date = models.DateTimeField(blank=True, null=True, verbose_name='تاریخ و زمان رویداد')
    location = models.CharField(max_length=200, blank=True, null=True, verbose_name='مکان برگزاری')
    image = models.ImageField(upload_to='events/', blank=True, null=True, verbose_name='تصویر رویداد')
    is_published = models.BooleanField(default=True, verbose_name='منتشر شده')
    registration_open = models.BooleanField(default=True, verbose_name='ثبت‌نام باز است')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='تاریخ به‌روزرسانی')
    
    class Meta:
        verbose_name = 'رویداد/دوره'
        verbose_name_plural = 'رویدادها و دوره‌ها'
        ordering = ['-event_date', '-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.get_event_type_display()}"


class GalleryImage(models.Model):
    title = models.CharField(max_length=100, verbose_name='عنوان تصویر')
    caption = models.CharField(max_length=200, blank=True, null=True, verbose_name='توضیح تصویر')
    image = models.ImageField(upload_to='images/gallery/', verbose_name='فایل تصویر')
    is_active = models.BooleanField(default=True, verbose_name='فعال باشد')
    order = models.PositiveIntegerField(default=0, verbose_name='ترتیب نمایش')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ افزوده‌شدن')

    class Meta:
        verbose_name = 'تصویر گالری'
        verbose_name_plural = 'تصاویر گالری'
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    full_name = models.CharField(max_length=200, verbose_name='نام و نام خانوادگی')
    email = models.EmailField(verbose_name='ایمیل')
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name='شماره تماس')
    subject = models.CharField(max_length=200, verbose_name='موضوع')
    message = models.TextField(verbose_name='پیام')
    is_read = models.BooleanField(default=False, verbose_name='خوانده شده')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ارسال')
    
    class Meta:
        verbose_name = 'پیام تماس'
        verbose_name_plural = 'پیام‌های تماس'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.full_name} - {self.subject}"
