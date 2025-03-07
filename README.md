# YOUTUBE CLONE:

You can directly access this website by this link : https://youtube-clone-frontend-bkxd.onrender.com

Github url: https://github.com/maheshkokate07/youtube-clone
Pull the main branch

Project setup steps:

1. Clone the project or unzip the project folder.
2. There will be two folders in main folder i.e. frontend and backend.
3. Go to frontend and run npm install.
4. Go to backend and run npm install because i have created two seperate node projects for frontend and backend.
5. You have to setup .env for backend and for frontend also i have given the format below for both .env files.
6. After that run nodemon index.js command in backend your backend will start.
7. Also run the command "npm run dev" in frontend folder to start your folder.

- ".env" file structure for frontend, put the file in root directory in backend folder:
MONGO_URL= put your mongourl
PORT= put port number
JWT_SECRET= put jwt secret
CLOUDINARY_CLOUD_NAME= cloudinary cloud name for video, img upload
CLOUDINARY_API_KEY= cloudinary api key
CLOUDINARY_API_SECRET= cloudinary secret key

- ".env" file structure for backend, put the file in root directory in frontend folder:
VITE_API_URL= backend url


Project features:

- Authentication:
1. Register - User can create their account with Name, email and password, password will be stored in encrypted format.
2. Login - User can login with their creadentials and get a auth token stored in redux state.

- Profile:
1. User can update get and update their profile with avatar also.

- Channel:
1. User can create their channel with name, channel image and description.
2. User can view and update their channel info.
3. User can subscribe or unsubscribe to another channel.
4. User can view specific channel info with their videos.

- Video:
1. User can upload a video after creating a channel on their channel with actual video, video description, thumbnail, if user not upload thumbnail then the snapshot of the video is taken as a thumbnail.
2. User can delete the uploaded video for their channel.
3. User can view all the uploaded videos on Home page.
4. User can view specific video and the video count is get increased when user view video.
5. User can like or dislike the video.
6. User can search for the video or can filter videos.

- Comment:
1. User can comment on a video.
2. User can delete their comment.

- Cloudinary:
1. Used cloudinary storage for storing video, thumbnail and avatars.