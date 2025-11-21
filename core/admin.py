from django.contrib import admin
from .models import EventRegistration, Membership, News, Event, GalleryImage, ContactMessage

# Register your models here.

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'event_type', 'event_date', 'is_published', 'registration_open', 'created_at')
    list_filter = ('event_type', 'is_published', 'registration_open', 'event_date', 'created_at')
    search_fields = ('title', 'description', 'location')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('اطلاعات رویداد', {
            'fields': ('title', 'description', 'event_type', 'event_date', 'location', 'image')
        }),
        ('تنظیمات', {
            'fields': ('is_published', 'registration_open')
        }),
        ('اطلاعات زمانی', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    date_hierarchy = 'event_date'


@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'event', 'created_at')
    list_filter = ('event', 'created_at')
    search_fields = ('full_name', 'email', 'student_id')
    readonly_fields = ('created_at',)


@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'role', 'created_at')
    list_filter = ('role', 'created_at')
    search_fields = ('name', 'email', 'phone')
    readonly_fields = ('created_at',)


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_published', 'created_at', 'updated_at')
    list_filter = ('is_published', 'created_at')
    search_fields = ('title', 'content')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('اطلاعات خبر', {
            'fields': ('title', 'content', 'image')
        }),
        ('تنظیمات انتشار', {
            'fields': ('is_published',)
        }),
        ('اطلاعات زمانی', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
)


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'order', 'created_at')
    list_editable = ('is_active', 'order')
    list_filter = ('is_active', 'created_at')
    search_fields = ('title', 'caption')
    readonly_fields = ('created_at',)
    fieldsets = (
        ('اطلاعات تصویر', {
            'fields': ('title', 'caption', 'image')
        }),
        ('تنظیمات نمایش', {
            'fields': ('is_active', 'order')
        }),
        ('اطلاعات زمانی', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'subject', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('full_name', 'email', 'subject', 'message')
    readonly_fields = ('created_at',)
    list_editable = ('is_read',)
    fieldsets = (
        ('اطلاعات فرستنده', {
            'fields': ('full_name', 'email', 'phone')
        }),
        ('پیام', {
            'fields': ('subject', 'message')
        }),
        ('وضعیت', {
            'fields': ('is_read',)
        }),
        ('اطلاعات زمانی', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
