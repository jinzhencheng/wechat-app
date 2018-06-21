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


def list_info(page_index=0, page_size=GeneralConfig.DEFAULT_PAGE_SIZE):
    skip_count = page_index * page_size
    mysql_helper.open_driver()
    session = mysql_helper.session
    try:
        result = session.query(Info, MyUser).join(MyUser).filter(Info.is_available == GeneralConfig.DEFAULT_AVAILABLE)\
            .order_by(desc(Info.add_time)).offset(skip_count).limit(page_size).all()
        info_list = [
            {"id": item.Info.id, "type": item.Info.type,
             "start_time": builder.cut_date(item.Info.start_time.strftime("%Y-%m-%d %H:%M:%S")), "start_position": item.Info.start_position,
             "end_position": item.Info.end_position, "remark": item.Info.remark,
             "nickname": item.MyUser.nickname, "gender": item.MyUser.gender,
             "add_time": builder.build_date_tip(item.Info.add_time), "browse": item.Info.browse,
             "avatar_url": item.MyUser.avatar_url, "phone": item.Info.phone, "overdue": (datetime.now() > item.Info.start_time)}
            for item in result]
        return info_list
    except Exception, e:
        session.rollback()
        the_logger.error("An exception happened, details: %s" % e.message)


def add_info(info):
    add_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    info.add_time = add_time
    info.is_available = GeneralConfig.DEFAULT_AVAILABLE
    info.browse = GeneralConfig.DEFAULT_BROWSE
    id = 0
    mysql_helper.open_driver()
    session = mysql_helper.session
    try:
        session.add(info)
        session.commit()
        id = info.id
    except Exception, e:
        session.rollback()
        the_logger.error("An exception happened when insert a 'info' entity into DB, details: %s" % e.message)
    return id


def get_info(id):
    info = None
    mysql_helper.open_driver()
    session = mysql_helper.session
    try:
        result = session.query(Info, MyUser.avatar_url, MyUser.gender, MyUser.nickname)\
            .filter(Info.id == id, Info.is_available == GeneralConfig.DEFAULT_AVAILABLE).first()
        result.Info.browse += 1
        session.add(result.Info)
        session.commit()
        info = {"browse": result.Info.browse, "add_time": builder.cut_date(result.Info.add_time.strftime("%Y-%m-%d %H:%M:%S")),
                "remark": result.Info.remark, "type": result.Info.type,
                "start_time": builder.cut_date(result.Info.start_time.strftime("%Y-%m-%d %H:%M:%S")),
                "start_position": result.Info.start_position, "end_position": result.Info.end_position,
                "phone": result.Info.phone, "avatar_url": result.avatar_url, "gender": result.gender,
                "nickname": result.nickname, "overdue": (datetime.now() > result.Info.start_time)}
    except Exception, e:
        session.rollback()
        the_logger.error("An exception happened when get a 'info' entity from DB, details: %s" % e.message)
    return info


def list_user_info(open_id, page_index=0,page_size=GeneralConfig.DEFAULT_PAGE_SIZE):
    skip_count = page_index * page_size
    info_list = list()
    mysql_helper.open_driver()
    session = mysql_helper.session
    try:
        result = session.query(Info).filter(Info.open_id == open_id, Info.is_available == GeneralConfig.DEFAULT_AVAILABLE)\
            .order_by(desc(Info.id)).offset(skip_count).limit(page_size).all()
        info_list = [{"id":item.id, "start_position": item.start_position, "end_position": item.end_position,
                      "start_time": builder.cut_date(item.start_time.strftime("%Y-%m-%d %H:%M:%S")), "type": item.type, "remark": item.remark,
                      "add_time": item.add_time, "browse": item.browse, "phone": item.phone}
                     for item in result]
    except Exception, e:
        session.rollback()
        the_logger.error("An exception happened when get a 'info' entity from DB, details: %s" % e.message)
    return info_list


def delete_info(id):
    n = None
    mysql_helper.open_driver()
    session = mysql_helper.session
    try:
        n = session.query(Info).filter(Info.id == id).update({"is_available": 0})
        session.commit()
    except Exception, e:
        session.rollback()
        the_logger.error("An exception happened when get a 'info' entity from DB, details: %s" % e.message)
    return n
