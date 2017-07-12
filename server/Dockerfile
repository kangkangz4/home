FROM node:latest

# RUN apt-get update \
#     && apt-get install -y \
# 	build-essential \
#         python \
#     && apt-get clean \
#     && rm -Rf /var/lib/apt/lists/*
# Set working directory to /app
WORKDIR /app

# Set working directory to /app
COPY package.json /app

# Install dependencies from package.json
RUN npm install --no-optional

# Add current directory into path /app in image
COPY . /app
# Run index.js
CMD npm start