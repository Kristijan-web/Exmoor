FROM ubuntu:22.04

# Update paketa i instalacija potrebnih alata
RUN apt-get update && apt-get install -y curl gnupg \
    && rm -rf /var/lib/apt/lists/*

# Dodaj NodeSource repozitorijum (ovde "setup_20.x" znači Node 20, trenutno najnoviji LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY ./ ./

RUN npm --prefix ./client install
RUN npm --prefix ./server install

RUN npm --prefix ./client run dev
RUN npm --prefix ./server run build



