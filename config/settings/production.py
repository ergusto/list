from .base import *
import dj_database_url

DEBUG = os.environ.get('SECRET_KEY')

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Allow all host headers - Change this when deploying
ALLOWED_HOSTS = ['*']

SECRET_KEY = os.environ.get('SECRET_KEY')

# Update database configuration with $DATABASE_URL.
db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES = {}
DATABASES['default'] = db_from_env

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'dist/',
        'STATS_FILE': os.path.join(PROJECT_DIR, 'client/webpack/stats.production.json'),
    }
}