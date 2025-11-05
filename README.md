.env
PORT=8000
MONGO_MAIN_URI=mongodb+srv://<username>:<password>@<cluster>.<>.mongodb.net/<main_db>?retryWrites=true&w=majority
MONGO_CLUSTER_URI=mongodb+srv://<username>:<password><cluster>.<>.mongodb.net
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=<days (2d)>

.env.example
VITE_API_URL=http://localhost:8000 
