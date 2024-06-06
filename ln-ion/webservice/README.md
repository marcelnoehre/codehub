# LN-ION Webservice

## Docker
```
docker build -t ion-webservice .
```

```
docker save -o ion-webservice.tar ion-webservice
```

```
docker load -i ion-webservice.tar
```

```
docker run -d -p 4500:4500 ion-webservice
```