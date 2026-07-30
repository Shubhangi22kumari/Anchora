# PowerShell build script for Anchora Soroban smart contracts
Write-Host "Building Anchora Soroban Smart Contracts to WASM..." -ForegroundColor Cyan

Set-Location -Path "$PSScriptRoot/../contracts"
cargo build --target wasm32-unknown-unknown --release

if ($LASTEXITCODE -eq 0) {
    Write-Host "Successfully compiled all WASM smart contracts!" -ForegroundColor Green
    Get-ChildItem -Path "target/wasm32-unknown-unknown/release/*.wasm" | Select-Name Name, Length, LastWriteTime
} else {
    Write-Host "WASM Build failed!" -ForegroundColor Red
}
