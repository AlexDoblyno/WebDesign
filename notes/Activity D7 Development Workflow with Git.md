For this activity, you will be learning how to setup a workflow where you edit code on your local machine, push your changes to Git, then login to your server, pull down the changes, and deploy them. This allows you to develop code faster, since you can easily examine your website on your local machine. This also separates your development environment from your "production" environment (your live code running on your web server), which is **crucial** when working in a professional environment.

## Install and learn to use a code editor

I recommend [Visual Studio Code (Links to an external site.)](https://code.visualstudio.com/) or  [Atom (Links to an external site.)](https://atom.io/). Other choices include:

-   -   [Sublime Text (Links to an external site.)](https://www.sublimetext.com/3)
    -   [Brackets (Links to an external site.)](http://brackets.io/)
    -   [Vim (Links to an external site.)](https://vim.sourceforge.io/download.php)
    -   [Emacs (Links to an external site.)](https://www.gnu.org/software/emacs/download.html)

## Create a web site

On your local machine, create a directory called `portfolio`. Inside this directory, create a plain HTML file called `index.html` that is a portfolio of your work. This should include, at a minimum:

-   About: a short statement about you
-   Projects: a list of at least three projects you have worked on (it doesn't matter how simple they are)
-   Experience: a list of your work experience
-   Contact: a list of ways to contact you, including links to your LinkedIn, GitHub, or other accounts

Your web page should use only HTML, no CSS, and should use the following HTML elements:

-   title
-   h1, h2 headers
-   paragraphs
-   lists
-   links
-   a horizontal rule

See the [HTML](https://byu.instructure.com/courses/8912/pages/html "HTML") page for help.

## Run a local web server

On your local machine, inside your `portfolio` directory, start a local web server to test your code. You can [run a local web server with either Python or node](https://byu.instructure.com/courses/8912/pages/running-a-local-web-server "Running a local web server"). If you have not set this up yet, go back and read those instructions.

For Python:

python3 -m http.server

or

python -m http.server

For Node:

http-server

##  Create a GitHub repository

Create a repository on GitHub for this activity. I called my "portfolio". **Don't** check the box for adding a README file. Be sure to go back and review the Git lessons if you haven't completed them yet.

Inside of your `portfolio` directory, initialize a git repository with `git init`, make your first commit, then add the GitHub repository as a remote and push your code to GitHub. View your code on GitHub to be sure it is there. Here is what this looks like:

git init  
git add index.html  
git commit -m "First commit"
git remote add origin git@github.com:zappala/portfolio  
git push -u origin master

Be sure to substitute your own username and repository name. 

**Repository Links**

Note, you should have setup GitHub with SSH keys. If for some reason you didn't do this, go back and do it now. :-)  If you are not using SSH keys, then you might clone a repository with HTTPS, and your GitHub links will look like this: `https://github.com/zappala/gitpractice.git`. Whereas, if you are using SSH keys, then your GitHub links will look like  `git@github.com:zappala/gitpractice`. Using an SSH key is more secure, since it doesn't rely on you picking a strong password, and you don't have to type your password every time you access GitHub.

There is a small link in the Clone or Download dialog that lets you switch between HTTPS and SSH for cloning.

## Clone your GitHub repository on your server

You are going to clone your git repository to your Digital Ocean server. For the git clone to work using your SSH keys, you must copy the keys from your local machine to your server. To do this, run this command **from your local machine**:

scp ~/.ssh/id\_rsa\* zappala@emmasmith.org:/home/zappala/.ssh/

**Substitute your own username and host** **name**. Remember, you can use your host name to refer to your machine or your IP address.

Next, login to your server and run this command:

chmod 600 ~/.ssh/id\_rsa\*

Next, while still on your server, use `git clone` to clone your GitHub repository into your home directory. This will be in `/home/your username`.

git clone git@github.com:zappala/portfolio

**Substitute your own username and repository.**

## Copy your files to the web directory

You should have already run this command to give yourself ownership of the web directory, but if you haven't do it now:

```
sudo chown -R [your username] /var/www/html
```

Next, cd into your repository:

cd portfolio

Now copy your `index.html` file there:

cp index.html /var/www/html/

Visit your server in a browser, using the domain name or IP address of your DigitalOcean machine, to verify it works. You should see the same thing you saw in your local web server. This verifies that what you developed on your local machine also works for everyone else once it is on the server.

**Why are we doing it this way?**

Many students decide to take a shortcut and clone their repository directly into /var/www/html. **This is a bad idea.** When you do this, you put all your source code into a directory that anyone in the world can access via your web server. For now, this might be OK, because all that is there is HTML for your website. But in the future, we will have back end code, which you don't want everyone to be able to get and see. Do it this way so that you practice good habits.

## Practice your workflow

On your local machine, make some kind of a change to your `index.html` file. Commit and push the changes to GiHub. Login to your DigitalOcean server and pull these changes and then copy them to `/var/www/html` again. Reload your browser. Be sure this all works. This is your development workflow! We will be using this cycle regularly throughout the class.

If you need still help, this video provides an explanation and walkthrough of using git in CS260: 

[https://www.youtube.com/watch?v=VjhGDE2nQlo (Links to an external site.)](https://www.youtube.com/watch?v=VjhGDE2nQlo)[](https://www.youtube.com/watch?v=VjhGDE2nQlo)

**Helpful reference commands:**

Initializing a new github repository. (Only needs to be run once, at the start of a new project). Replace "git@github.com:zappala/gitpractice" with your project ssh reference.

git init  
git remote add origin git@github.com:zappala/portfolio

Adding all changes in a directory, creating a commit, and pushing to master. (This needs to be done everytime you change files on your local computer and want to push those changes to github)

git add .  
git commit -m "Type Commit Message Here"  
git push origin master

Cloning a repository (run once, when you want to save a new repository to your computer)

git clone git@github.com:zappala/gitpractice

Updating a cloned repository (after changes are pushed to github and you want to pull them down)

git pull origin master

## Submission

Turn a screenshot of your web page, including the URL that shows it is on your Digital Ocean server. Congrats!