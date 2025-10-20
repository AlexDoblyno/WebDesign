# Deploy Full Stack Vue App - PhotoBomb

# Part 9: Installing on Digital Ocean

This tutorial will show you how to setup this application on Digital Ocean. Prior to this tutorial you should have:

- an account on a Digital Ocean server
- a domain name
- configuration of your domain name so that `yourdomain.com` points to the IP address of your server
- configuration of your domain name so that `.yourdomain.com` likewise points to the IP address of your server.
- the ability to clone repositories from GitHub onto your Digital Ocean server

## Verify Mongo installation

You should already have MongoDB installed on your server. If you run:

```
sudo systemctl status mongodb
```

you should see that it is running. If it is not, then use

```
sudo systemctl start mongodb
```

If for some reason it is not installed, then install with:

```
sudo apt install mongodb
```

## Setup your website

We need to configure your web server, nginx, so that it has a new server block for this application. Let’s assume it is called `photobomb.yourdomain.com`. Substitute your own domain as needed.

First, make a directory, where you will store the files, for example:

```
sudo mkdir /var/www/photobomb.yourdomain.com
sudo chown [username] /var/www/photobomb.yourdomain.com
```

Next, navigate to the directory where nginx sites are configured:

```
cd /etc/nginx/sites-available
```

Create a new file there:

```
sudo touch photobomb.yourdomain.com
```

Edit this file with the editor of your choice. Be sure to use sudo. Put the following there:

```
server {
  listen 80;
  server_name photobomb.yourdomain.com;
  root /var/www/photobomb.yourdomain.com;
  index index.html;
  default_type "text/html";
  location / {
    # Serve static files from the root location above.
    try_files $uri $uri/ /index.html;
  }
  location /api {
    # Serve api requests here. This will connect to your node
    # process that is running on port 3001.
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

This will setup nginx so that any requests to `photobomb.yourdomain.com` go to `/var/www/photobomb.yourdomain.com`, except if the request starts with `/api`. In that case, the request will be routed to your Node server running on port 3001.

This setup is called a *reverse proxy*.

**Note that we are using port 3001 for this application.** It must be different than the port that any other server is running on. This must match whatever you setup in `src/server.js` and in `vue.config.js`.

The next step is to link this into the `sites-enabled` directory:

```
cd ../sites-enabled
sudo ln -s ../sites-available/photobomb.yourdomain.com .
```

You should be able to see that this is working properly:

```
ls -al
```

You will see something like this:

```
lrwxrwxrwx 1 root root   34 Mar 14 01:20 photobomb.yourdomain.com -> ../sites-available/photobomb.yourdomain.com
```

This shows that the file is linked correctly. You can also try using `cat` to view the file and make sure it looks right.

The final step is to reload nginx so that this configuration takes effect:

```
sudo nginx -s reload
```

If nginx fails to reload properly, then most likely you have a syntax error in the configuration for a host, or your soft link (from `ln -s`) is incorrect. You can view the exact error with:

```
cat /var/log/nginx/error.log
```

## Install nvm

**You have probably already done this for a previous exercise!**

Navigate to [nvm](https://github.com/creationix/nvm) and find the curl command used to install nvm.

For example:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
```

Then install the stable version of node and npm and use it:

```
source ~/.bashrc
nvm install stable
nvm use stable
```

## Clone your code

Clone your repository into your **home directory**. For example:

```
cd ~/
git clone [PathToYourRepositoryOnGitHub]
cd [RepoDirectory]
```

## Set up the back end

First install the packages you will need:

```
cd back-end
npm install
```

This will find all the packages in `package-lock.json` and install them into this directory.

Now, edit `photos.js`. We setup node for your local machine. There is one thing we need to change in `photo.js`. Make sure you configure multer so that it stores files in your public web server directory. For example:

```
const upload = multer({
  dest: '/var/www/photobomb.yourdomain.com/images/',
  limits: {
    fileSize: 10000000
  }
});
```

You need to change `dest` so that it points to the correct directory. You should only need to change the host name if you have been following my configuration.

Finally, make sure your server runs:

```
node server.js
```

You just want to make sure it starts without errors. Kill it after you check this with `control-c`.

## Set up the front end

Build your public files:

```
cd front-end
npm install
npm run build
```

Now copy your public files to `/var/www`. For example:

```
cp -rp dist/* /var/www/photobomb.yourdomain.com/
```

## Run node forever

You can run your server with:

```
cd back-end
forever start server.js
```

You can check its status with:

```
forever list
```

Note that this will show the log file where output from `server.js` will be stored. This will come in handy!

You can also use:

```
forever stop 0
```

to stop forever job number 0.

## Testing

Everything should be setup. You should be able to browse to your site, e.g `photobomb.yourdomain.com` and have the site work.

## Getting a certificate

If you followed a [previous activity](https://github.com/BYU-CS-260/website-certificates) on obtaining certificates with `certbot`, you should already have certbot configured. You can now use:

```
sudo certbot --nginx -d photobomb.yourdomain.com
```

This will install a certificate for your site. You should now be able to visit it and see a lock icon and HTTPS.

## Debugging

If your site is not working, you should (1) look at the JavaScript console, (2) look at the Network tab in Developer Tools, (3) look at the output of the forever log (see above).