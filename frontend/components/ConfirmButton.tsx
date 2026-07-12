interface ConfirmButtonProps {
  onConfirm: () => void;
  loading: boolean;
}

export default function ConfirmButton({
  onConfirm,
  loading,
}: ConfirmButtonProps) {
  return (
    <button
      onClick={onConfirm}
      disabled={loading}
      className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
    >
      {loading ? "Importing..." : "Confirm Import"}
    </button>
  );
}