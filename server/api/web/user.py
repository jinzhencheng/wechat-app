# -*- coding:utf-8 -*-
# Created by Jin(jinzhencheng@auto-smart.com) at 2018/06/14.

from flask import request
from entity import MyUser
from flask import jsonify
from util import web_helper
from api.dal import user_dal
from util import builder
from config import GeneralConfig
from util import wx_biz_data_crypt
import requests
from api import app


@app.route("/user/add", methods=["POST"])
@web_helper.allow_cross_domain
def add_user():
    code = request.values.get("code")
    encrypted_data = request.values.get("encryptedData")
    iv = request.values.get("iv")
    url = builder.build_url(code=code)
    wx_response = requests.get(url=url)
    session_key = wx_response.json()["session_key"]
    encrypted_result = wx_biz_data_crypt.WXBizDataCrypt(GeneralConfig.WE_CHAT_APPID, session_key)
    result = encrypted_result.decrypt(encrypted_data, iv)
    user = MyUser()
    user.avatar_url = result["avatarUrl"]
    user.nickname = result["nickName"]
    user.city = result["city"]
    user.province = result["province"]
    user.gender = "男" if result["gender"] else "女"
    user.open_id = result["openId"]
    user.country = result["country"]
    is_exists = user_dal.is_exists(user.open_id)
    if not is_exists:
        user_dal.add_user(user)
    return jsonify({"open_id": user.open_id})


@app.route("/openId/fetch", methods=["GET"])
@web_helper.allow_cross_domain
def fetch_open_id():
    open_id = None
    code = request.values.get("code")
    url = builder.build_url(code)
    response = requests.get(url)
    if(200 == response.status_code):
        open_id = response.json()["openid"]
    return jsonify({"open_id": open_id})

