from django import forms
from .models import EventRegistration, Membership, Event, ContactMessage


class EventForm(forms.ModelForm):
    class Meta:
        model = EventRegistration
        fields = ['full_name', 'email', 'student_id', 'event']
        labels = {
            'full_name': 'نام و نام خانوادگی',
            'email': 'ایمیل',
            'student_id': 'شماره دانشجویی',
            'event': 'انتخاب رویداد',
        }
        widgets = {
            'full_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'نام و نام خانوادگی خود را وارد کنید'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'ایمیل خود را وارد کنید'
            }),
            'student_id': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'شماره دانشجویی (اختیاری)'
            }),
            'event': forms.Select(attrs={
                'class': 'form-control'
            }),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # فقط رویدادهای منتشر شده و باز برای ثبت‌نام را نمایش بده
        self.fields['event'].queryset = Event.objects.filter(
            is_published=True, 
            registration_open=True
        ).order_by('-event_date', '-created_at')
        # فیلد event را required کن (در سطح form validation)
        self.fields['event'].required = True


class MembershipForm(forms.ModelForm):
    class Meta:
        model = Membership
        fields = ['name', 'email', 'phone', 'role', 'interest']
        labels = {
            'name': 'نام و نام خانوادگی',
            'email': 'ایمیل',
            'phone': 'شماره تماس',
            'role': 'نقش',
            'interest': 'زمینه علاقه‌مندی',
        }
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'نام و نام خانوادگی خود را وارد کنید'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'ایمیل خود را وارد کنید'
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'شماره تماس خود را وارد کنید'
            }),
            'role': forms.Select(attrs={
                'class': 'form-control'
            }),
            'interest': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'رمزنگاری، امنیت شبکه، هوش مصنوعی، ...',
                'rows': 4
            }),
        }



class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['full_name', 'email', 'phone', 'subject', 'message']
        labels = {
            'full_name': 'نام و نام خانوادگی',
            'email': 'ایمیل',
            'phone': 'شماره تماس',
            'subject': 'موضوع',
            'message': 'پیام شما',
        }
        widgets = {
            'full_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'نام و نام خانوادگی خود را وارد کنید'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'ایمیل خود را وارد کنید'
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'شماره تماس (اختیاری)'
            }),
            'subject': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'موضوع پیام خود را وارد کنید'
            }),
            'message': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'پیام خود را اینجا بنویسید...',
                'rows': 6
            }),
        }
