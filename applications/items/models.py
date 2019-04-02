from django.db import models
from core.abstract import AbstractTimestampedModel

# Create your models here.

class Item(AbstractTimestampedModel):
	user = models.ForeignKey('users.User', related_name='items', on_delete=models.CASCADE)
	list = models.ForeignKey('lists.List', related_name='items', on_delete=models.CASCADE)
	title = models.CharField(max_length=280)
	description = models.TextField(max_length=4800, null=True, blank=True)
	url = models.URLField(max_length=2048, null=True, blank=True)
	order = models.IntegerField(default=1)

	class Meta:
		ordering = ['-created']

	def __str__(self):
		return self.title