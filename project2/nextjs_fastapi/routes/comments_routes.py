from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import os
import json
import uuid
from datetime import datetime

router = APIRouter(
    prefix="/api/comments",
    tags=["comments"]
)

COMMENTS_FILE = os.path.join('processed', 'comments.json')


class CommentCreate(BaseModel):
    message_id: str = Field(..., min_length=1, max_length=200)
    author_name: str = Field(..., min_length=1, max_length=50)
    content: str = Field(..., min_length=1, max_length=500)


def load_comments() -> dict:
    if os.path.exists(COMMENTS_FILE):
        with open(COMMENTS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}


def save_comments(data: dict):
    os.makedirs('processed', exist_ok=True)
    with open(COMMENTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


@router.get("/{message_id:path}")
async def get_comments(message_id: str):
    """获取某条消息的所有评论"""
    data = load_comments()
    return {"comments": data.get(message_id, [])}


@router.post("")
async def create_comment(comment: CommentCreate):
    """创建评论（独立存储，不影响原始日志数据）"""
    data = load_comments()

    new_comment = {
        "id": str(uuid.uuid4())[:8],
        "message_id": comment.message_id,
        "author_name": comment.author_name,
        "content": comment.content,
        "created_at": datetime.now().isoformat()
    }

    if comment.message_id not in data:
        data[comment.message_id] = []

    data[comment.message_id].append(new_comment)
    save_comments(data)

    return {"comment": new_comment}
