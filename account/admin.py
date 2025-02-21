from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from account.models import User

class UserAdmin(BaseUserAdmin):
    list_display = ["id", "email", "name", "tc", "is_admin"]
    list_filter = ["is_admin"]
    fieldsets = (
        ("User Credentials", {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["name", "first_name", "last_name", "age", "gender", "tc"]}),
        ("Permissions", {"fields": ["is_admin"]}),
    )
    add_fieldsets = (
        (None, {
            "classes": ["wide"],
            "fields": ["email", "name", "password1", "password2", "tc"],
        }),
    )
    search_fields = ["email", "name"]
    ordering = ["email", "id"]
    filter_horizontal = ()

# Register the User model with the customized UserAdmin
admin.site.register(User, UserAdmin)
