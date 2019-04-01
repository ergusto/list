from django.urls import path, re_path, include

from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token

from items.views import ItemViewSet
from lists.views import ListViewSet

router = DefaultRouter()
router.register(r'items', ItemViewSet, base_name='items')
router.register(r'lists', ListViewSet, base_name='lists')

urlpatterns = [
    path('token/', obtain_jwt_token),
    
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

urlpatterns += router.urls