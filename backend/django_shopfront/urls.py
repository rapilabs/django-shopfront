"""django_shopfront URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.static import serve
from rest_framework.routers import DefaultRouter

from shop.views import OrderViewSet, ProductViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet, base_name='order')

urlpatterns = [
    url('^(?:index\.html)?$', ensure_csrf_cookie(serve), {'path': 'index.html', 'document_root': settings.STATIC_ROOT}),
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls, namespace='api')),
    url(r'^api/', include('shop.urls', namespace='cart-api')),
    url(r'^accounts/', include('accounts.urls', namespace='accounts')),
]

if not settings.DEBUG:
    urlpatterns += [
        # for clientside html5 routing, redirect anything else to index.html
        # the other option is to maintain a whitelist of urls to serve
        url(r'^(?!(?:admin|api|accounts|static))', ensure_csrf_cookie(serve), {'path': 'index.html', 'document_root': settings.STATIC_ROOT}),
    ]
