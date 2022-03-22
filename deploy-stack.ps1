$projects = @(
    "SamShips.Heartbeat",
    "SamShips.WebAPI"
)

foreach ($project in $projects) {
    Write-Host "Creating package for $project" -ForegroundColor Green -BackgroundColor Black

    dotnet lambda package -c Release -f "netcoreapp3.1" --project-location ".\src\Backend\$project" --output-package ".\artifacts\$project.zip" 
}

Write-Host "Packages updated, deploying stack..." -ForegroundColor Green -BackgroundColor Black

aws cloudformation package --template-file sam-template.yaml --s3-bucket nino-samships-deployment --output-template-file sam-output-template.yaml
if ( $LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
aws cloudformation validate-template --template-body file://sam-output-template.yaml
if ( $LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
aws cloudformation deploy --template-file sam-output-template.yaml --stack-name samships --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset