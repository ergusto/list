from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from api.permissions import IsOwner
from .models import Item
from .serializers import ItemSerializer
from lists.models import List

class ItemViewSet(viewsets.ModelViewSet):
	serializer_class = ItemSerializer
	permission_classes = (IsAuthenticated, IsOwner)
	filter_fields = ("list",)
	page_size = 10

	def get_queryset(self):
		return self.request.user.items.all()

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)