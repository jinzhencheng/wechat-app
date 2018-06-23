# -*- coding:utf-8 -*-
# Created by Jin(jinzhencheng@auto-smart.com) at 2018/06/14.

from sqlalchemy import Column, String, Integer, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import ForeignKey, Table
from sqlalchemy.orm import relationship, backref

Base = declarative_base()


class MyUser(Base):

    __tablename__ = "my_user"

    open_id = Column(primary_key=True)
    nickname = Column("nickname", String)
    gender = Column("gender", String)
    avatar_url = Column("avatar_url", String)
    city = Column(String)
    province = Column(String)
    country = Column(String)
    union_id = Column(String)
    add_time = Column("add_time", DateTime)
    info_list = relationship("Info")


class Info(Base):

    __tablename__ = "info"

    id = Column("id", Integer, primary_key=True)
    start_time = Column("start_time", DateTime)
    start_position = Column("start_position", String)
    end_position = Column("end_position", String)
    type = Column("type", String)
    remark = Column("remark", String)
    is_available = Column("is_available", Boolean)
    add_time = Column("add_time", DateTime)
    browse = Column("browse", Integer)
    phone = Column("phone", String)
    open_id = Column("open_id", String, ForeignKey('my_user.open_id'))




