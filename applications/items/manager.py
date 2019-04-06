from django.db import models, transaction
from django.db.models import F, Max

class ItemManager(models.Manager):

	def move(self, obj, new_order):
		queryset = self.get_queryset()

		with transaction.atomic():
			# Move down
			if obj.order > int(new_order):
				queryset.filter(
					list=obj.list,
					order__lt=obj.order,
					order__gte=new_order
				).exclude(
					pk=obj.pk
				).update(
					order=F('order') + 1
				)
			else:
			# Move up
				queryset.filter(
					list=obj.list,
					order__lte=new_order,
					order__gt=obj.order
				).exclude(
					pk=obj.pk
				).update(
					order=F('order') - 1
				)

			obj.order = new_order
			obj.save()

	def create(self, **kwargs):
		instance = self.model(**kwargs)

		with transaction.atomic():
			# Get our current max order number
			results = self.filter(list=instance.list).aggregate(Max('order'))

			current_order = results['order__max']
			
			if current_order is None:
				current_order = 0

			value = current_order + 1
			instance.order = value
			instance.save()

			return instance