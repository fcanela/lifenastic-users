FROM mhart/alpine-node:latest

WORKDIR /service
ADD . .

ENV NODE_ENV="production"

# Install dependencies
RUN ["npm", "install"]

CMD ["node", "run.js"]
