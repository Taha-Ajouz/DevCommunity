# Quick Setup Guide

## 1. Install Dependencies
```bash
npm install
```

## 2. Setup MongoDB

### Option A: Local MongoDB
```bash
# Install MongoDB
# macOS:
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Or run manually:
mongod --config /usr/local/etc/mongod.conf
```

### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Use it in .env as MONGODB_URI

## 3. Setup GitHub OAuth

1. Go to: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - Application name: DevCommunity Local
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: http://localhost:3000/api/auth/callback/github
4. Click "Register application"
5. Copy "Client ID"
6. Click "Generate a new client secret" and copy it

## 4. Create .env File

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Then edit `.env` and add:
```
MONGODB_URI=mongodb://localhost:27017/dev-community
AUTH_SECRET=your-random-secret-here
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret
NEXTAUTH_URL=http://localhost:3000
```

Generate AUTH_SECRET:
```bash
openssl rand -base64 32
```

## 5. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000

## 6. Test the Application

1. Click "Sign In"
2. Authorize with GitHub
3. You'll be redirected to /posts
4. Go to "Profile" to edit your profile
5. Click "New Post" to create a post
6. Browse "Developers" to see all users

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running: `brew services list` (macOS)
- Check the MONGODB_URI in .env

### GitHub OAuth Error
- Verify callback URL matches exactly
- Check CLIENT_ID and CLIENT_SECRET in .env
- Make sure NEXTAUTH_URL is set to http://localhost:3000

### Build Errors
- Delete `.next` folder and node_modules
- Run `npm install` again
- Run `npm run dev`

## Production Build

```bash
npm run build
npm start
```

## Project Features

✅ GitHub Authentication
✅ Create/Edit Profile
✅ Create/Edit/Delete Posts
✅ View All Developers
✅ View Developer Profiles
✅ API Endpoints
✅ Server Actions
✅ Client & Server Components
✅ Custom 404 & Error Pages
✅ Loading States
✅ Tailwind CSS
✅ TypeScript
