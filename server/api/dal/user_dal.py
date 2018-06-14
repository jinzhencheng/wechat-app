# -*- coding:utf-8 -*-
# Created by Jin(jinzhencheng@auto-smart.com) at 2018/06/14.

from util import db_helper
from util import logger

mysql_helper = db_helper.MySqlHelper()
the_logger = logger.get_logger()


def add(user):
    mysql_helper.open_driver()
    try:
        session = mysql_helper.session
        session.add(user)
        session.commit(user)
    except Exception, e:
        the_logger.error("An exception happened, details: %s" % e.message)
    finally:
        mysql_helper.close_driver()


