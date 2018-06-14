# -*- coding:utf-8 -*-
# Created by Jin(jinzhencheng@auto-smart.com) at 2018/06/14.

from util import db_helper
from util import logger
from entity import Info
from entity import MyUser
from config import GeneralConfig

mysql_helper = db_helper.MySqlHelper()
the_logger = logger.get_logger()


def list(page_num=1, page_size=GeneralConfig.DEFAULT_PAGE_SIZE):
    skip_count = (page_num - 1) * page_size
    IS_AVAILABLE = 1
    mysql_helper.open_driver()
    try:
        session = mysql_helper.session
        result = session.query(Info, MyUser).filter(Info.is_available == IS_AVAILABLE).offset(skip_count).limit(page_size).all()
        info_list = [
            {"id": item.Info.id, "content": item.Info.content, "type": item.Info.type,
             "the_date": item.Info.the_date, "start": item.Info.start, "end": item.Info.end, "remark": item.Info.remark,
             "nickname": item.MyUser.nickname, "gender": item.MyUser.gender, "img_url": item.MyUser.img_url, "my_user_id": item.MyUser.id}
            for item in result ]
        return info_list
    except Exception, e:
        the_logger.error("An exception happened, details: %s" % e.message)

