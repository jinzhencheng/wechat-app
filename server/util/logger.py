# -*- coding: utf-8 -*-
# created by Jin(jinzhencheng@auto-smart.com) at 2017/11/21.

from config import GeneralConfig
import logging


def get_logger(name="wechat_app", filename=GeneralConfig.DEFAULT_LOG_FILENAME):
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    handler = logging.FileHandler(filename)
    handler.setLevel(logging.INFO)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    return logger


