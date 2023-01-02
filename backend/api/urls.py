from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from api.views import TaskViewSet, CreateUserView, MyUserView

router = routers.DefaultRouter()
router.register('tasks', TaskViewSet, basename='tasks')

urlpatterns = [
    path('myself/', MyUserView.as_view(), name='myself'),
    path('register/', CreateUserView.as_view(), name='register'),
    path('', include(router.urls)),
]