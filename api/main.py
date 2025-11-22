from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import players

app = FastAPI(title="BF4 Stats API", description="Backend for BF4 Stats Visualization")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(players.router)

@app.get("/")
async def root():
    return {"message": "BF4 Stats API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
