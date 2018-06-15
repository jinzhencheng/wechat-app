# -*- coding:utf-8 -*-
# Created by Jin(jinzhencheng@auto-smart.com) at 2018/06/14.

from util import db_helper
from util import logger
from util import builder
from entity import Info
from entity import MyUser
from config import GeneralConfig
from datetime import datetime
from sqlalchemy import desc

mysql_helper = db_helper.MySqlHelper()
the_logger = logger.get_logger()


def list(page_index=1, page_size=GeneralConfig.DEFAULT_PAGE_SIZE):
    skip_count = page_index * page_size
    IS_AVAILABLE = 1
    mysql_helper.open_driver()
    try:
        session = mysql_helper.session
        result = session.query(Info, MyUser).join(MyUser).filter(Info.is_available == IS_AVAILABLE)\
            .order_by(desc(Info.add_time)).offset(skip_count).limit(page_size).all()
        info_list = [
            {"id": item.Info.id, "content": item.Info.content, "type": item.Info.type,
             "start_time": builder.cut_date(item.Info.start_time.strftime("%Y-%m-%d %H:%M:%S")), "start_position": item.Info.start_position,
             "end_position": item.Info.end_position, "remark": item.Info.remark,
             "nickname": item.MyUser.nickname, "gender": item.MyUser.gender,
             "add_time": builder.build_date_tip(item.Info.add_time), "browse": item.Info.browse,
             "img_url": item.MyUser.img_url, "phone": item.MyUser.phone, "my_user_id": item.MyUser.id, "overdue": (datetime.now() > item.Info.start_time)}
            for item in result]
        return info_list
    except Exception, e:
        the_logger.error("An exception happened, details: %s" % e.message)

