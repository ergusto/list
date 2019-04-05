from .base import *
import dj_database_url

DEBUG = True if os.environ.get('DEBUG') == "True" else False

ALLOWED_HOSTS = ["*"]

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

SECRET_KEY = os.environ.get('SECRET_KEY')

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'dist/',
        'STATS_FILE': os.path.join(PROJECT_DIR, 'client/webpack/stats.production.json'),
    }
}

STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'

# Update database configuration with $DATABASE_URL.
db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES = {}
DATABASES['default'] = db_from_env

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
             'level': os.getenv('DJANGO_LOG_LEVEL', 'DEBUG'),
        },
    },
}