# Set Up New brighambandersen.com Subdomain Site

Set up server to redirect to your subdomain

```
cd /etc/nginx/sites-available
sudo nano {subdomain}.brighambandersen.com
    Add to file

    server {
        listen 80;
        server_name lab1.emmasmith.org;
        root /var/www/lab1.emmasmith.org;
        index index.html;
        default_type "text/html";
        location / {
            try_files $uri $uri/ =404;
        }
    }

sudo ln -s /etc/nginx/sites-available/{subdomain}.brighambandersen.com /etc/nginx/sites-enabled/
```

Set up new directory for subdomain website files

```
sudo mkdir /var/www/{subdomain}.brighambandersen.com
sudo chown brig /var/www/{subdomain}.brighambandersen.com

sudo service nginx reload
```

Get website files on server cd ~ git clone {subdomain_project_repo_name}

```
** IF VUE APP -
npm install             (install all front end package dependencies)
npm run build           (copies compressed site to 'dist/' directory)
cp -rp dist/* /var/www/{subdomain}.brighambandersen.com/

** ELSE (IF NORMAL JS SITE)
cp -r * /var/www/{subdomain}.brighambandersen.com/
```

- - IF HAS A BACKEND W/ THAT NEEDS SERVER TO BE RUNNING (LIKE EXPRESS) npm install (install all back end package dependencies) node {server}.JS (test that it runs without errors, then break out) forever start {server}.js forever list (make sure your new process is running)

Add HTTPS certification using CertBot

```
sudo certbot --nginx -d {subdomain}.brighambandersen.com
```
