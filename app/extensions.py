from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
csrf = CSRFProtect()
bcrypt = Bcrypt()
