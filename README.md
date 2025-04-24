
# Welcome to GoSipRead

GoSipRead is an AI-powered self-development companion designed to make personal and professional development effortless, enjoyable, and embedded into the daily lives of techpreneurs.

## Project info

**URL**: https://lovable.dev/projects/127069b8-e18a-45ae-8947-c4fbba9e2114

## Features and Requirements

### 1. Navigation & Global Layout

- **Return to Home Button**: Present on every page except the Home page
- **Opacity & Animation Defaults**: Every page overlay has ≥75% opacity
- **Animation size & speed**: Relatively small
- **Dark-Mode**: Toggle applies a dark theme across the entire app
- **Hover Effects**: Ripple-style effect that starts slowly, then accelerates

### 2. Authentication & Role-Based Access

#### User Levels & Promotion

- **Registered User**: Can register & log in
- **Subscribed User**: Only they may create groups
- **Group Admin**: Only if they've created a group
- **Tech Mentor**: Once reputation grows or upon payment
- **Productivity Guru**: Via paid subscription (authors, institutions, telcos)
- **GoSipRead Admin**: Highest-level platform control

#### Access Rules

- Users can only perform actions permitted by their level
- Admins earn/sell coupons (Adobe Express, Canva, Figma, etc.)
- Coupon limit: Maximum 5 per user per year

### 3. Subscription & Monetization

#### Productivity Guru Subscription

- Paid by third parties (Starlink, Alison, etc.)
- Grants additional platform features & ad rights

#### Coupons & Tools

- Certification/tool coupons (Adobe Express, Canva, Figma...)
- Sellable by eligible admins, 5-per-year cap

#### Advertisements

- Only Productivity Gurus may run ads
- Frequency: Every 30 minutes, up to 30 seconds each

### 4. Gamification & Focus Training

#### Focus Training Game Suite

- Upper/Lower-case random quick pick
- Fruits-pattern random quick pick
- Alphabet-Guess (failure popup + tweak)
- Fourth custom game (to be added)

#### Sequential Play Logic

- User selects from 7 varieties
- Cannot replay the same game until all others are played

#### Session Limits & Breaks

- 2 minutes continuous play → redirect to "Go-Sip" (study materials)
- If a daily plan exists (AI- or self-prescribed), load agreed materials
- Every 10 minutes study → brain break; intervals lengthen with consistency

### 5. Break & Accountability Rules

- If user plans non-engagement days (e.g., religious observance), they must:
  - Inform AI Mentor 3 days in advance
  - Make up any missed sessions afterward

### 6. Performance Tracking

- Motion Graph judges performance
- Reading Requirement: 10 minutes per day must be ticked
- Additional activity adds extra bonuses

### 7. Game UI & Help

- **Game Card Display**: Name, date/time, score
- **HELP Section** (per game page):
  - What the game is
  - Why it's important
  - How to play best (~2 min read)
  - Tips (e.g., shrink "hurry up" pop-ups so they don't block options)

### 8. Secret Deep-Reader Challenge

- "Lock the middle lock" (of 3) to win:
  - Prompt: "Congrats, you're a deep reader!" + bonus #1000
  - 99 secrets hidden this month

### 9. Admin Workflow & Hierarchy

#### Login

- Admin selects their category → system allocates auth level

#### Roles (lowest → highest)

1. groupAdmin
2. techMentorAdmin
3. productivityGuruAdmin
4. goSipReadAdmin

#### Resource Management

- All admins can add study resources if not already in app
- AI rejects unrecognized books; subscribers may complain
- Similar existing resource auto-assigned during review

#### Unauthorized Access

- If lacking rights: "You must log in as a __Admin to do this."
- Higher-level admins inherit lower-level capabilities

### 10. Integrations & Technology

- **Payment**: Opay Digital Bank
- **Certifications**: Alison, Coursera (Automated Dynamic Portfolio)
- **Design Tools**: Adobe Express, Photoshop, Canva, Figma
- **AI**: ChatGPT OpenAI for mentoring & recommendations
- **Video Patron**: YouTube
- **Database**: App must connect to a database

## Branding

- **Logo**: A simple "glass book" with a straw

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/127069b8-e18a-45ae-8947-c4fbba9e2114) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/127069b8-e18a-45ae-8947-c4fbba9e2114) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
