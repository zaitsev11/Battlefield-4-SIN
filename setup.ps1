# BF4 Stats Setup & Run Script

function Install-Deps {
    Write-Host "Installing Backend Dependencies..." -ForegroundColor Green
    pip install -r api/requirements.txt

    Write-Host "Installing Frontend Dependencies..." -ForegroundColor Green
    cd web
    npm install
    cd ..
}

function Start-Dev {
    Write-Host "Starting Docker Containers..." -ForegroundColor Green
    cmd /c "docker-compose up"
}

# Simple menu
Write-Host "BF4 Stats Automation" -ForegroundColor Cyan
Write-Host "1. Install Dependencies"
Write-Host "2. Start Development (Docker)"
Write-Host "Q. Quit"

$selection = Read-Host "Select an option"

switch ($selection) {
    '1' { Install-Deps }
    '2' { Start-Dev }
    'Q' { exit }
    Default { Write-Host "Invalid option" -ForegroundColor Red }
}
