from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

from .models import Item
from users.serializers import SimpleUserSerializer

class ItemSerializer(serializers.ModelSerializer):
	user = SimpleUserSerializer(read_only=True)

	class Meta:
		model = Item
		fields = ('id', 'user', 'list', 'title', 'description', 'url', 'created', 'modified')
		read_only_fields = ('id', 'user', 'created', 'modified')