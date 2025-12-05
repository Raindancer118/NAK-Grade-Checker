# NAK Grade Checker

A dashboard and bot to check grades for Nordakademie students.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Go (v1.20+)

### Setup

1.  **Clone the repository**
    ```sh
    git clone https://github.com/Raindancer118/NAK-Grade-Checker.git
    cd NAK-Grade-Checker
    ```

2.  **Install Dependencies**
    ```sh
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory with your credentials:
    ```env
    CIS_USERNAME=your_username
    CIS_PASSWORD=your_password
    CHECK_INTERVAL=60 # Check every 60 minutes
    ```
    > **Note:** The `.env` file is excluded from git to keep your credentials safe.

4.  **Build the Bot**
    The bot is automatically built when you run the development server. However, you can also build it manually:
    ```sh
    go build -o gradechecker ./cmd/bot
    ```

### Running the Application

1.  **Start the Development Server**
    ```sh
    npm run dev
    ```

2.  **Access the Dashboard**
    Open [http://localhost:4321](http://localhost:4321) in your browser.

3.  **Start the Bot**
    - On the dashboard, click the **Start** button in the "Live Logs" section.
    - The bot will start checking for grades based on your configured interval.
    - You can see the logs in real-time on the dashboard.

## 🛠️ Tech Stack

- **Frontend**: [Astro](https://astro.build)
- **Backend**: Go
- **Database**: SQLite
