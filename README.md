# SaaSible

SaaSible is your central hub for discovering, purchasing, and managing Software-as-a-Service (SaaS) applications.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd saasible
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

### Firebase Setup

This application uses Firebase for authentication and potentially other backend services (like Firestore, Storage). You need to set up your own Firebase project.

1.  **Create a Firebase Project:**
    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Click "Add project" and follow the steps to create a new project.

2.  **Register a Web App:**
    - In your Firebase project dashboard, click the Web icon (`</>`) to add a web app.
    - Give your app a nickname (e.g., "SaaSible Web").
    - **Important:** Do NOT enable Firebase Hosting at this step if you plan to deploy elsewhere (like Vercel).
    - After registering, Firebase will provide you with configuration details (apiKey, authDomain, projectId, etc.).

3.  **Configure Environment Variables:**
    - Create a file named `.env.local` in the root directory of the project.
    - Copy the contents of `.env.local.example` (if it exists) or the following template into `.env.local`:

      ```dotenv
      # Firebase Configuration - Replace with your actual project credentials
      # Get these from your Firebase project settings > General > Your apps > Web app > SDK setup and configuration > Config
      NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
      NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
      NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="YOUR_MEASUREMENT_ID" # Optional

      # Genkit/Google AI Configuration (If using Genkit features)
      # Get from https://aistudio.google.com/app/apikey
      GOOGLE_GENAI_API_KEY="YOUR_GOOGLE_GENAI_API_KEY"
      ```
    - Replace the `"YOUR_..."` placeholders with the actual values from your Firebase project configuration.
    - **Note:** `.env.local` is included in `.gitignore` and should **never** be committed to version control.
    - **Important**: Make sure the environment variables are correctly prefixed with `NEXT_PUBLIC_` if they need to be accessed by the browser. **Missing or incorrect API keys can lead to `auth/api-key-not-valid` errors.**

4.  **Enable Authentication Methods:**
    - In the Firebase Console, go to "Authentication" (under Build).
    - Click the "Settings" tab (or "Sign-in method" tab depending on console version).
    - **Authorize Domains:** Under the "Authorized domains" section, click "Add domain" and add the domains where your application will be accessed from.
        - **Crucial Step:** For local development, `localhost` is usually authorized by default. If you are running on a different host or port (like `127.0.0.1` or a specific preview URL), you **must** add that domain here.
        - For preview or production deployments (e.g., Vercel, IDX previews), add the specific domain provided by the platform (e.g., `your-app-name.vercel.app`, `your-idx-preview-url.cloudworkstations.dev`, `your-idx-preview-url.googleusercontent.com`).
        - **Error Note:** The `auth/unauthorized-domain` error specifically means the domain you are currently using to access the app (visible in your browser's address bar) **is not listed** in this "Authorized domains" section in your Firebase project settings. You need to add it.
    - **Enable Providers:** Go back to the "Sign-in method" tab (or "Providers" tab).
    - Enable the sign-in providers you want to use (e.g., Email/Password, Google, GitHub).
    - For Google and GitHub, you might need to provide additional configuration details (like OAuth consent screen setup). Follow the Firebase documentation.

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:9002](http://localhost:9002) (or the specified port) with your browser to see the result. If you use a different port or host, remember to authorize it in Firebase (Step 4 above).

## Key Technologies

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Firebase (Authentication, Firestore, Storage)
- Lucide Icons
- Genkit (for potential GenAI features)

## Project Structure (Overview)

```
.
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router routes and layouts
│   ├── components/     # Reusable React components (UI and custom)
│   ├── hooks/          # Custom React hooks (e.g., useAuth)
│   ├── lib/            # Utility functions, Firebase config
│   ├── services/       # Backend service interactions (placeholder)
│   ├── ai/             # Genkit flows and configuration (optional)
│   └── styles/         # Global styles (globals.css)
├── .env.local          # Local environment variables (DO NOT COMMIT)
├── next.config.mjs     # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies and scripts
```

## Contributing

Contributions are welcome! Please follow standard Git workflow (fork, branch, pull request).

## License

[Specify your license here, e.g., MIT]

```