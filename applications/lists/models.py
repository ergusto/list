from django.db import models
from core.abstract import AbstractTimestampedModel, AbstractSluggableModel

# Create your models here.

class List(AbstractTimestampedModel, AbstractSluggableModel):
	user = models.ForeignKey('users.User', related_name='lists', on_delete=models.CASCADE)
	title = models.CharField(max_length=280)

	def __str__(self):
		return self.title