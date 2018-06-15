# -*- coding:utf-8 -*-
# Created by Jin at 2018/06/14.

from flask import jsonify
from flask import request
from util import web_helper
from api.dal import info_dal

from api import app

@app.route("/info/list", methods=["GET"])
@web_helper.allow_cross_domain
def list():
    page_index = request.values.get("page_index")
    result = info_dal.list(page_index=int(page_index))
    return jsonify(result)
