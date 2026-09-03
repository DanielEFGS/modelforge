from __future__ import annotations

from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class Profile(BaseModel):
    model_config = ConfigDict(populate_by_name=True, strict=True)

    displayName: str = Field(..., alias="display_name")


class User(BaseModel):
    model_config = ConfigDict(populate_by_name=True, strict=True)

    id: int
    createdAt: datetime = Field(..., alias="created_at")
    profile: Profile
    tags: list[str]
    phone: str | None = None
