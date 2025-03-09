import { useState } from 'react';
import { CheckCircle2, Coins, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useWallet } from '../context/WalletContext';

function ManagePage() {
  // Separate states for Accept Answer
  const [acceptQuestionId, setAcceptQuestionId] = useState("");
  const [acceptAnswerIndex, setAcceptAnswerIndex] = useState("");
  
  // Separate states for Release Funds
  const [releaseQuestionId, setReleaseQuestionId] = useState("");
  const [releaseAnswerIndex, setReleaseAnswerIndex] = useState("");
  
  const [loading, setLoading] = useState(false);

  const { contract, account } = useWallet();

  const checkAuthorization = async (questionId) => {
    if (!contract || !account) {
      toast.error('Please connect wallet first');
      return false;
    }

    try {
      const question = await contract.questions(questionId);
      const questionAuthor = question.author.toLowerCase();
      const currentUser = account.toLowerCase();
      
      if (questionAuthor !== currentUser) {
        toast.error('Only the question author can perform this action');
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      toast.error('Failed to verify authorization');
      return false;
    }
  };

  const acceptAnswer = async () => {
    if (!acceptQuestionId || !acceptAnswerIndex) {
      toast.warn('Please fill all fields for Accept Answer');
      return;
    }

    setLoading(true);
    try {
      const isAuthorized = await checkAuthorization(acceptQuestionId);
      if (!isAuthorized) {
        setLoading(false);
        return;
      }

      const tx = await contract.acceptAnswer(acceptQuestionId, acceptAnswerIndex);
      await tx.wait();
      toast.success('Answer accepted!');
      setAcceptQuestionId("");
      setAcceptAnswerIndex("");
    } catch (error) {
      console.error(error);
      toast.error('Transaction failed');
    }
    setLoading(false);
  };

  const releaseEscrowFunds = async () => {
    if (!releaseQuestionId || !releaseAnswerIndex) {
      toast.warn('Please fill all fields for Release Funds');
      return;
    }

    setLoading(true);
    try {
      const isAuthorized = await checkAuthorization(releaseQuestionId);
      if (!isAuthorized) {
        setLoading(false);
        return;
      }

      const tx = await contract.releaseEscrowFunds(releaseQuestionId, releaseAnswerIndex);
      await tx.wait();
      toast.success('Funds released!');
      setReleaseQuestionId("");
      setReleaseAnswerIndex("");
    } catch (error) {
      console.error(error);
      toast.error('Transaction failed');
    }
    setLoading(false);
  };

  return (
    <main className="px-4 py-8 bg-[#eff4fe] min-h-screen pt-30" style={{fontFamily: "Barlow"}}>
      {loading && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl flex items-center space-x-4">
            <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
            <span className="text-gray-700 font-medium">Processing Transaction...</span>
          </div>
        </div>
      )}

      <div className="bg-[#eff4fe] max-w-screen-lg mx-auto p-6 rounded-lg shadow-sm">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Manage Answers</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Accept Answer</h3>
            <input
              type="number"
              placeholder="Question ID"
              value={acceptQuestionId}
              onChange={(e) => setAcceptQuestionId(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="number"
              placeholder="Answer Index"
              value={acceptAnswerIndex}
              onChange={(e) => setAcceptAnswerIndex(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              onClick={acceptAnswer}
              disabled={loading}
              className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition-all duration-200"
            >
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Accept Answer
            </button>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Release Funds</h3>
            <input
              type="number"
              placeholder="Question ID"
              value={releaseQuestionId}
              onChange={(e) => setReleaseQuestionId(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="number"
              placeholder="Answer Index"
              value={releaseAnswerIndex}
              onChange={(e) => setReleaseAnswerIndex(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              onClick={releaseEscrowFunds}
              disabled={loading}
              className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition-all duration-200"
            >
              <Coins className="h-5 w-5 mr-2" />
              Release Funds
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ManagePage;