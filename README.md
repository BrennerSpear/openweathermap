
### Open Weather Demo

Using terminal:

```
git clone https://github.com/BrennerSpear/openweathermap-demo.git
cd openweathermap-demo
npm install
npm run build
touch .env
open .env
```

copy & paste using your own [openweather api key](http://openweathermap.org/appid) into the .env file:
```
OPENWEATHERKEY=yourkeygoeshere
```
save the file

back in your terminal window:
```
npm start
```

point your browser to ```localhost:8080```
