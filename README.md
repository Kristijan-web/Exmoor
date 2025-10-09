Exmoor parfemi (perfumes) E-commerce

URL: https://exmoorparfemi.netlify.app

Frontend
- React (React router, Context API, React Query, react-hook-form, react-hot-toast)
- Vitest
- Typescript
- Tailwind

Backend
- Express
- Authorization & Authentification (jsonwebtoken)
- Typescript
- Mongoose (ODM)

Database
- MongoDB (MongoDB Atlas)

I have also read the book "Pragmmatic programer", which taught me how to type code that is ortogonal, easier to change, scalable, importance of proper naming, DRY concepts and much more.

Main reason the project takes this much time is that it goes thorugh a lot of refactoring. Sometimes I learn something better and try to apply it to the project or I just get a better idea.

This project taught me a lot about working with JWT, specifically about how it is used for authorization and authentication.The main thing that was interesting to me is the fact that the server does not store the JWT itself. Instead, the server only keeps the secret key
used to sign the JWT. When the client on the frontend tries to change the payload of the token, it won’t match the one on the backend. That’s because the backend takes the payload sent from the client, combines it with the server’s secret key, generates a new signature,
and then compares that signature with the one sent by the client. The whole idea was very interesting to me.

🛠️ Run Locally

Structure of files is designed the monorepo way.

This project requires a MongoDB connection.  

**MongoDB Atlas:**  
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas).  
   - Replace `<username>`, `<password>`, and `<db-name>` in the `CONNECTION_STRING` of .env file with your values.


To run application successfuly, go to ./server folder and add .env file, .env file expects these keys:

NODE_ENV = production
PORT = 3000
JWT_SECRET_KEY = your value
JWT_EXPRES_IN = value in hours
CONNECTION_STRING = mongodb+srv://<username>:<DB_PASSWORD>@cluster0.xxxxx.mongodb.net/<db-name>?retryWrites=true&w=majority
DB_PASSWORD
// Below are for nodemailer
EMAIL
EMAIL_PASSWORD


Install dependencies in ./client and ./server.




   

