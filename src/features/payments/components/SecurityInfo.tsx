import LockIcon from "@mui/icons-material/Lock";

function SecurityInfo() {
  return (
    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-start gap-3">
        <LockIcon />
        <div>
          <h3 className="font-bold text-blue-900 mb-1">
            Your cards are secure
          </h3>
          <p className="text-sm text-blue-800">
            All payment information is encrypted and securely stored by Stripe.
            We never see or store your full card details.
          </p>
        </div>
      </div>
    </div>
  );
}
export default SecurityInfo;
