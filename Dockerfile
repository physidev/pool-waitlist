FROM node:18-alpine

WORKDIR /pool-waitlist

COPY public/ /pool-waitlist/public
COPY src/ /pool-waitlist/src
COPY package.json /pool-waitlist/

RUN npm install

CMD ["npm", "start"]