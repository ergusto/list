# Generated by Django 2.2 on 2019-04-02 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0002_item_list'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='item',
            options={'ordering': ['-created']},
        ),
        migrations.AddField(
            model_name='item',
            name='order',
            field=models.IntegerField(default=1),
        ),
    ]
