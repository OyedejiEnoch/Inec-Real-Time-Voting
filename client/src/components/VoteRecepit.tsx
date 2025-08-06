// VoteReceipt.tsx
import { useRef } from 'react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { useGetVoteByVoterQuery } from '@/redux/api/api';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation';


export default function VoteReceipt() {
  const router =useRouter()
    const {data:vote}=useGetVoteByVoterQuery(null)
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {

    router.push('/login')
  };


  if (!vote) return <p className="text-center">Loading vote data...</p>;

  return (
    <Dialog>
        <DialogTrigger asChild>
            <button className="px-4 py-3 rounded-xl border border-neutral-400/20 transition duration-200 cursor-pointer">View Vote</button>
        </DialogTrigger>
    <DialogContent className="flex flex-col items-center justify-center min-h-screen  p-4">
      <div ref={receiptRef} className="p-6 rounded shadow-md w-full max-w-md flex flex-col gap-y-4">
        <h1 className="text-xl font-bold mb-4 text-center">🗳️ Vote Receipt</h1>
        <p><strong>Vote ID:</strong> {vote?._id || crypto.randomUUID()}</p>
        <p><strong>Voter:</strong> {vote?.voter.firstName + ' ' + vote?.voter.lastName }</p>
        <p><strong>Election:</strong> {vote?.election?.name}</p>
        <p><strong>Candidate:</strong> {vote?.candidate.name}</p>
        <img src={vote?.candidate.imageUrl.url} alt='image'/>
        {vote?.party?.name && (
          <p><strong>Party:</strong> {vote?.party.name}</p>
        )}
        <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
      </div>

      <button
        onClick={handleDownloadPDF}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
      >
        📥 Download as PDF
      </button>
    </DialogContent>
    </Dialog>
  );
}
