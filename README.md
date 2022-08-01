<img src="https://docs.microsoft.com/en-us/events/learntv/learnlive-azure-hybrid-cloud-study-hall/media/learnlive-banner-2022a.png" />

# Azure Benchmarking

## Introduction

This is a brief benchmarking test, comparing Azure Functions with Azure App Services. It is not meant to be a comprehensive analysis, and the reader should make their own research to determine the best service to choose.  
This project uses k6 to perform the benchmarks. Despite k6 being a load testing tool, it's a good option just to see some quick results.

## Overview

- Azure App Service was significantly easier to deploy, as you don't have to deal with Azure Storage and there are significantly fewer steps with Azure App Service
- Azure Functions require more boilerplate code even for simple API endpoints, and is kind of its own method of dotnet development, different from standard ASP.NET.
- Azure Functions will result in a long wait time during the first initial load. See `_cold` test results.
- Generally Azure App Service had better performance.
- The Azure Functions free tier seems to be very generous. Hard to say if it is more generous than Azure App Services.
- Azure Functions has a built in way to secure the endpoints with API keys, where as with App Services this is a consideration that the developer has to make. Not a big deal, but something to consider.

## Future Plans
- Add Go and NodeJS to the mix to compare C#/.NET to other languages using Azure
- Add AWS and Netlify to other platforms to Azure

## Results

To see the raw results for the tests, view them in `results/` directory from project root.

### Cold
- These tests were performed after a long period (>6 hours) of no usage.

#### Azure Functions

| Service | Test Duration | Virtual Users | Avg Requests/sec   | % of Requests Failed | Avg Duration Per Request (µs) | Max Duration Per Request (µs) | Min Duration Per Request (µs) |
| ---- | ----------------- | ------------------ | ------------------ | --------------- | ----------------------- | ----------------------- | ----------------------- |
| Azure Functions (Cold) | 10007.583986      | 1                  | 7.4943163209942005 | 0               | 133.40826494666672      | 2711.18654              | 87.01134                |

#### Azure App Service
| Test Duration | Virtual Users | Avg Requests/sec   | % of Requests Failed | Avg Duration Per Request (µs) | Max Duration Per Request (µs) | Min Duration Per Request (µs) |
| ----------------- | ------------------ | ------------------ | --------------- | ----------------------- | ----------------------- | ----------------------- |
| 10092.892946      | 1                  | 10.403360122987676 | 0               | 96.10462089523816       | 457.224897              | 85.565213               | 

### Warm
- These tests were performed right after the cold tests, after a few dry runs.

#### Azure Functions

| Test Duration | Virtual Users | Avg Requests/sec  | % of Requests Failed | Avg Duration Per Request (µs) | Max Duration Per Request (µs) | Min Duration Per Request (µs) |
| ----------------- | ------------------ | ----------------- | --------------- | ----------------------- | ----------------------- | ----------------------- |
| 10068.812389      | 1                  | 9.435074994920535 | 0               | 105.9618635578947       | 448.757452              | 92.192618               |

#### Azure App Service

| Test Duration | Virtual Users | Avg Requests/sec  | % of Requests Failed | Avg Duration Per Request (µs) | Max Duration Per Request (µs) | Min Duration Per Request (µs) |
| ----------------- | ------------------ | ----------------- | --------------- | ----------------------- | ----------------------- | ----------------------- |
| 10009.351047      | 1                  | 10.09056426592928 | 0               | 99.08007670297029       | 545.456113              | 88.971413               | 

## Usage

### Deployment

#### Azure App Service

- There is a deploy script in the AppService directory called `example.deploy.sh`
    - Replace the example fields to your liking
        - Note: You can choose to remove the resource group. The CLI will create a new one for you automatically

#### Azure Functions
- For Azure Functions, deploying via the VS / Rider GUI is easiest
    - You must create a Azure storage before creating your Azure Function

### Configuring

- At the project root, you will see `example.benchmark-config.json`. Remove the `example.` and replace the fields inside the file that are wrapped in carrots.

### Benchmarking

- The project requires [k6](https://k6.io/) to be installed. k6 is an open source CLI tool that makes load testing easy.
- Just run `runbenchmarks.sh` at project root.

## Authors

- [@ncn-ends](https://www.github.com/ncn-ends)
