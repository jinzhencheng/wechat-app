# -*- coding:utf-8 -*-
# Created by Jin(jinzhencheng@auto-smart.com) at 2018/06/14.

from flask import request
from flask import jsonify
from util import web_helper
from util import builder
from config import GeneralConfig
from util import wx_biz_data_crypt
import requests

from api import app

@app.route("/user/login", methods=["POST"])
@web_helper.allow_cross_domain
def login():
    code = request.values.get("code")
    encrypted_data = request.values.get("encrypted_data")
    iv = request.values.get("iv")
    url = builder.build_url(code=code)
    wx_response = requests.get(url=url)
    session_key = wx_response.json()["session_key"]
    encrypted_result = wx_biz_data_crypt.WXBizDataCrypt(GeneralConfig.WE_CHAT_APPID, session_key)
    result = encrypted_result.decrypt(encrypted_data, iv)
    return jsonify(result)


