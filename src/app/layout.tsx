import Navbar from './Navbar';
import { AppStateProvider } from './contexts/AppStateContext';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-base min-h-screen overflow-x-clip w-screen">
        <AppStateProvider>
          <Navbar>{children}</Navbar>
        </AppStateProvider>
      </body>
    </html>
  );
}
