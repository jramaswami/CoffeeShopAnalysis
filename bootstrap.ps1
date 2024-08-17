if (-not (Test-Path .\venv))
{
    python -m venv venv
}

if (-not (Test-Path .\requirements.txt))
{
    New-Item .\requirements.txt
}

.\venv\Scripts\Activate.ps1

python -m pip install -r .\requirements.txt