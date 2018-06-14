# -*- coding:utf-8 -*-
# Created by Jin(jinzhencheng@auto-smart.com) at 2018/06/14.

from config import GeneralConfig

def build_url(code, app_id=GeneralConfig.WE_CHAT_APPID, secret=GeneralConfig.WE_CHAT_SECRET):
    url = "{host}?appid={app_id}&secret={secret}&js_code={code}&grant_type={grant_type}"\
        .format(host=GeneralConfig.WE_CHAT_HOST, app_id=app_id, secret=secret, code=code, grant_type=GeneralConfig.WE_CHAT_GRANT_TYPE)
    return url
