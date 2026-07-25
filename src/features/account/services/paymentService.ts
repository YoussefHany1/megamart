import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  deletePaymentMethod as deleteStripePaymentMethod,
  createSetupIntent as createStripeSetupIntent,
} from "@/features/payments/actions/stripeActions";

export async function fetchPaymentMethods(userId) {
  const q = query(
    collection(db, "paymentMethods"),
    where("userId", "==", userId),
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as any[];
}

export async function deletePaymentMethod(stripePaymentMethodId, cardId) {
  // Delete from Stripe
  await deleteStripePaymentMethod(stripePaymentMethodId);

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
  const data = await createStripeSetupIntent(userId, email);
  return data.clientSecret;
}
