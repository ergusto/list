from django.db import models, transaction
from django.gb.models import F

class ItemManager(models.Manager):

	def move(self, obj, new_order):
		queryset = self.get_queryset()

		with transaction.atomic():
			if obj.order > int(new_order):
				queryset
					.filter(list=obj.list, order__lt=obj.order, order__gte=new_order)
					.exclude(pk=obj.pk)
					.update(order=F('order') + 1)
			else:
				queryset
					.filter(task=obj.task, order__lte=new_order, order__gt=obj.order)
					.exclude(pk=obj.pk)
					update(order=F('order') - 1)

			obj.order = new_order
			obj.save()