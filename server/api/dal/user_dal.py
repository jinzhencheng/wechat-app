# -*- coding:utf-8 -*-
# Created by Jin(jinzhencheng@auto-smart.com) at 2018/06/14.

from util import db_helper
from util import logger
from entity import MyUser
from datetime import datetime

mysql_helper = db_helper.MySqlHelper()
the_logger = logger.get_logger()


def add_user(user):
    add_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    user.add_time = add_time
    open_id = None
    mysql_helper.open_driver()
    session = mysql_helper.session
    try:
        session.add(user)
        session.commit()
        open_id = user.open_id
    except Exception, e:
        session.rollback()
        the_logger.error("An exception happened when insert 'user' entity info DB, details: %s" % e.message)
    return open_id

def is_exists(open_id):
    result = False
    mysql_helper.open_driver()
    session = mysql_helper.session
    try:
        count = session.query(MyUser).filter(MyUser.open_id == open_id).count()
        result = count > 0
    except Exception, e:
        session.rollback()
        the_logger.error("An exception happened when 'is_exists' function executed, details: %s" % e.message)
    return result


