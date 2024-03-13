'use client'
import { useRouter } from 'next/navigation'; // Fix import statement
import { useState, useEffect } from 'react';

const Home = () => {
  const router = useRouter();
  const [isAuthenticated, setUIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return null; // You need to return some JSX, even if it's null
};

export default Home;
