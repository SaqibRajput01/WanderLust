# 🏕️ WanderLust - A Full Stack Airbnb Clone (MERN Stack)

WanderLust is a feature-rich, full-stack web application inspired by Airbnb. It allows users to explore, list, and book campgrounds or vacation stays around the world. This project is built with the powerful MERN stack and emphasizes clean architecture, modular code, secure authentication, and scalable backend practices.

Live deployment is coming soon!

---

## 🔥 Key Features

- 🧭 **Explore Listings**: Search, browse, and filter campground listings by location.
- 📝 **User Authentication**: Register and log in securely using Passport.js with session-based auth.
- 🏕️ **Add/Edit Listings**: Authenticated users can create, update, and delete listings.
- 📍 **Location Integration**: Dynamic maps powered by Mapbox.
- 📦 **Image Uploads**: Upload multiple images via Cloudinary CDN.
- 🗣️ **Reviews System**: Leave and manage reviews on listings.
- 💾 **Persistent Storage**: MongoDB used for dynamic data handling.
- 🛡️ **Clean MVC Structure**: Scalable backend using Controllers, Routes, and Models.

---



## 🛠️ Tech Stack

| Layer         | Technology                        |
| ------------- | --------------------------------- |
| **Frontend**  | EJS Templating + Tailwind CSS     |
| **Backend**   | Node.js, Express.js               |
| **Database**  | Mongoose ODM                      |
| **Auth**      | Passport.js (Local Strategy)      |
| **Cloud**     | Cloudinary for media, Mapbox for geolocation |
| **Hosting**   | Render (Upcoming Backend), Netlify (Upcoming Frontend) |




## 📸 Preview

![📁 Images Folder](https://github.com/SaqibRajput01/WanderLust/blob/main/Wanderlust_Images.zip)

## 📁 Folder Structure

wanderlust/
├── models/ # Mongoose models
├── routes/ # Express routes (modular)
├── controllers/ # Business logic
├── views/ # EJS templates
├── public/ # Static assets
├── middleware/ # Custom middleware
├── app.js # App entry point
└── .env # Environment variables


## 🚀 Getting Started

```bash
git clone https://github.com/SaqibRajput01/Wanderlust.git
nodemon app.js
Add a .env file with the following:

env
Copy
Edit
DB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
MAPBOX_TOKEN=your_mapbox_token
SESSION_SECRET=your_secret

🌍 Deployment (coming soon)
Deployment to Render and Netlify in progress. Currently tested locally.

🙋‍♂️ Author
Saqib Bin Tariq
🎓 Computer Science Student | Full Stack Developer
📧 connectsaqibbintariq@gmail.com



