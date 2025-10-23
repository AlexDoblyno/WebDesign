In this activity, you will setup a DNS configuration for your server that is hosted with Digital Ocean. The Domain Name Service (DNS) allows you to translate the _name_ of the server you want to connect to (e.g. emmasmith.org) into the _IP address_ of this server (e.g. 176.32.98.166).

We will show you how to use DNS and Nginx to serve your website on a domain of your choosing, for example emmasmith.org.

## Obtain a Domain Name

For this activity, follow ONE of the options below.  **I strongly recommend using NameCheap or another external DNS provider. This will give you experience purchasing your own domain and BYU Domain configurations have caused students problems in the past. If you use a BYU Domain, and you run into problems, then go back here and buy a new domain with NameCheap and start over with this activity.**

**Option 1: NameCheap**

Visit NameCheap to purchase a domain name. You will need to create an account there. A domain name may cost you about $10 for a year. For example, you may be able to purchase a domain name that uses your real name, such as emmasmith.org. You can pick whatever you like. Jump to "Configure Namecheap DNS" if you want to use NameCheap.

**Option 2: BYU Domains**

All BYU Students also get a free domain through BYU Domains, which you can use for this class.  Visit [https://domains.byu.edu/ (Links to an external site.)](https://domains.byu.edu/) and click login. You will be prompted to create your free domain. After your domain is created, navigate to "Configure BYU DNS" to use BYU Domains for your DNS.

## Configure NameCheap DNS

After you purchase your domain name, you need to set it up so that anyone who uses DNS to look up your domain name will retrieve the IP address of your Digital Ocean server.

To do this, the first step is to add a new DNS record. In Name Cheap, navigate to your domain and click "Advanced DNS".

You need to add two DNS records and delete the two default records that are there. (The defaults are a CNAME and a URL redirect that shows a parked web page).

1.  Click "Add new record". Choose "A record" and enter "@" for the host, the IP address of your Digital Ocean machine, and "20 minutes" for the TTL. Save this.
2.  Click "Add new record". Choose "A record" and enter "\*" for the host, the IP address of your Digital Ocean machine, and "20 minutes" for the TTL. Save this.

Delete the other two records.

When you have added the records successfully your "Advanced DNS" tab will contain records that look like this:

![namecheaprecords.PNG](https://byu.instructure.com/users/30894/files/2245326/preview?verifier=9xxHLjXliKoA3vy1tIdQNc06BuQhdhsTuARpJXpG)

It may take some time for these changes to be updated throughout the Internet (15 to 30 minutes), but after some time you should be able to browse to your website using the domain name you purchased and any subdomains. For example, if you try the following domains, they should go to the same site:

-   emmasmith.org
-   lab1.emmasmith.org
-   cp1.emmasmith.org

Congratulations! You've now configured your own Domain! Navigate to "Understanding NGINX configuration" to continue reading.

## Configure BYU DNS

Navigate to your CPanel, which looks like the image shown below

![BYudomains.PNG](https://byu.instructure.com/users/30894/files/2245221/preview?verifier=64MdvzJLx5DPgXZGq0xitgDT3Lxio1oafusfrdny)

Under the "Domains" Tab, click "Zone Editor". You will see a list of all the domains that you own. Under the new domain you created, click "manage". This will take you to the DNS "Zone Records" page. 

You will create two new "A Records". If some records already exist, delete them.

1.  Click "Add Record" in the upper-right corner.
    -   Under "Name" put your domain name. (i.e. emmasmith.org, drclement.com, cs-ta.com)
    -   Under "TTL" type "1200"
    -   "Type" should be "A"
    -   Under "Record" paste the IP Address of your Digital Ocean Machine.
    -   Click "Add Record" to add and save the new record.
2.  Click "Add Record" in the upper-right corner.
    -   Under "Name" put "\*" (asterisk) followed by your domain name. (i.e. \*.emmasmith.org, \*.drclement.com, \*.cs-ta.com)
    -   Under "TTL" type "1200"
    -   "Type" should be "A"
    -   Under "Record" paste the IP Address of your Digital Ocean Machine.
    -   Click "Add Record" to add and save the new record.

This will route all domain and subdomain access through your Digital Ocean Machine. When you have added the records successfully your "Zone Editor" page will contain records that look like this:

![s3.png](https://byu.instructure.com/users/30894/files/2245313/preview?verifier=aWOoVjAutXDsLhylgYc1CemNPyNII3ixz7dX64af)

It may take some time for these changes to be updated throughout the Internet (15 to 30 minutes), but after some time you should be able to browse to your website using the domain name you purchased and any subdomains. For example, if you try the following domains, they should go to the same site:

-   emmasmith.org
-   lab1.emmasmith.org
-   cp1.emmasmith.org

Congratulations! You've now configured your own Domain! Navigate to "Understanding NGINX configuration" to continue reading.

## Understanding NGINX Configuration

Let's take a look at the configuration for your Nginx web server so that we can understand how it works. This is located in /etc/nginx/sites-enabled/default. You should be able to navigate and view this file using the command line:

cd /etc/nginx/sites-available  
less default

Here is the default configuration:

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

Note that there are many other lines that begin with the "#" character. These are all comments. Starting lines with a "#" is the typical way for Linux configuration files to include comments.

In nginx, the web server configuration is given as a "server block", which is why the first line starts with "server". You can setup multiple websites using the same web server, and each website gets its own server block. Later, we will setup a special server block for "lab1.emmasmith.org" and "lab2.emmasmith.org". This file contains the default server block and will be used for any website that hasn't otherwise been defined.

The first "listen" line says to run a web server on port 80, which is the standard port for HTTP. This will be the "default" server, meaning any website (emmasmith.org, www.emmasmith.org, lab1.emmasmith.org, etc.) that you have not otherwise configured will use this configuration.

The second "listen" line allows web browsers to connect to your website using IPv6 (the newest version of the IP protocol) in addition to IPv4 (the version we have been running for nearly 50 years).

The "root" line tells the web server where to find the files it will serve. These are located in /var/www/html.

The "index" line tells the web server which files will be used when browsing a directory. For example, when you visit http://emmasmith.org, you are technically visiting the directory named "/" and the web server will look for a file called "index.html" or "index.htm" or any of the other names listed in the /var/www/html directory. If you visit http://emmasmith.org/papers" then it will likewise look for one of  these files in the /var/www/html/papers directory.

The "server\_name" line lists the names your server can use. Since this line uses an invalid hostname of "\_", it will not conflict with any other server names we set up later for other server blocks.

The "location" line tells the web server how to handle requests for your website. Since it lists "/", known as "root", this location block will handle all of the requests for your website.

The "try\_files" line tells the web server to first use the URL being visited (e.g., emmasmith.org), then try adding a slash to the end of it (e.g., emmasmith.org/) and if both of these fail, then return a 404 Not Found error.

## What you can do now

Now that you have a DNS name for your server, you can use it _any time you refer to your server_. This applies to both SSH and your web server. For example, if your machine is named emmasmith.org, then you should be able to:

ssh username@emmasmith.org

and use your browser to visit `http://emmasmith.org`.

## Submission

Turn in a screenshot of your website, showing the URL bar for your equivalent of emmasmith.org. This should let us see the web page you set up from the previous activity, now with your new domain name.