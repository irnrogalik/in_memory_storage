
use `npm i` to install modules

use `npm start` to start project and go to `http://localhost:3000/`

use `npm test` to starting tests of project

*** Before start project need to: *** 
    1. create ***.env*** file with `STORAGE_TYPE = 'MEMORY'` # can be MEMORY or REDIS 
    2. do `docker-compose up -d` to start redis server

List of url:

1. Lifo:

    1.1 POST **/lifo/add** used to **add an value** to the stack, need to *pass the object* `{ value: 'Value' }`

    1.2 GET **/lifo/get** used to **get an value** to the stack

    ***Both urls return the next JSON object:***
    ```
    {
        description?: string;
        value?: string;
    } 
    ```

2. Key-value:

    2.1 POST **/key-value/add** used to **add an object** to the storage, need to *pass the object* `{ key: 'Key', value: 'Value', ttl?: 1 }`

    2.2 POST **/key-value/get** used to **get an object** by key, need to *pass the key* `{ key: 'Key' }`

    2.3 DELETE **/key-value/delete** used to **delete an object** by key, need to *pass the key* `{ key: 'Key' }`

    ***All urls return the next JSON object:***
    ```
    { 
        description?: String;
        value?: String;
        key?: String;
        ttl?: Number;
    }
    ```
