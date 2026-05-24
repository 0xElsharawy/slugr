from sqlalchemy import String, Text, DateTime, BigInteger
from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column
from db import Base


class Url(Base):
    __tablename__ = "urls"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    url: Mapped[str] = mapped_column(Text, nullable=False)
    short_code: Mapped[str] = mapped_column(String(10), nullable=False, unique=True)
    clicks: Mapped[int] = mapped_column(BigInteger, server_default="0", nullable=False)
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    expires_at: Mapped[DateTime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
