# -*- coding:utf-8 -*-
# Created by Jin at 2018/06/14.

from flask import jsonify
from util import web_helper
from api.dal import info_dal

from api import app

@app.route("/info/list", methods=["GET"])
@web_helper.allow_cross_domain
def list():
    result = info_dal.list()
    return jsonify(result)
