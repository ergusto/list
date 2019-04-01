from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.permissions import IsOwner
from .serializers import ItemSerializer

class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    permission_classes = (IsAuthenticated, IsOwner)
    page_size = 10

    def get_queryset(self):
        return self.request.user.items.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)