/*
1. create account
2. create an user with password
3. whitelist IP address
4. database > connect > driver > Node > View full code
5. change the password the uri
--------------------------------
1. CREATE --- POST
2. app.post('/users'/ async (req, res) => {})
3. Make the function async to use await inside it
4. Make sure you use the express.json() middleware
5. access data from the body: const user = req.body
6. const result = await userCollection.insertOne(user);
7. res.send(result)

CLIENT
1. create fetch
2. add second parameter as an object
3. provide method: 'POST'
4. add headers : {'content-type' : 'application/js'}
5. add body : JSON.Stringify(user)


--------- read -------------
1. create a cursor = userCollection.find()
2. const result = await cursor.toArray()


---------- delete ----------
1. create app.delete('/users/:id', async(res, req) )


*/