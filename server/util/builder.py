# -*- coding:utf-8 -*-
# Created by Jin(jinzhencheng@auto-smart.com) at 2018/06/14.

from config import GeneralConfig
from datetime import datetime

def build_url(code, app_id=GeneralConfig.WE_CHAT_APPID, secret=GeneralConfig.WE_CHAT_SECRET):
    url = "{host}?appid={app_id}&secret={secret}&js_code={code}&grant_type={grant_type}"\
        .format(host=GeneralConfig.WE_CHAT_HOST, app_id=app_id, secret=secret, code=code, grant_type=GeneralConfig.WE_CHAT_GRANT_TYPE)
    return url

def cut_date(dateStr):
    if not dateStr or '-' not in dateStr or ':' not in dateStr:
        return dateStr
    start_index = dateStr.find('-') + 1
    end_index = dateStr.rfind(':')
    return dateStr[start_index: end_index]

def build_date_tip(the_date):
    seconds = (datetime.now() - the_date).seconds
    days = (datetime.now() - the_date).days
    if days >= 1 and days < 2:
        tip = "1天前"
    elif days >= 2 and days < 3:
        tip = "2天前"
    elif days >= 3 and days < 4:
        tip = "3天前"
    elif days >= 4 and days < 5:
        tip = "4天前"
    elif days >= 5 and days < 6:
        tip = "5天前"
    elif days >= 6 and days < 7:
        tip = "6天前"
    elif days >= 7 and days < 15:
        tip = "1周前"
    elif days >= 14:
        tip = "2周前"
    elif seconds >= 60 and seconds < 60 * 3:
        tip = "1分钟前"
    elif seconds >= 60 * 3 and seconds < 60 * 5:
        tip = "3分钟前"
    elif seconds >= 60 * 5 and seconds < 60 * 10:
        tip = "5分钟前"
    elif seconds >= 60 * 10 and seconds < 60 * 30:
        tip = "10分钟前"
    elif seconds >= 60 * 30 and seconds < 60 * 60:
        tip = "30分钟前"
    elif seconds >= 60 * 60 and seconds < 60 * 60 * 2:
        tip = "1小时前"
    elif seconds >= 60 * 60 * 2 and seconds < 60 * 60 * 3:
        tip = "2小时前"
    elif seconds >= 60 * 60 * 3 and seconds < 60 * 60 * 4:
        tip = "3小时前"
    elif seconds >= 60 * 60 * 4 and seconds < 60 * 60 * 5:
        tip = "4小时前"
    elif seconds >= 60 * 60 * 5 and seconds < 60 * 60 * 6:
        tip = "5小时前"
    elif seconds >= 60 * 60 * 6 and seconds < 60 * 60 * 7:
        tip = "6小时前"
    elif seconds >= 60 * 60 * 7 and seconds < 60 * 60 * 8:
        tip = "7小时前"
    elif seconds >= 60 * 60 * 8 and seconds < 60 * 60 * 9:
        tip = "8小时前"
    elif seconds >= 60 * 60 * 9 and seconds < 60 * 60 * 10:
        tip = "9小时前"
    elif seconds >= 60 * 60 * 10 and seconds < 60 * 60 * 11:
        tip = "10小时前"
    elif seconds >= 60 * 60 * 11 and seconds < 60 * 60 * 12:
        tip = "11小时前"
    elif seconds >= 60 * 60 *12 and seconds < 60 * 60 * 18:
        tip = "12小时前"
    else:
        tip = "18小时前"
    return tip

