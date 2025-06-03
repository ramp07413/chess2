# Base image Playwright ka official image hai jo browsers ke sath aata hai
FROM mcr.microsoft.com/playwright:v1.36.1-focal

# Working directory set karo
WORKDIR /app

# Copy package.json and package-lock.json (agar hai)
COPY package*.json ./

# Install dependencies
RUN npm install

# App ke saare source copy karo
COPY . .

# Port expose karo (jo tu use kar raha hai)
EXPOSE 4001

# App start command
CMD ["node", "index.js"]
