"use client"
import VoteReceipt from '@/components/VoteRecepit';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';


const VoteSuccess = () => {

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);


  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
      <h1 className="text-4xl font-bold">🎉 Vote Cast Successfully!</h1>
      <p className="text-lg">Thank you for participating in the election.</p>

      <VoteReceipt />
    </div>
  )
}

export default VoteSuccess
