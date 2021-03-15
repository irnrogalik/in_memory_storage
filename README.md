
use `npm i` to install modules

use `npm start` to start project and go to `http://localhost:3000/`

use `npm test` to start project

List of url:

1. Stack:

    1.1 POST **/stack/add** used to **add an value** to the stack, need to *pass the object* `{ value: 'Value' }`

    1.2 GET **/stack/get** used to **get an value** to the stack

    ***Both urls return the next JSON object:***
    ```
    {
        description?: string;
        value?: string;
    } 
    ```

2. Storage:

    2.1 POST **/storage/add** used to **add an object** to the storage, need to *pass the object* `{ key: 'Key', value: 'Value', ttl?: 1 }`

    2.2 POST **/storage/get** used to **get an object** by key, need to *pass the key* `{ key: 'Key' }`

    2.3 DELETE **/storage/delete** used to **delete an object** by key, need to *pass the key* `{ key: 'Key' }`

    ***All urls return the next JSON object:***
    ```
    { 
        description?: String;
        value?: String;
        key?: String;
        ttl?: Number;
    }
    ```

3. Redis:

    2.1 POST **/redis/add** used to **add an object** to the storage, need to *pass the object* `{ key: 'Key', value: 'Value', ttl?: 1 }`

    2.2 POST **/redis/get** used to **get an object** by key, need to *pass the key* `{ key: 'Key' }`

    2.3 DELETE **/redis/delete** used to **delete an object** by key, need to *pass the key* `{ key: 'Key' }`

    ***All urls return the next JSON object:***
    ```
    { 
        description?: String;
        value?: String;
        key?: String;
        ttl?: Number;
    }
    ```
