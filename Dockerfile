FROM node:10 

WORKDIR /app 
COPY . . 

EXPOSE 3032

RUN npm install 

RUN npm rebuild node-sass

CMD ["npm","start"]