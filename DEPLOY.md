# Deployment instructions
## Login to Azure
Using the Azure CLI tools, login to Azure:
```bash
az login
```
## Create a resource group
Create a resource group to manage web app and database resources:
```bash
az group create --name sinStimResourceGroup --location "West US 2"
```
## Create a MySQL database
Create a MySQL database that will hold the sinstim database:
```bash
az mysql server create --resource-group sinStimResourceGroup --location "West US 2" --sku-name B_Gen5_1 --name sinstims --admin-user <db-username> --admin-password <db-password>
```
We use the name `sinstims` to denote that this database is related to getting the smoking (s) images.

## Create firewall rules
Create firewall rules to allow access from Azure resources and your current local machine:
```bash
az mysql server firewall-rule create --resource-group sinStimResourceGroup --server sinstims --name AllowAzureIps --start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0
az mysql server firewall-rule create --resource-group sinStimResourceGroup --server sinstims --name AllowLocalClient --start-ip-address <your-ip-address> --end-ip-address <your-ip-address>
```

## Connect to Azure MySQL locally and create database
```bash
mysql -u <admin-user>@sinstims -h sinstims.mysql.database.azure.com -P 3306 -p
```
At the `mysql` prompt, create the database.
```sql
CREATE DATABASE sinstim;
```
Create a user with all permissions
```sql
CREATE USER 'sinstimuser' IDENTIFIED BY <db password>; 
GRANT ALL PRIVILEGES ON sinstim.* TO 'sinstimuser';
```

## Deploy existing database data
```
mysql -u sinstimadmin@sinstims -h sinstims.mysql.database.azure.com -P 3306 --database=sinstim -p < db/mysql-create-and-data-insert-script/sin-stim_2020-01-29.sql
```
And enter the `sinstimuser` password at the prompt.

## Create the web app
Create the web app on the [Azure portal](portal.azure.com) so the .NET 5.0 runtime can be selected,
following [these instructions](https://devblogs.microsoft.com/aspnet/announcing-asp-net-core-in-net-5/#deploy-net-5-web-apps-to-azure-app-service-today).

## Deploy the webapp
Deploy either by pushing to the git repository at [`https://sinstims.scm.azurewebsites.net/sinstims.git`](https://sinstims.scm.azurewebsites.net/sinstims.git) (preferred method)
or by using `az webapp up` as follows:
```
az webapp up --sku F1 --location "West US 2" --name sinstims --os-type linux
```
which will zip up the entire directory, transfer to Azure, unzip, build and run.

## Deploy the configuration
The `sinstim` application requires an appsettings.json file.
Modify the sample appsettings.json with the correct database connection string,
and the correct `pictureHost` configuration for the CDN that hosts the images.
Then [use FTP to transfer this file](https://github.com/projectkudu/kudu/wiki/Accessing-files-via-ftp)
to the deployed webapp.

## Use application
Once deployed, follow the [usage](./USAGE.MD) guide to use `sinstim`.