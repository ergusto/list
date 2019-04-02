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
	page_size = 10

	def get_queryset(self):
		list_id = self.request.query_params.get('list_id', None)

		if list_id is not None:
			list_object = List.objects.get(pk=list_id, user=self.request.user)
			if list_object:
				return self.request.user.items.filter(list=list_id)
			else:
				raise PermissionDenied

		return self.request.user.items.all()

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)