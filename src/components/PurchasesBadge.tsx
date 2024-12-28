export default function PurchasesBadge({ purchases }: any) {
  return (
    <div className="bg-blue-200 text-black px-2 py-1 w-40 text-center rounded-md">
      <span>Purchases -</span>
      <span className="font-bold">${purchases.toFixed(2)}</span>
    </div>
  );
}
