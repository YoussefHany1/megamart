export default function MessageAlert({ message }) {
  if (!message.text) return null;

  return (
    <div
      className={`p-4 mb-4 rounded ${
        message.type === "success"
          ? "bg-green-100 text-green-700 border border-green-300"
          : "bg-red-100 text-red-700 border border-red-300"
      }`}
    >
      {message.text}
    </div>
  );
}

export default function PaymentMethodsPage() {
  const { user } = useAuth();
  const router = useRouter();

  // State management
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch payment methods on mount
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    loadPaymentMethods();
  }, [user]);

  // Redirect if not authenticated
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && !loading) {
        router.push("/");
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [user, loading, router]);

  // Load payment methods
  const loadPaymentMethods = async () => {
    try {
      const methods = await fetchPaymentMethods(user.uid);
      setPaymentMethods(methods);
    } catch (error) {
      showMessage("error", "Failed to load payment methods");
    } finally {
      setLoading(false);
    }
  };

  // Show/Hide add card form
  const handleShowAddCard = async () => {
    clearMessage();

    if (showAddCard) {
      setShowAddCard(false);
      setClientSecret(null);
      return;
    }

    try {
      const secret = await createSetupIntent(user.uid, user.email);
      setClientSecret(secret);
      setShowAddCard(true);
    } catch (error) {
      showMessage("error", "Could not load payment form");
    }
  };

  // Delete card handler
  const handleDeleteCard = async (cardId, stripePaymentMethodId) => {
    if (!confirm("Are you sure you want to delete this card?")) return;

    try {
      await deletePaymentMethod(stripePaymentMethodId, cardId);
      setPaymentMethods(paymentMethods.filter((card) => card.id !== cardId));
      showMessage("success", "Card deleted successfully!");
    } catch (error) {
      showMessage("error", "Failed to delete card");
    }
  };

  // Set default card handler
  const handleSetDefault = async (cardId) => {
    try {
      await setDefaultPaymentMethod(cardId, paymentMethods);
      setPaymentMethods(
        paymentMethods.map((card) => ({
          ...card,
          isDefault: card.id === cardId,
        }))
      );
      showMessage("success", "Default card updated!");
    } catch (error) {
      showMessage("error", "Failed to update default card");
    }
  };

  // Card added success handler
  const handleCardAdded = (newCard) => {
    setPaymentMethods([...paymentMethods, newCard]);
    setShowAddCard(false);
    setClientSecret(null);
    showMessage("success", "Card added successfully!");
  };

  // Helper functions
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), MESSAGE_TIMEOUT);
  };

  const clearMessage = () => {
    setMessage({ type: "", text: "" });
  };

  // Loading and auth checks
  if (loading) return <Loading />;
  if (!user) return null;

  const stripeOptions = {
    clientSecret,
    appearance: STRIPE_APPEARANCE,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-(--primary)">
        Payment Methods
      </h1>

      <MessageAlert message={message} />

      <button
        onClick={handleShowAddCard}
        className="mb-6 px-6 py-3 bg-(--primary) text-white rounded-md hover:bg-[#0279ac] transition flex items-center gap-2"
      >
        {showAddCard ? "Cancel" : "Add New Card"}
      </button>

      {showAddCard && clientSecret && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add Payment Method</h2>
            <button
              onClick={() => setShowAddCard(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <Elements stripe={stripePromise} options={stripeOptions}>
            <AddCardForm
              userId={user.uid}
              onSuccess={handleCardAdded}
              onCancel={() => setShowAddCard(false)}
            />
          </Elements>
        </div>
      )}

      <div className="space-y-4">
        {paymentMethods.length === 0 ? (
          <EmptyState />
        ) : (
          paymentMethods.map((card) => (
            <PaymentMethodCard
              key={card.id}
              card={card}
              onSetDefault={handleSetDefault}
              onDelete={handleDeleteCard}
            />
          ))
        )}
      </div>

      <SecurityInfo />
    </div>
  );
}