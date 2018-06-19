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
    page_index = request.values.get("pageIndex")
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
    phone = request.values.get("phone")
    info = Info()
    info.phone = phone
    info.start_position = start_position
    info.end_position = end_position
    info.start_time = start_time
    info.type = type
    info.remark = remark
    info.open_id = open_id
    id = info_dal.add_info(info)
    return jsonify({"id": id})


@app.route("/info/get", methods=["GET"])
@web_helper.allow_cross_domain
def get_info_by_id():
    id = request.values.get("id")
    entity = info_dal.get_info(id)
    return jsonify(entity)


@app.route("/info/list_by_user", methods=["GET"])
@web_helper.allow_cross_domain
def list_info_by_open_id():
    open_id = request.values.get("openId")
    page_index = request.values.get("pageIndex")
    list = info_dal.list_user_info(open_id, page_index)
    return jsonify(list)


@app.route("/info/delete", methods=["GET"])
@web_helper.allow_cross_domain
def delete_info():
    id = request.values.get("id")
    result = info_dal.delete_info(id)
    status = "success" if result else "fail"
    return jsonify({"status": status})
