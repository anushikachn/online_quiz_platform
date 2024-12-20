# QuizzyPops

Welcome to **QuizzyPops**, an online quiz platform designed to make learning fun and interactive. This project was created as part of a hackathon to showcase a simple yet engaging platform for quizzes.

---

## Features

- **Dynamic Question Bank**: A collection of trivia questions spanning various topics.
- **User-Friendly Interface**: Easy-to-navigate design for users of all ages.
- **Email OTP Verification**: Secure signup with email verification.
- **Email Score Sharing**: Users receive their quiz scores directly via email.

---

## Installation

Follow these steps to get QuizzyPops up and running on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/anushikachn/online_quiz_platform.git
   cd QuizzyPops
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:3000` to access the platform.

---

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js
- **Styling**: CSS
- **Email Integration**: Nodemailer

---

## How It Works

1. **Home Page**: Users are greeted with a welcoming page that includes navigation to quizzes.
2. **Signup with OTP Verification**: Users sign up securely by verifying their email with an OTP.
3. **Quiz Page**: Each quiz displays questions, multiple-choice options, and real-time answer validation.
4. **Results Page**: At the end of the quiz, users see their scores and correct answers (optional feature).
5. **Score Sharing**: Users receive their quiz scores via email for future reference.

---

## File Structure

```
QuizzyPops/
├── public/
│   ├── index.html
├── src/
│   ├── components/
│   │   ├── QuizPage.js
│   │   ├── HomePage.js
│   │   ├── SignupPage.js
│   ├── App.js
│   ├── index.js
│   └── styles.css
├── package.json
└── README.md
```

---

## Troubleshooting

### Common Issues

1. **Questions Not Displaying**:
   - Ensure the questions array is correctly structured and passed to the component.
2. **Email Not Sent**:
   - Verify SMTP settings and email service configuration in the backend.

---

## Future Enhancements

- **Authentication**: Enhance user login and registration.
- **Database Integration**: Fully utilize a database like MongoDB or Firebase for persistent data.
- **Customizable Quizzes**: Allow users to create their own quizzes.
- **Mobile-Friendly Design**: Optimize the UI for mobile devices.

---

## License

This project is licensed under the MIT License. Feel free to use and modify it as you like.

---

## Acknowledgments

Special thanks to the hackathon organizers and my team for their support and motivation. This project is a work in progress, and I hope to keep improving it in the future.

---

Happy Quizzing! 🎉

