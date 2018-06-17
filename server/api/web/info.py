# -*- coding:utf-8 -*-
# Created by Jin at 2018/06/14.

from flask import jsonify
from flask import request
from util import web_helper
from api.dal import info_dal
from entity import Info

from api import app

@app.route("/info/list", methods=["GET"])
@web_helper.allow_cross_domain
def list_info():
    page_index = request.values.get("page_index")
    result = info_dal.list_info(page_index=int(page_index))
    return jsonify(result)


@app.route("/info/add", methods=["POST"])
@web_helper.allow_cross_domain
def add_info():
    type = request.values.get("infoType")
    start_position = request.values.get("startPosition")
    end_position = request.values.get("endPosition")
    remark = request.values.get("remark")
    start_time = request.values.get("startTime")
    open_id = request.values.get("openId")
    info = Info()
    info.start_position = start_position
    info.end_position = end_position
    info.start_time = start_time
    info.type = type
    info.remark = remark
    info.open_id = open_id
    id = info_dal.add_info(info)
    return jsonify({"id": id})
