# Build using node 20.11.1
FROM node:20.11.1 as builder

COPY . ./app

WORKDIR /app

RUN npm install --frozen-lockfile
RUN npm run build

#Run inside a leaner node image
FROM node:20.11.1-alpine3.19 as main

# Copy all files from builder
COPY --from=builder /app/  ./app/

WORKDIR /app

RUN npm install --frozen-lockfile

EXPOSE 3001

CMD ["npm", "run", "start:prod-docker"]
