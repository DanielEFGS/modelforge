from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime


@dataclass(slots=True)
class Profile:
    displayName: str = field(metadata={"json_name": "display_name"})


@dataclass(slots=True)
class User:
    id: int
    createdAt: datetime = field(metadata={"json_name": "created_at"})
    profile: Profile
    tags: list[str]
    phone: str | None = None
