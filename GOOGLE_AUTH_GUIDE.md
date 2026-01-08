# Google Authentication Implementation Guide

## 🔧 Google Console Configuration

### URLs to Configure in Google Console:
- **Authorized JavaScript origins:** `http://localhost:3000` (dev), `https://yourdomain.com` (prod)
- **Authorized redirect URIs:** 
  - `http://localhost:3000/api/auth/callback/google` (dev)
  - `https://yourdomain.com/api/auth/callback/google` (prod)

## 📁 File Structure

```
mydigitaldesk/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── dashboard/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx (existing)
│   └── providers.tsx
├── lib/
│   ├── auth.ts
│   ├── mongodb.ts
│   └── models/
│       └── User.ts
├── middleware.ts
└── .env.local
```

## 🔐 Environment Variables (.env.local)

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mydigitaldesk
```

## 📦 Dependencies to Install

```bash
npm install next-auth mongodb mongoose
npm install @types/bcryptjs bcryptjs
```

## 🗄️ MongoDB User Model

### lib/models/User.ts
```typescript
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  emailVerified: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
```

## 🔌 MongoDB Connection

### lib/mongodb.ts
```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
```

## 🔐 NextAuth Configuration

### lib/auth.ts
```typescript
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { MongoClient } from 'mongodb';
import connectDB from './mongodb';
import User from './models/User';

const client = new MongoClient(process.env.MONGODB_URI!);
const clientPromise = client.connect();

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          await connectDB();
          
          const existingUser = await User.findOne({ email: user.email });
          
          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              googleId: account.providerAccountId,
              emailVerified: new Date(),
            });
          } else if (!existingUser.googleId) {
            existingUser.googleId = account.providerAccountId;
            existingUser.image = user.image;
            await existingUser.save();
          }
          
          return true;
        } catch (error) {
          console.error('Error during sign in:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user?.email) {
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.id = dbUser._id.toString();
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
```

## 🛣️ API Route

### app/api/auth/[...nextauth]/route.ts
```typescript
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

## 🎯 Session Provider

### app/providers.tsx
```typescript
'use client';

import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

## 🔄 Updated Layout

### app/layout.tsx
```typescript
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "My Digital Desk",
  description: "The minimalist workspace for your personal notes and ideas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 120px)', padding: '20px 0' }}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
```

## 🔐 Updated Login Page

### app/login/page.tsx
```typescript
'use client';

import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogoSvg } from "../constants/constants";
import styles from "./page.module.css";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    checkSession();
  }, [router]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signIn('google', {
        callbackUrl: '/dashboard',
        redirect: false,
      });
      
      if (result?.error) {
        console.error('Sign in error:', result.error);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error('Sign in failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <LogoSvg size={"50px"} />
        <h1>My Digital Desk</h1>
        <p>Your private digital workplace</p>
        <button 
          className={styles.googleContainer}
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <FaGoogle size={20} className={styles.googleIcon} />
          <p>{loading ? 'Signing in...' : 'Sign In with Google'}</p>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
```

## 🏠 Dashboard Page

### app/dashboard/page.tsx
```typescript
'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Your Dashboard</h1>
      <div style={{ margin: '20px 0' }}>
        <img 
          src={session.user?.image || ''} 
          alt="Profile" 
          style={{ borderRadius: '50%', width: '80px', height: '80px' }}
        />
        <h2>Hello, {session.user?.name}!</h2>
        <p>{session.user?.email}</p>
      </div>
      <button 
        onClick={() => signOut({ callbackUrl: '/' })}
        style={{
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
```

## 🛡️ Middleware for Route Protection

### middleware.ts
```typescript
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*']
};
```

## 🔄 Authentication Flow

### UI Flow:
1. User clicks "Sign In with Google" on login page
2. Redirected to Google OAuth consent screen
3. User grants permissions
4. Google redirects back to `/api/auth/callback/google`
5. NextAuth processes the callback
6. User redirected to dashboard

### Backend Flow:
1. NextAuth receives Google OAuth callback
2. Validates Google token
3. Connects to MongoDB
4. Checks if user exists in database
5. Creates new user or updates existing user
6. Creates JWT session
7. Redirects to dashboard

## 🚀 Production Checklist

- [ ] Set up MongoDB Atlas cluster
- [ ] Configure Google OAuth credentials for production domain
- [ ] Set production environment variables
- [ ] Test authentication flow
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Set up proper CORS policies
- [ ] Configure session security settings

## 🔧 Additional Dependencies

Add to package.json:
```json
{
  "@auth/mongodb-adapter": "^2.0.0",
  "next-auth": "^4.24.5",
  "mongodb": "^6.3.0",
  "mongoose": "^8.0.3"
}
```

This implementation provides a complete, production-ready Google authentication system with MongoDB integration for your Next.js 14 app.