## Create an SSH Key

The first step is to setup an SSH key. [Be sure to read the background information](https://byu.instructure.com/courses/8912/pages/ssh-keys " SSH Keys").

Run the following command, if you don't already have an SSH key:

ssh-keygen

On the first line "Enter file in which to save the key  (/c/Users/susan/.ssh/id\_rsa):" leave it blank and press enter. This will give it the default name. 

**Be sure to choose a good password for this key.** I recommend a [correct-battery-horse-staple password (Links to an external site.)](http://correcthorsebatterystaple.net/).

This will create two files in the directory called ~/.ssh:

-   id\_rsa.pub : This is your public key. You can freely share this with any server.
-   id\_rsa : This is your private key. Never share this with anyone and never reveal your password for your private key.

Check for these files to have the correct names and location.  If they do not match move them or run the command again and follow the above instructions exactly. 

## Create a Droplet

Follow the [how to create your first droplet tutorial (Links to an external site.)](https://www.digitalocean.com/community/tutorials/how-to-create-your-first-digitalocean-droplet) to create a remote server using DigitalOcean. They call their servers "droplets". The $5 version will be fine. Use a Ubuntu image so you want to follow along with our advice this semester. **Be sure to use SSH keys when choosing Authentication**.  You can get $50 DigitalOcean credit if you sign up for [GitHub Student Developer Pack (Links to an external site.)](https://education.github.com/pack)**.** 

**At the conclusion of this step, verify that you can login to your server with your SSH key.**

You can do this with

ssh root@45.55.164.105

Be sure to substitute your own IP address. If you get a permission denied error check that you selected the ssh option when creating your droplet.

## Create a Regular User Account

Login to your server and create a regular user account for yourself:

ssh root@45.55.164.105  
adduser susan

Use whatever username you like. Make sure it is all lowercase. Then give that user root privileges:

usermod -aG sudo susan

Edit the sudo permissions so that you don't need a password for this new user:

visudo

This uses the nano editor to edit sudo permissions. Edit the file so that it reads like this:

\# Allow members of group sudo to execute any command  
%sudo   ALL=(ALL:ALL) NOPASSWD:ALL

You can use the arrow keys to navigate, type the text, and then use control-X to exit and save. 

Reload the SSH daemon when you are done:

sudo systemctl reload sshd

## Setup SSH keys for the new user

**While still logged in as root on your server,** now act as if you are susan:

su - susan

From now on, every action you take will be as if you are logged in as susan. Make a directory:

mkdir ~/.ssh

Be sure it is not readable:

chmod 700 ~/.ssh

Add your public key to the list of authorized keys for that user:

sudo cp /root/.ssh/authorized\_keys /home/susan/.ssh/authorized\_keys

Change the ownership and permissions of this file:

sudo chown susan ~/.ssh/authorized\_keys

Stop acting as susan:

exit

Remove the password for this new account:

passwd --delete susan

## Disable Password Authentication (Optional)

The default setup should work for you. However, if you want, you can prevent any regular user accounts from using passwords (meaning, force SSH keys to always be used).

**While still logged in as root on your server,**

now edit the file /etc/ssh/sshd\_config:

sudo nano /etc/ssh/sshd\_config

Be sure the the file reads as follows:

PasswordAuthentication no  
PubkeyAuthentication yes  
ChallengeResponseAuthentication no

## Testing

To test that you have this working properly, try to ssh into your server using the new account. This should be done from your local computer, not from the root account in your server:

ssh susan@45.55.164.105

This should prompt you for the password you used when you created your SSH keys and then log you in.

If you get this error message: **Permission denied (publickey)**, then review the steps above. For SSH keys to work, you need:

-   a public key, id\_rsa.pub, and a private key, id\_rsa, in ~/.ssh, on your laptop
-   the contents of the public key, id\_rsa.pub, in the file ~/.ssh/authorized\_keys on your server

For example, my authorized\_keys looks like this:

zappala@cs465:~$ ls -al .ssh/authorized\_keys  
\-rw------- 1 zappala zappala 395 Dec 31 22:45 .ssh/authorized\_keys  
zappala@cs465:~$ cat .ssh/authorized\_keys  
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDSyYhiaG6nfN6pWp3j1rirOXOYMe/aCEnfvZ6CHsbIftmqwqHQZVIGB6Qm/Bt3VaKFYECtRO+SrJBFqw7wVktxNtFmkMa9cEUfIKq14SGms4hKkIIwl3XSuIBAFljjI5g0YoBFLNQUWjMoj3kkDQNt5F+kij7XtaCRGf+3tapu3V5+RAfK1whLBs6FvHJ/syTsReieL2Bjb/9yCId51igLMZhuUzU+vrpQRuJqJExvXUAJWDCnioa52qUTTf7iqaIymcOuYM/g8Uy+xFEyahOUDJjr7HgNFhI7KnSU741wiyJ85lKqar3zo5m+3wpw0n1/dmHPSU+cRZURYtp1OErZ zappala@pizza

Be sure the public key on your laptop matches the one on in authorized\_keys on the server.

## Moving Forward

From now on, you will do everything on your Digital Ocean machine with this new user account. When you need to do something that requires root access, you will use the _sudo_ command, as illustrated above. Use the root account only for emergency access.

## Avoiding Passwords

As described above, you still have to enter the password for the SSH key so that you can unlock it each time that you use it. This gives you the advantage of greater security as compared to using the password to login, but still the inconvenience of having to remember this password.

To avoid this hassle, you can use an SSH agent. Follow one of these instructions. **Do this step on your laptop.**

**MacOS**

Run this command:

ssh-add -K ~/.ssh/id\_rsa

to add the key to your keychain. Then create an `~/.ssh/config` file. You can do this with

touch ~/.ssh/config

In that `~/.ssh/config` file, add the following lines:

```
Host *
  UseKeychain yes
  AddKeysToAgent yes
  IdentityFile ~/.ssh/id_rsa
```

The `IdentityFile` is the path to your private key. The `UseKeychain yes` is the key part, which tells SSH to look in your OSX keychain for the key passphrase.

**Windows**

Use Git Bash and use the following [instructions to for Git Bash. (Links to an external site.)](https://gist.github.com/bsara/5c4d90db3016814a3d2fe38d314f9c23)

**Linux**

Run this command:

ssh-add ~/.ssh/id\_rsa

to add the key to your Gnome keyring. For details see [this link (Links to an external site.)](https://wiki.archlinux.org/index.php/GNOME/Keyring#SSH_keys).

## Submission

Turn a screenshot of you using ssh to login to your Digital Ocean machine with your own (non-root) account and an SSH key. This would look like the command "ssh susan@45.55.164.105" and all that follows.  We will be checking that is does not ask for the server password(though it may ask for a ssh passphrase) and that it does down to the prompt on your server like "susan@ubuntu-s-1vcpu-1gb-nyc1-01:~$".