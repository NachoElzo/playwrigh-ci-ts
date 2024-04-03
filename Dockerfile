FROM mcr.microsoft.com/playwright:v1.42.1-jammy

#creating a folder to store the project
RUN mkdir /app
#directory in where we are going to work
WORKDIR /app
#copy root project with . / and paste it in /app (docker)
COPY . /app/

#installing dependencies 
RUN npm install --force
RUN npx playwright install 