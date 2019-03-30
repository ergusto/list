from django.contrib.auth import get_user_model
from django.contrib.auth import password_validation 

from rest_framework import exceptions
from rest_framework.serializers import ModelSerializer, CharField, EmailField
from rest_framework.validators import UniqueValidator

UserModel = get_user_model()

class UserSerializer(ModelSerializer):
    email = EmailField(required=False, validators=[UniqueValidator(queryset=UserModel.objects.all(), message='A user with that email address already exists')])

    class Meta:
        model = UserModel
        fields = ('id', 'email', 'username', 'password')
        read_only_fields = ('id',)
        extra_kwargs = {
            'password': { 'write_only': True },
        }

    def validate_password(self, value):
        errors = None
        try:
            password_validation.validate_password(password=value)
        except exceptions.ValidationError as error:
            errors = list(error.messages)
        if errors:
            raise serializers.ValidationError(errors[0])
        return value

    def create(self, validated_data):
        email = getattr(validated_data, 'email', False)
        user = UserModel.objects.create(
            email=email,
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class SimpleUserSerializer(ModelSerializer):

    class Meta:
        model = UserModel
        fields = ('id', 'username')
