import { useToastStore } from "@/stores/toastStore";
import { useMemo, useState, useEffect } from "react";
import { CartItem, PaymentMethod } from "@/types";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatPrice } from "./useCartItem";
import { chargeSavedCard } from "@/features/payments/actions/stripeActions";

export const CASH_ON_DELIVERY_FEE = 10;

export function useCartSummary(items: CartItem[], onClearCart: () => void) {
  const { user } = useAuthStore();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [savedCards, setSavedCards] = useState<PaymentMethod[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [useNewCard, setUseNewCard] = useState(false);
  const router = useRouter();

  const { showToast } = useToastStore();

  const calculateTotal = useMemo(() => {
    return items.reduce(
      (total: number, item: CartItem) =>
        total + parseFloat(item.price.toString()) * item.quantity,
      0,
    );
  }, [items]);

  const { subtotal, itemCount } = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal: calculateTotal.toFixed(2),
      itemCount: count,
    };
  }, [items, calculateTotal]);

  const finalTotal = useMemo(() => {
    const subtotalNum = parseFloat(subtotal);
    const fee = paymentMethod === "cash" ? CASH_ON_DELIVERY_FEE : 0;
    return (subtotalNum + fee).toFixed(2);
  }, [subtotal, paymentMethod]);

  useEffect(() => {
    if (!user) return;

    const fetchSavedCards = async () => {
      try {
        const q = query(
          collection(db, "paymentMethods"),
          where("userId", "==", user.uid),
        );

        const querySnapshot = await getDocs(q);
        const cards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSavedCards(cards as PaymentMethod[]);

        const defaultCard = cards.find((card: any) => card.isDefault);
        if (defaultCard) {
          setSelectedCard(defaultCard.id as any);
        }
      } catch (error) {
        console.error("Error fetching saved cards:", error);
      }
    };

    fetchSavedCards();
  }, [user]);

  const handlePayWithSavedCard = async () => {
    if (!user || !selectedCard) {
      showToast("Please select a card", "warning");
      return;
    }

    setLoading(true);

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        showToast("User data not found", "error");
        setLoading(false);
        return;
      }

      const userData = userDocSnap.data();
      const hasAddress =
        userData.addressCountry &&
        userData.city &&
        userData.streetName &&
        userData.addressMobile;

      if (!hasAddress) {
        showToast(
          "Please add your shipping address in Account Settings",
          "warning",
        );
        setTimeout(() => {
          router.push("/account");
        }, 1500);
        setLoading(false);
        return;
      }

      const card = savedCards.find((c) => c.id === selectedCard);
      if (!card) {
        showToast("Card not found", "error");
        setLoading(false);
        return;
      }

      const { paymentIntentId } = await chargeSavedCard(
        card.stripePaymentMethodId || "",
        parseFloat(finalTotal),
        user.uid,
        user.email || "",
      );

      const orderItems = items.map((item: CartItem) => ({
        id: item.id || "unknown-id",
        title: item.name || item.title || "No Title",
        price: item.price || 0,
        img: item.pic || item.img || "/placeholder.png",
        quantity: item.quantity || 1,
        category: item.category || "General",
      }));

      const orderData = {
        userId: user.uid,
        userEmail: user.email || "No Email",
        items: orderItems,
        subtotal: subtotal,
        shippingFee: 0,
        totalAmount: finalTotal,
        paymentMethod: "card",
        paymentStatus: "paid",
        stripePaymentIntentId: paymentIntentId,
        itemCount: itemCount,
        status: "pending",
        shippingAddress: {
          country: userData.addressCountry || "",
          city: userData.city || "",
          street: userData.streetName || "",
          building: userData.buildingName || "",
          mobile: userData.addressMobile || "",
          details: userData.landmark || "",
        },
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), orderData);

      showToast("Payment successful! Order created.", "success");
      onClearCart();
      setTimeout(() => {
        router.push("/orders");
      }, 1500);
    } catch (error: unknown) {
      console.error("Payment error:", error);
      console.log({
        open: true,
        message: "Payment failed: " + (error as Error).message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCashCheckout = async () => {
    if (!user) {
      showToast("Please login to proceed with checkout", "warning");
      return;
    }

    setLoading(true);

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        showToast("User data not found", "error");
        setLoading(false);
        return;
      }

      const userData = userDocSnap.data();
      const hasAddress =
        userData.addressCountry &&
        userData.city &&
        userData.streetName &&
        userData.addressMobile;

      if (!hasAddress) {
        showToast("Please add shipping address", "warning");
        setTimeout(() => {
          router.push("/account");
        }, 1500);
        setLoading(false);
        return;
      }

      const orderItems = items.map((item: CartItem) => ({
        id: item.id || "unknown-id",
        title: item.name || item.title || "No Title",
        price: item.price || 0,
        img: item.pic || item.img || "/placeholder.png",
        quantity: item.quantity || 1,
        category: item.category || "General",
      }));

      const orderData = {
        userId: user.uid,
        userEmail: user.email || "No Email",
        items: orderItems,
        subtotal: subtotal,
        shippingFee: CASH_ON_DELIVERY_FEE,
        totalAmount: finalTotal,
        paymentMethod: "cash",
        paymentStatus: "pending",
        itemCount: itemCount,
        status: "pending",
        shippingAddress: {
          country: userData.addressCountry || "",
          city: userData.city || "",
          street: userData.streetName || "",
          building: userData.buildingName || "",
          mobile: userData.addressMobile || "",
          details: userData.landmark || "",
        },
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), orderData);

      showToast("Order placed successfully!", "success");
      onClearCart();
      setTimeout(() => {
        router.push("/orders");
      }, 1500);
    } catch (error: unknown) {
      console.error("Error placing order:", error);
      console.log({
        open: true,
        message: "Failed to place order: " + (error as Error).message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    showToast("Order placed successfully!", "success");
    onClearCart();
    setTimeout(() => {
      router.push("/orders");
    }, 1500);
  };

  return {
    user,
    paymentMethod,
    setPaymentMethod,
    loading,
    savedCards,
    selectedCard,
    setSelectedCard,
    useNewCard,
    setUseNewCard,
    subtotal,
    itemCount,
    finalTotal,
    handlePayWithSavedCard,
    handleCashCheckout,
    handlePaymentSuccess,
  };
}
