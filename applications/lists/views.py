from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.permissions import IsOwner
from .serializers import ListSerializer

class ListViewSet(viewsets.ModelViewSet):
    serializer_class = ListSerializer
    permission_classes = (IsAuthenticated, IsOwner)
    page_size = 10

    def get_queryset(self):
        return self.request.user.lists.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)