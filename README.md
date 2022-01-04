# **Management Node API**
We are constantly faced with new commercial establishments, many of which do not have a means of promotion or are not easily located. The REGALE System came to solve this problem, with a focus on bakeries, it allows the user, through a web system, to locate the bakeries close to their residence.
<br/>
<br/>

> ## Product scope
The System aims to list the bakeries and manage them, enabling consultation by customers. The project aims to promote the bakeries, especially those that are starting on the market, or that are not well known. Allows you to offer more product options and prices.
<br/>
<br/>

> ## General description
REGALE is a web system that aims to establish a relationship between the customer and a specific market niche. All of its features were designed and designed to provide comfort and convenience to users.

The System's proposal is to publicize the establishment, which is a recurrent problem in bakeries that are just starting on the market, as they still don't have a way to publicize their business.

In addition to publicizing the establishments, the System provides a user-friendly interface for the customer to list the bakeries and manage them and the 'customer' user. The users of the system are the administrator, the owner of the bakery and the customer. Where everyone has access to the system according to their credentials and access permissions. In addition, the System has an initial screen that allows the public to easily navigate between categories, products and suppliers.
<br/>
<br/>

> ## Functional requirements
[FR1] It is necessary to handle admin user authentication. Explanation: The System must allow admin access based on his credentials. Blocking any access attempts by other users.

[FR2] Only authorized supplier users can access the system. Explanation: The System must allow access to suppliers based on their credentials. Blocking any access attempts by other users.

[FR3] It is necessary to handle client authentication. Explanation: The System must allow access to clients based on their credentials. Blocking any access attempts by other users.

[FR4] The admin user must register categories. Explanation: The System will allow the admin user to register new categories.

[FR5] The supplier user must register. Explanation: The System will allow the supplier user to register.

[FR6] The admin user must authorize vendor access to the system. Explanation: The admin user may or may not authorize the access of suppliers to the system.

[FR7] The supplier user can register the product. Explanation: The System makes available to the supplier user the possibility of registering their products in the system.

[FR8] The client user must register. Explanation: The System will allow the customer to register in the system.

[FR9] The admin user must be able to view all suppliers listed in alphabetical order. Explanation: The System allows the admin to view the suppliers registered in the system.

[FR10] The supplier user can view the products in a listing and they will have the category information. Explanation: The System should display the supplier user a listing of the products, as well as the category information.

[FR11] The admin user must be able to view products by supplier. Explanation: The System allows the admin user to view the products by their respective suppliers.

[FR12] After access approval/cancellation, the system sends an email message to the supplier. Explanation: The System must send an activation or inactivation confirmation email to the supplier, in case the System admin revokes or allows the access by the supplier.

[FR13] The client user can bookmark up to three providers. Explanation: The System should allow only three suppliers to be favored by the customer.

[FR14] The admin user must be able to view customers by supplier. Explanation: The System must allow the administrator user access to the data grouped by customers/supplier

[FR15] The supplier user can mark up to three products as favorites. Explanation: The System should allow only three products to be favored by the supplier.

[FR16] All users have the possibility to list the suppliers sorted by number of favorites and in alphabetical order. Explanation: The System should display the supplier data sorted by number of favorites and in alphabetical order.

[FR17] All users have the ability to list products by category sorted by favorite, by value and by description. Explanation: The System should display products by category sorted by favorite, by value and by description.

[FR18] All users need to define the location (UF and city) to search. Explanation: The System should display filter users by locality (UF and city).
<br/>
<br/>

> ## License
- GPLv3 License
<br/>
<br/>

> ## Methodologies and Designs
* MVC
* Conventional Commits
* GitFlow
* Use Cases
<br/>
<br/>

> ## Libraries and Tools
* NPM
* Typescript
* Git
* Docker
* MongoDb
* Bcrypt
* JsonWebToken
* Validator
* Express
* Husky
* Lint Staged
* Eslint
* Standard Javascript Style
* Nodemon
* FileSystem
<br/>
<br/>

> ## Node Features
* API documentation with Swagger
* Rest API with Express
* Error Log
* Security (Hashing, Encryption and Encoding)
* Middlewares
* Access Level on Routes (Admin, Provider, Client and Anonymous)
* Deploy on Heroku
* Serve Static Files
<br/>
<br/>

> ## Features do Git
* Alias
* Log Personalizado
* Branch
* Reset
* Amend
* Tag
* Stash
* Rebase
* Merge
<br/>
<br/>

> ## MongoDb Features
* Connect e Reconnect
* Collections
* InsertOne e InsertMany
* Find, FindOne e FindOneAndUpdate
* DeleteMany
* UpdateOne
* Aggregation (Match, Group, Unwind, Lookup, AddFields, Project, Sort)
* ObjectId
* Upsert e ReturnOriginal
* Push, Divide, Multiply, ArrayElemAt, Cond, Sum
* Filter, Map, Reduce, MergeObjects, ConcatArrays