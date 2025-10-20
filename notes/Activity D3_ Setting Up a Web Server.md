## Setup a firewall

A firewall blocks all incoming traffic to your server, by default, and then you can decide which traffic to let in. This section shows you how to setup a basic firewall that only allows SSH connections to your server and nothing else.

Login to your server as a regular user:

ssh susan@44.55.105.88

List the current status of the firewall:

sudo ufw status

You may see something like this, indicating it is inactive:

zappala@cs465:~$ sudo ufw status  
Status: inactive

List the available application profiles for the firewall:

sudo ufw app list

zappala@cs465:~$ sudo ufw app list  
Available applications:  
  OpenSSH

Now allow OpenSSH:

sudo ufw allow OpenSSH

And then enable the firewall:

sudo ufw enable

And check the status again:

sudo ufw status

zappala@cs465:~$ sudo ufw status  
Status: active

To                         Action      From  
\--                         ------      ----  
OpenSSH                    ALLOW       Anywhere  
OpenSSH (v6)               ALLOW       Anywhere (v6)

This above tutorial comes from a [DigitalOcean guide (Links to an external site.)](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04#step-seven-%E2%80%94-set-up-a-basic-firewall).

## Setup the NGINX web server

This section shows you how to setup the NGINX web server so that you can run websites from your server. The first step is to make sure all the software on your machine is up to date:

sudo apt-get update

Now install the NGINX web server:

sudo apt-get install nginx

Now you will need to adjust your firewall to allow incoming connections to reach the web server. Before you take this step, you may want to try connecting to your web server by typing your IP address into the browser URL bar. You will get a connection error -- it is as if your server is not running at all. This is what the firewall does for you!

To enable see what is available:

sudo ufw app list

To enable NGINX:

sudo ufw allow "Nginx Full"  
sudo ufw status

You should now see that HTTP and HTTPs are both allowed for your server:

zappala@cs465:~$ sudo ufw status  
Status: active

To                         Action      From  
\--                         ------      ----  
OpenSSH                    ALLOW       Anywhere  
Nginx Full                 ALLOW       Anywhere  
OpenSSH (v6)               ALLOW       Anywhere (v6)  
Nginx Full (v6)            ALLOW       Anywhere (v6)

If you visit your server's IP address in the URL bar of your browser, you should see:

![default_page.png](https://byu.instructure.com/courses/8912/files/2859263/preview)  

## Default configuration

NGINX can server multiple websites at a time, one per domain name. Later we will show you how to set this up. For now, it is using the default configuration, which serves the files in the /var/www/html directory.

cat /var/www/html/index.nginx-debian.html

You should see the file that your server was delivering. Normally, the server will look for a file called index.html, but since that didn't exist it next looks for index.nginx-debian.html and serves that.

To make your life a little easier, let's change the ownership of the /var/www/html directory so that it belongs to you:

sudo chown -R susan /var/www/html

The "-R" option makes this recursive.

Now let's create our own web page. In the /var/www/html directory, create or place a basic HTML file.  Name this file "index.html".

touch /var/www/html/index.html

Use nano to edit this file:

cd /var/www/html  
nano index.html

You can use the following code as a template:

<!DOCTYPE html>  
<html>  
<head>  
<title>Daniel's Web Server</title>  
</head>  
<body>

<h1>Introduction</h1>  
<p>Hi, my name is Daniel Zappala</p>

</body>  
</html>

Edit this file to replace my name with your name.  You can use Vim, Emacs, or any other another command line text editor to create and edit files on your server.

Once you have saved this file, you should be able to visit it using the IP address of your server. For example:

[http://45.55.164.105 (Links to an external site.)](http://45.55.164.105/)

## Submission

Turn in the assignment by submitting a screenshot of your website. Be sure to include the URL bar with your IP address.
