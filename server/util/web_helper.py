# -*- coding:utf-8 -*-
# Created by Jin(jinzhencheng@auto-smart.com) at 2017/10/26.

from config import GeneralConfig
from flask import jsonify
from functools import wraps
from flask import make_response


def resp(data=None, code='0000', ext='', status_code=200, merged=False):
    r = {
        'code': code,
        'msg': GeneralConfig.RESP_STATUS[code] + ext
    }
    if data is not None and not merged:
        r['data'] = data
    elif data is not None and merged:
        r = dict(r, **data)
    else:
        pass
    r = jsonify(r)
    r.status_code = status_code
    return r


def allow_cross_domain(fun):
    @wraps(fun)
    def wrapper_fun(*args, **kwargs):
        rst = make_response(fun(*args, **kwargs))
        rst.headers['Access-Control-Allow-Origin'] = '*'
        rst.headers['Access-Control-Allow-Methods'] = 'PUT,GET,POST,DELETE'
        allow_headers = "Referer,Accept,Origin,User-Agent"
        rst.headers['Access-Control-Allow-Headers'] = allow_headers
        return rst
    return wrapper_fun
