import React from 'react';
import './globals.css'; // Assuming you have a global CSS file

export const metadata = {
  title: 'Your App Title',
  description: 'A brief description of your app',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;