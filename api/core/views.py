from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import EventForm, MembershipForm, ContactForm
from .models import News, Event, GalleryImage


def home(request):
    event_form = EventForm()
    membership_form = MembershipForm()
    
    # Get published news
    news_list = News.objects.filter(is_published=True)[:5]  # Get latest 5 published news
    
    # Get published events (upcoming and past)
    events_list = Event.objects.filter(is_published=True).order_by('-event_date', '-created_at')
    
    if request.method == 'POST':
        # Check which form was submitted
        if 'event_submit' in request.POST:
            event_form = EventForm(request.POST)
            if event_form.is_valid():
                event_form.save()
                messages.success(request, 'ثبت‌نام شما با موفقیت انجام شد!')
                return redirect('home')
        elif 'member_submit' in request.POST:
            membership_form = MembershipForm(request.POST)
            if membership_form.is_valid():
                membership_form.save()
                messages.success(request, 'درخواست عضویت شما ثبت شد و به زودی بررسی می‌شود!')
                return redirect('home')
    
    gallery_images = GalleryImage.objects.filter(is_active=True)
    context = {
        'event_form': event_form,
        'membership_form': membership_form,
        'news_list': news_list,
        'events_list': events_list,
        'gallery_images': gallery_images,
    }
    
    return render(request, 'core/main.html', context)


def previous_members(request):
    """صفحه اعضای دوره‌های قبلی انجمن رمز"""
    return render(request, 'core/previous_members.html')


def honorary_members(request):
    """صفحه اعضای افتخاری انجمن رمز"""
    return render(request, 'core/honorary_members.html')


def contact(request):
    """صفحه تماس با ما"""
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'پیام شما با موفقیت ارسال شد! به زودی با شما تماس خواهیم گرفت.')
            return redirect('contact')
    else:
        form = ContactForm()
    
    context = {
        'form': form,
    }
    return render(request, 'core/contact.html', context)
