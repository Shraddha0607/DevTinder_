# Dev tinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
GET /profile/view
PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userId    interested, ignored

- POST /request/review/:status/:requestId  accepted, rejected

## userRouter
- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets the profile of other users on the platform

status: ignore, interested, accpted, rejected