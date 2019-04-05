from .base import *

DEBUG = True if os.environ.get('DEBUG') == "True" else False

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'dist/',
        'STATS_FILE': os.path.join(PROJECT_DIR, 'client/webpack/stats.production.json'),
    }
}

import django_heroku
django_heroku.settings(locals(), staticfiles=False)