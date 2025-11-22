import httpx
from urllib.parse import quote

BASE_URL = "https://api.gametools.network/bf4"

class GameToolsService:
    @staticmethod
    async def get_stats(name: str, platform: str):
        async with httpx.AsyncClient() as client:
            try:
                url = f"{BASE_URL}/stats/?name={quote(name)}&platform={platform}&skip_battlelog=false"
                response = await client.get(url, timeout=10)
                if response.status_code == 404:
                    return None
                response.raise_for_status()
                return response.json()
            except httpx.RequestError as e:
                print(f"Error fetching stats for {name}: {e}")
                return None

    @staticmethod
    async def get_all_data(name: str, platform: str):
        async with httpx.AsyncClient() as client:
            try:
                url = f"{BASE_URL}/all/?name={quote(name)}&platform={platform}"
                response = await client.get(url, timeout=10)
                if response.status_code == 404:
                    return None
                response.raise_for_status()
                return response.json()
            except httpx.RequestError as e:
                print(f"Error fetching all data for {name}: {e}")
                return None

    @staticmethod
    async def get_history(name: str, platform: str):
        async with httpx.AsyncClient() as client:
            try:
                url = f"{BASE_URL}/statsarray/?name={quote(name)}&platform={platform}"
                response = await client.get(url, timeout=10)
                if response.status_code == 404:
                    return None
                response.raise_for_status()
                return response.json()
            except httpx.RequestError as e:
                print(f"Error fetching history for {name}: {e}")
                return None
