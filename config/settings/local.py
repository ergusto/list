import os
from .base import *

DEBUG = True

ALLOWED_HOSTS = ["*"]

SECRET_KEY = "m-3eb&dxy4^pq3!^=*tuk799kxtm-7gm_yi*m2gk^526=jkpf!"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "leest",
        "USER": "",
        "PASSWORD": "",
        "HOST": "localhost",
        "PORT": "5432",
    }
}

WEBPACK_LOADER = {
    "DEFAULT": {
        "BUNDLE_DIR_NAME": "build/",
        "STATS_FILE": os.path.join(PROJECT_DIR, "client/webpack/stats.local.json"),
    }
}

REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] + (
    'rest_framework.renderers.BrowsableAPIRenderer',
)

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'