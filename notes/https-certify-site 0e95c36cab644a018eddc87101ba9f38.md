# https-certify-site

## Getting a certificate

Get a certificate is really easy. The EFF has created [Certbot](https://certbot.eff.org/) to automatically get and install a certificate for your website. On their web page you can select your web server and OS to get customized instructions for how to use it:

Here are the [instructions for Nginx on Ubuntu 18.04](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx.html). In step 4, use the first command shown, which will automatically configure Nginx with a certificate for all of your Nginx websites.

```
sudo certbot --nginx
```

Alternatively, you can get and configure a certificate for a single website:

```
sudo certbot --nginx -d example.com
```