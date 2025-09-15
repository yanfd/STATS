from typing import Any, Optional, Dict, List, Union
from pydantic import BaseModel


class ResponseModel(BaseModel):
    """统一的API响应格式"""
    code: int = 0  # 0表示成功，非0表示失败
    msg: str = "ok"  # 消息说明
    data: Optional[Union[Dict, List, Any]] = None  # 实际数据


def success_response(data: Any = None, msg: str = "ok") -> dict:
    """
    成功响应
    
    Args:
        data: 返回的数据
        msg: 成功消息
        
    Returns:
        统一格式的成功响应
    """
    return {
        "code": 0,
        "msg": msg,
        "data": data
    }


def error_response(code: int = 1, msg: str = "error", data: Any = None) -> dict:
    """
    错误响应
    
    Args:
        code: 错误码（非0）
        msg: 错误消息
        data: 额外的错误信息
        
    Returns:
        统一格式的错误响应
    """
    return {
        "code": code,
        "msg": msg,
        "data": data
    }