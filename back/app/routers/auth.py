from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.middlewares import auth_jwt

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(data: LoginRequest):
    # 실제 구현에서는 DB 유저 인증 추가 필요
    if data.username == "admin" and data.password == "1234":
        token = auth_jwt.create_access_token({"sub": data.username})
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.get("/protected")
def read_protected(user: dict = Depends(auth_jwt.get_current_user)):
    return {"message": f"Welcome, {user['sub']}! This is a protected route."}