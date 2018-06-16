# -*- coding:utf-8 -*-
# Created by Jin(jinzhencheng@auto-smart.com) at 2018/06/14.

from util import db_helper
from util import logger
from entity import MyUser

mysql_helper = db_helper.MySqlHelper()
the_logger = logger.get_logger()


def add(user):
    id = 0
    mysql_helper.open_driver()
    try:
        session = mysql_helper.session
        session.add(user)
        session.commit()
        id = user.id
    except Exception, e:
        the_logger.error("An exception happened, details: %s" % e.message)
    return id

def get(open_id):
    mysql_helper.open_driver()
    user = None
    try:
        session = mysql_helper.session
        user = session.query(MyUser).filter(MyUser.open_id == open_id).first()
    except Exception, e:
        the_logger.error("An exception happened when 'is_exists' function executed, details: %s" % e.message)
    return user


