from flask import Flask

from config import Config

from .api.routes import api
from .site.views import site

from app.extensions import *

def create_app(config_class=Config):
    app = Flask(__name__, template_folder='interface/templates', static_folder='interface/static')
    app.config.from_object(config_class)

    db.init_app(app)
    # csrf.init_app(app)
    # bcrypt.init_app(app)

    app.register_blueprint(api)
    app.register_blueprint(site)

    return app
