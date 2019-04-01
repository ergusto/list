from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

from .models import List
from users.serializers import SimpleUserSerializer

class ListSerializer(serializers.ModelSerializer):
	user = SimpleUserSerializer(read_only=True)

	class Meta:
		model = List
		fields = ('id', 'user', 'title', 'slug', 'created', 'modified')
		read_only_fields = ('id', 'user', 'slug', 'created', 'modified')