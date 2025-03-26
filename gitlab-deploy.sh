#!/bin/bash

# Usage function to display help message
usage() {
    echo "Usage: $0 <git_repo> <deploy_dir>"
    echo "  git_repo   - Git repository URL (e.g., git@sunrise-avengers.ch/appli/duarte-portfolio.git)"
    echo "  deploy_dir - Directory where the repository will be deployed (e.g., /var/www/duarte-portfolio)"
    exit 1
}

# Check if exactly two arguments are provided
if [ $# -ne 2 ]; then
    usage
fi

GIT_REPO=$1
DEPLOY_DIR=$2

# Validate the Git repository URL
if [ -z "$GIT_REPO" ]; then
    echo "Error: Git repository URL (git_repo) is not provided."
    usage
fi

# Validate the deployment directory
if [ -z "$DEPLOY_DIR" ]; then
    echo "Error: Deployment directory (deploy_dir) is not provided."
    usage
fi

# Check if the deployment directory exists; create if it does not
if [ ! -d "$DEPLOY_DIR" ]; then
    echo "Deployment directory does not exist. Creating $DEPLOY_DIR..."
    mkdir -p "$DEPLOY_DIR" || { echo "Error: Failed to create directory $DEPLOY_DIR"; exit 1; }
fi

# Navigate to the deployment directory
cd "$DEPLOY_DIR" || { echo "Error: Could not navigate to $DEPLOY_DIR."; exit 1; }

# Ensure the Git repository is present and up-to-date
if [ ! -d ".git" ]; then
    echo "Repository not found. Cloning from $GIT_REPO..."
    git clone "$GIT_REPO" . || { echo "Error: Failed to clone repository from $GIT_REPO"; exit 1; }
else
    echo "Repository found. Pulling the latest changes..."
    git fetch origin main && git reset --hard origin/main || { echo "Error: Failed to reset to the latest changes from $GIT_REPO"; exit 1; }
fi

# Check if setup.sh exists in the root of the repository and execute it
if [ -f "setup.sh" ]; then
    echo "setup.sh found. Executing setup.sh..."
    chmod +x setup.sh || { echo "Error: Failed to make setup.sh executable"; exit 1; }
    ./setup.sh || { echo "Error: setup.sh failed"; exit 1; }
else
    echo "No setup.sh found. Skipping setup."
fi

echo "Deployment complete"
