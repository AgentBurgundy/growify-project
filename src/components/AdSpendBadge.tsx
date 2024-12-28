export default function AdSpendBadge({ spend }: any) {
  return (
    <div className="bg-purple-200 text-black px-2 py-1 rounded-md w-40 text-center">
      <span>Ad Spend - </span>
      <span className="font-bold">${spend.toFixed(3)}</span>
    </div>
  );
}
