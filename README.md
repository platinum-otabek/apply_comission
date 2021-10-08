# Test# apply_comission



## Deployment
+ clone the repo
+ create .env file inside main directory
+ put these value into `.env`: 
```
    JWT_SECRET=<Your Json Web Token secret key>
    JWT_EXPIRES_IN=<Expire date>
    HTTP_LOCATION=<HOST name>
    GRAY_IMAGE_PATH=<grayscale_images folder>
```

+ create docker containers
```
docker build . -t <apply>
```
+ Run the image
```
docker run -p 4000:4000 -d <apply>
```


## Configure web server
You should configure web server, you can use nginx,  it is much more easy. It really does not matter which web 
server you use, just do not forget to add two endpoints for static files:

+ `/uploads/image` - this is for all images


## URLs
+ `/docs/` - documentation about API
