import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export async function fetchPaymentMethods(userId) {
  const q = query(
    collection(db, "paymentMethods"),
    where("userId", "==", userId),
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function deletePaymentMethod(stripePaymentMethodId, cardId) {
  // Delete from Stripe
  const res = await fetch("/api/delete-payment-method", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paymentMethodId: stripePaymentMethodId }),
  });

  if (!res.ok) throw new Error("Failed to delete from Stripe");

  // Delete from Firestore
  await deleteDoc(doc(db, "paymentMethods", cardId));
}

export async function setDefaultPaymentMethod(cardId, allCards) {
  const batch = allCards.map((card) =>
    updateDoc(doc(db, "paymentMethods", card.id), {
      isDefault: card.id === cardId,
    }),
  );

  await Promise.all(batch);
}

export async function createSetupIntent(userId, email) {
  const res = await fetch("/api/create-setup-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, email }),
  });

  if (!res.ok) throw new Error("Failed to initialize payment setup");

  const data = await res.json();
  return data.clientSecret;
}
