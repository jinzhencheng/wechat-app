# -*- coding:utf-8 -*-
# Created by Jin (jinzhencheng@auto-smart.com) at 2017/12/08.


from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config import MySqlConfig

class MySqlHelper(object):
    """
    Database operation class
    """
    session = None

    def __init__(self, db_name=None, user_name=None, password=None, ip=None, port=None):
        uri = MySqlConfig.create_db_uri(db_name, user_name, password, ip, port)
        self.mysql_uri = uri

    def open_driver(self):
        """
        Connection establishment
        :return:None
        """
        if self.session is None:
            engine = create_engine(self.mysql_uri, pool_size=MySqlConfig.DEFAULT_POOL_MAX_SIZE)
            db_session = sessionmaker(bind=engine)
            self.session = db_session()
    pass

    def close_driver(self):
        """
        Connection be closed
        :return:None
        """
        if self.session is not None:
            self.session.close()
            """ 
            The engine will be disposed automatically, when main process finished. 
            So 'dispose' function is unnecessary.
            """
            # self.engine.dispose()
    pass

