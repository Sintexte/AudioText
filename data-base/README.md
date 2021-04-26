# MongoDB Database Import

[![N|Solid](https://upload.wikimedia.org/wikipedia/en/thumb/4/45/MongoDB-Logo.svg/100px-MongoDB-Logo.svg.png)](https://nodesource.com/products/nsolid)

## LINUX
If you already installed mongodb chances are you have the tools needed to import no download/installation needed
> ✨ Magic ✨ 



## Windows
Windows Users dont have the tools needed to import a database, you must [download](https://www.mongodb.com/try/download/database-tools) the 'database-tools' they are just binary files feel free to add it to your path or directly use it, do as you please.



## Testing
open your favorite terminal emulator and execute 

        $ mongoimport --help



## Import
open data-base/dumb you will find a folder named audiotext here the standart args avaible for mongorestore

    $ mongorestore <options> <connection-string> <directory to restore>
    
assuming your mongodb is keept with the default configuration it comes with you can run this command (Same port / No password ...)


    $ mongorestore --db audiotext ./audiotext
