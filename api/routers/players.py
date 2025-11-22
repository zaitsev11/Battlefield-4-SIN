from fastapi import APIRouter, HTTPException
from services.gametools import GameToolsService

router = APIRouter(prefix="/api/player", tags=["player"])

@router.get("/{platform}/{name}/summary")
async def get_player_summary(platform: str, name: str):
    data = await GameToolsService.get_stats(name, platform)
    if not data:
        raise HTTPException(status_code=404, detail="Player not found")
    return data

@router.get("/{platform}/{name}/full")
async def get_player_full(platform: str, name: str):
    data = await GameToolsService.get_all_data(name, platform)
    if not data:
        raise HTTPException(status_code=404, detail="Player not found")
    return data

@router.get("/{platform}/{name}/history")
async def get_player_history(platform: str, name: str):
    data = await GameToolsService.get_history(name, platform)
    if not data:
        raise HTTPException(status_code=404, detail="Player not found")
    return data
