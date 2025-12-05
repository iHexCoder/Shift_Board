# Employee Shift Board (Fullstack)

**Assignment Name:** Employee Shift Board

## Tech stack
- Backend: Node.js, Express, MongoDB, Mongoose, JWT
- Frontend: React (create-react-app)
- Validation: Joi

## Demo login (seeded)
- Admin: hire-me@anshumat.org / HireMe@2025!
- Normal user: user@company.org / User@2025!

## Setup (backend)
1. cd backend
2. npm install
3. copy `.env` with MONGO_URI, JWT_SECRET
4. npm run seed   // creates seeded users & employees
5. npm run dev    // or npm start

## Setup (frontend)
1. cd frontend
2. npm install
3. set environment `REACT_APP_API_URL=http://localhost:4000/api` (optional)
4. npm start

## API documentation
- POST /api/login
- GET /api/employees
- POST /api/shifts
- GET /api/shifts?employee=xx&date=YYYY-MM-DD
- DELETE /api/shifts/:id

## Business rules
1. No overlapping shifts for the same employee on same date.
2. Shift must be at least 4 hours.
3. Normal users may only view (and delete) shifts belonging to their employee record.
4. Admin can view/create/delete all shifts.

## Known issues / notes
- Times are expected in `HH:mm` 24-hour format.
- Date expected in `YYYY-MM-DD`.
- The demo seed user `hire-me@anshumat.org` must be present in any hosted deployment for reviewers.

## Submission
- GitHub repo: https://github.com/iHexCoder/Shift_Board/edit/main/README.md



