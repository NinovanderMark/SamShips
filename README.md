# What is SamShips
It is a software project intended to help me prepare for the AWS Associate Developer exam by building a full stack webapplication on Lambda, S3 and CloudFront, and deployed using CloudFormation and the AWS Serverless Application Model (SAM)

# Why is it on GitHub
It's on GitHub to allow anyone to benefit from seeing how these technologies may be used together. It may also serve as a template for similar projects.

# What is the future of this project
I have no current plans to develop this further, but may entertain PR's that improve structure, readability or add useful comments.

# How to build and run it
This project was intended to be built and deployed directly to AWS. Although it is entirely feasible to run (part of) it locally, this obviously means that no persistence is available.

Please be aware that not all part of the deployment is automated. The URL to the API, which will be known after the stack has been deployed, will need to be appended to the ShipService.ts file, and the front-end needs to be built and deployed to the S3 bucket manually.

Changes that include improvements in this area are welcome.

## Dependencies
Please install the following before attempting to run the deployment script, or any part of the software.
- AWS CLI v2
- Dotnet SDK supporting .NET Core 3.1 or greater
- Node.JS v14 with NPM
