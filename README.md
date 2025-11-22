# BF4 Stats Intelligence Network

**🌐 Live Demo:** [https://battlefield4-sin.onrender.com/](https://battlefield4-sin.onrender.com/)

A Battlefield 4 statistics tracker that fetches and visualizes player data directly from the GameTools API. It allows users to look up soldier stats across all platforms (PC, PS4, Xbox One).

## 🚀 Technologies Used

### Frontend
- **React 18**: UI Library.
- **Vite**: Build tool.
- **TailwindCSS**: Styling.

### Backend
- **Python 3.11**: Server language.
- **FastAPI**: Web framework.
- **HTTPX**: Async HTTP client.
- **BeautifulSoup4**: Data parsing.

### Infrastructure
- **Docker**: Containerization.
- **PowerShell / Makefile**: Automation scripts.

## ✨ Features

- **Multi-Platform Search**: Search for players on PC, Playstation 4, and Xbox One.
- **Core Statistics**: Displays K/D Ratio, Accuracy, Win Rate, Skill, Headshots, and Longest Headshot.
- **Weapon & Vehicle Data**: Lists top weapons and vehicles sorted by kills.
- **Class Progression**: Shows score and service stars for Assault, Engineer, Support, and Recon.
- **Performance History**: Visualizes historical data trends for K/D and other metrics.
- **Gamemode Analysis**: Breaks down score per game mode (Conquest, Rush, TDM, etc.).
- **Platoon Info**: Displays current platoon tag and emblem.

## 🛠️ How to Run

### Option 1: Windows Script
Run the included PowerShell script to install dependencies or start the project.
```powershell
.\setup.ps1
```

### Option 2: Docker
Run the entire application in containers.
```bash
docker-compose up --build
```

### Option 3: Manual
**API:**
```bash
cd api
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

**WEB:**
```bash
cd web
npm install
npm run dev
```

## 📂 Project Structure

```
BF4STATSMUCHBETTER/
├── api/                # Python FastAPI Server
│   ├── routers/        # API Endpoints
│   ├── services/       # External API Logic
│   └── main.py         # App Entry point
├── web/                # React Application
│   ├── src/
│   │   ├── pages/      # Views (Home, Profile)
│   │   └── App.jsx     # Routing
│   └── public/         # Assets
├── docker-compose.yml  # Container Config
└── setup.ps1           # Automation Script
```
