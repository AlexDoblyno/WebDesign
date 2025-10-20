When you setup DNS, you created two records for your server:

-   An "A record" with "@" for the host, the IP address of your Digital Ocean machine, and "20 minutes" for the TTL.
-   An "A record" with "\*" for the host, the IP address of your Digital Ocean machine, and "20 minutes" for the TTL.

The first record allows DNS to translate the name of your host, e.g. "emmasmith.org" into the IP address of your Digital Ocean machine.

The second record allows DNS to translate all subdomains of your host, e.g. "www.emmasmith.org" and "lab1.emmasmith.org" into the IP address of your Digital Ocean Machine

In this activity you are going to set up a virtual host configuration for the NGINX web server, so that different subdomains each go to different websites. From a conceptual level this is pretty easy -- you need `lab1.emmasmith.org` to go to `/var/www/lab1.emmasmith.org` and `lab2.emmasmith.org` to go to `/var/www/lab2.emmasmith.org`. To make this happen requires learning how to configure NGINX. This is done by editing some text files on your server.

## Default NGINX Configuration

Let's first look at the default NGINX configuration. Recall that the default NGINX configuration is in `/etc/nginx/sites-available/default`:

server {  
    listen 80 default\_server;  
    listen \[::\]:80 default\_server;  
    root /var/www/html;
  
    index index.html index.htm index.nginx-debian.html;
  
    server\_name \_;
  
    location / {  
        # First attempt to serve request as file, then  
        # as directory, then fall back to displaying a 404.  
        try\_files $uri $uri/ =404;  
    }  
}

This configures NGINX so that any hostname that is not otherwise configured will use `/var/www/html` for its files.

So right now, every subdomain you try should go to the same website in `/var/www/html`.

## Configuring NGINX for Lab 1

Now, you're going to setup NGINX so that it serves Lab 1 from a different directory. This should enable you to use "lab1" as the subdomain for your domain, such as "lab1.emmasmith.org".  We will be doing our work in the NGINX configuration directory:

cd /etc/nginx/sites-available

Right now, you have one site available: "default". To create a new site:

sudo touch lab1.emmasmith.org

Now edit this with vim:

sudo vim lab1.emmasmith.org

Notice that since this file is owned by "root", you need to use "sudo" to edit it. Place the following in this file, but change the domain name (in two places) to the one that you use:

server {  
  listen 80;  
  server\_name lab1.emmasmith.org;  
  root /var/www/lab1.emmasmith.org;  
  index index.html;  
  default\_type "text/html";  
  location / {  
    try\_files $uri $uri/ =404;  
  }  
}

This file basically says: _If a connection comes into this machine for lab1.chiamo.org, on port 80 (not encrypted), then look in /var/www/emmasmith.org for the files to serve._

The two important lines are the line for "server\_name" and "root". The first gives the name of your website and the second provides the location where files for that website will be stored.

Now you need to enable it the new website configuration. You do this by creating a symbolic link (using the ln command):

sudo ln -s /etc/nginx/sites-available/lab1.emmasmith.org /etc/nginx/sites-enabled/

This creates a link (or a shortcut) from /etc/nginx/sites-enabled/lab1.emmasmith.org to /etc/nginx/sites-available/lab1.emmasmith.org.

You need to make sure the new web site directory exists and that you own it:

sudo mkdir /var/www/lab1.emmasmith.org  
sudo chown zappala /var/www/lab1.emmasmith.org

Substitute your own username and domain name above!

You now need to reload Nginx:

sudo service nginx reload

## Set up your new site

Create some new files for your website in `/var/www/lab1.emmasmith.org`. You will need at least `index.html`.

Browse to `lab1.emmasmith.org` and it should work.

For later labs and creative projects, you can repeat this process to create a new configuration in `/etc/nginx/sites-available`, and then link to it in `/etc/nginx/sites-enabled`.

## Submission

Turn in a screenshot showing that your Lab 1 website is configured and working properly, with new content on lab1.emmasmith.org (or whichever domain you own). Be sure to include the URL bar.
