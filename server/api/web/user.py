# -*- coding:utf-8 -*-
# Created by Jin(jinzhencheng@auto-smart.com) at 2018/06/14.

from flask import request
from entity import MyUser
from flask import jsonify
from util import web_helper
from api.dal import user_dal
from util import builder
import requests
from api import app


@app.route("/user/add", methods=["POST"])
@web_helper.allow_cross_domain
def add_user():
    user = MyUser()
    user.avatar_url = request.values.get("avatarUrl")
    user.nickname = request.values.get("nickName")
    user.city = request.values.get("city")
    user.province = request.values.get("province")
    user.gender = "male" if int(request.values.get("gender")) else "female"
    user.open_id = request.values.get("openId")
    user.country = request.values.get("country")
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

