# QueazyLearn

A full-stack interview-prep application that uses AI to generate role-specific interview questions and beginner-friendly explanations. The project has a Node/Express backend (with Google Gen AI integration and Cloudinary uploads) and a React + Vite frontend. It supports user authentication, session-based question collections, AI-generated Q&A and explanations, image uploads for user profiles, and basic session management.

## Key Capabilities

- Generate role-specific interview questions and answers using Google Generative AI: [`generateInterviewQuestions`](backend/controllers/aiController.js), [`generateConceptExplanation`](backend/controllers/aiController.js). See prompt templates in [`backend/utils/prompts.js`](backend/utils/prompts.js).
- Create and manage interview sessions (role, experience, topics, questions): [`createSession`](backend/controllers/sessionController.js), [`getUserSessions`](backend/controllers/sessionController.js), [`getSessionById`](backend/controllers/sessionController.js), [`deleteSession`](backend/controllers/sessionController.js).
- Add questions to sessions and pin/update notes: [`addQuestionToSession`](backend/controllers/questionController.js), [`togglePinQuestion`](backend/controllers/questionController.js), [`updateQuestionNote`](backend/controllers/questionController.js).
- User auth (register, login, get profile) with JWT and password hashing: [`registerUser`](backend/controllers/authController.js), [`loginUser`](backend/controllers/authController.js), [`getUserProfile`](backend/controllers/authController.js).
- Profile image upload (Cloudinary): upload middleware at [`backend/middlewares/uploadMiddleware.js`] and Cloudinary client in [`backend/uploads/cloudinary.js`](backend/uploads/cloudinary.js).
- Frontend consumes backend via [`frontend/src/utils/axiosInstance.js`](frontend/src/utils/axiosInstance.js) and the API map [`frontend/src/utils/apiPaths.js`](frontend/src/utils/apiPaths.js).
- Client UI: Landing, Dashboard (sessions listing & create), Interview Prep viewer with expandable Q&A and AI explanation drawer.

## Architecture / Structure (high level)

- backend/
  - Server entry: [`backend/server.js`](backend/server.js)
  - Controllers: [`backend/controllers/authController.js`](backend/controllers/authController.js), [`backend/controllers/aiController.js`](backend/controllers/aiController.js), [`backend/controllers/sessionController.js`](backend/controllers/sessionController.js), [`backend/controllers/questionController.js`](backend/controllers/questionController.js)
  - Middlewares: auth [`protect`](backend/middlewares/authMiddleware.js), upload [`backend/middlewares/uploadMiddleware.js`](backend/middlewares/uploadMiddleware.js)
  - Models: [`backend/models/User.js`](backend/models/User.js), [`backend/models/Session.js`](backend/models/Session.js), [`backend/models/Question.js`](backend/models/Question.js)
  - Cloudinary setup: [`backend/uploads/cloudinary.js`](backend/uploads/cloudinary.js)
  - Prompts for AI: [`backend/utils/prompts.js`](backend/utils/prompts.js)
- frontend/
  - App entry: [`frontend/src/main.jsx`](frontend/src/main.jsx), routing in [`frontend/src/App.jsx`](frontend/src/App.jsx)
  - Auth & user context: [`frontend/src/context/userContext.jsx`](frontend/src/context/userContext.jsx)
  - Pages: Landing [`frontend/src/pages/LandingPage.jsx`](frontend/src/pages/LandingPage.jsx), Dashboard [`frontend/src/pages/Home/Dashboard.jsx`](frontend/src/pages/Home/Dashboard.jsx), Interview Prep [`frontend/src/pages/InterviewPrep/interviewPrep.jsx`](frontend/src/pages/InterviewPrep/interviewPrep.jsx)
  - Components: questions, drawers, modals, cards under `frontend/src/components/`
  - Utilities: [`frontend/src/utils/apiPaths.js`](frontend/src/utils/apiPaths.js), [`frontend/src/utils/axiosInstance.js`](frontend/src/utils/axiosInstance.js), upload helper [`frontend/src/utils/uploadImage.js`](frontend/src/utils/uploadImage.js)

## Environment & Secrets

Set backend environment variables in [`backend/.env`](backend/.env). At minimum:

- PORT, MONGO_URI, JWT_SECRET
- GOOGLE_GEN_AI_API_KEY (used by [`backend/controllers/aiController.js`](backend/controllers/aiController.js))
- CLOUDINARY\_\* credentials used by [`backend/uploads/cloudinary.js`](backend/uploads/cloudinary.js)

## Running Locally

Backend

- Install & run:
  - cd backend
  - npm install
  - npm run dev (uses nodemon) or npm start
- Entry point: [`backend/server.js`](backend/server.js)

Frontend

- Install & run:
  - cd frontend
  - npm install
  - npm run dev
- Entry point: [`frontend/src/main.jsx`](frontend/src/main.jsx), routing: [`frontend/src/App.jsx`](frontend/src/App.jsx)

## Important Endpoints (examples)

- Auth:
  - POST /api/auth/register -> [`registerUser`](backend/controllers/authController.js)
  - POST /api/auth/login -> [`loginUser`](backend/controllers/authController.js)
  - GET /api/auth/profile -> [`getUserProfile`](backend/controllers/authController.js) (protected)
  - POST /api/auth/upload-image -> image upload (protected)
- Sessions:
  - POST /api/sessions/create -> [`createSession`](backend/controllers/sessionController.js) (protected)
  - GET /api/sessions/user-sessions -> [`getUserSessions`](backend/controllers/sessionController.js) (protected)
  - GET /api/sessions/:id -> [`getSessionById`](backend/controllers/sessionController.js) (protected)
- Questions / AI:
  - POST /api/ai/generate-questions -> [`generateInterviewQuestions`](backend/controllers/aiController.js) (protected)
  - POST /api/ai/generate-explanation -> [`generateConceptExplanation`](backend/controllers/aiController.js) (protected)
  - POST /api/questions/add -> [`addQuestionToSession`](backend/controllers/questionController.js) (protected)
  - POST /api/questions/:id/pin -> [`togglePinQuestion`](backend/controllers/questionController.js) (protected)

Frontend code uses API constants in [`frontend/src/utils/apiPaths.js`](frontend/src/utils/apiPaths.js) and attaches JWT from localStorage via [`frontend/src/utils/axiosInstance.js`](frontend/src/utils/axiosInstance.js).

## Notes & Tips

- The AI endpoints require the Google Gen AI API key to be set in the backend env.
- Uploaded images are handled in memory then forwarded to Cloudinary by [`postProfileImg`](backend/controllers/authController.js).
- JWT verification is handled by [`protect`](backend/middlewares/authMiddleware.js) which populates `req.user`.

## Useful files

- Backend server: [`backend/server.js`](backend/server.js)
- Auth controller: [`backend/controllers/authController.js`](backend/controllers/authController.js)
- AI controller & prompts: [`backend/controllers/aiController.js`](backend/controllers/aiController.js), [`backend/utils/prompts.js`](backend/utils/prompts.js)
- Session logic: [`backend/controllers/sessionController.js`](backend/controllers/sessionController.js)
- Frontend entry & routes: [`frontend/src/main.jsx`](frontend/src/main.jsx), [`frontend/src/App.jsx`](frontend/src/App.jsx)
- Axios wrapper & API mapping: [`frontend/src/utils/axiosInstance.js`](frontend/src/utils/axiosInstance.js), [`frontend/src/utils/apiPaths.js`](frontend/src/utils/apiPaths.js)
- Frontend pages: [`frontend/src/pages/LandingPage.jsx`](frontend/src/pages/LandingPage.jsx), [`frontend/src/pages/Home/Dashboard.jsx`](frontend/src/pages/Home/Dashboard.jsx), [`frontend/src/pages/InterviewPrep/interviewPrep.jsx`](frontend/src/pages/InterviewPrep/interviewPrep.jsx)

## License

Project is provided as-is. See source files for implementation and
