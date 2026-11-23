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
import type { PaymentMethodCard } from "@/features/payments/types";
import {
  deletePaymentMethod as deleteStripePaymentMethod,
  createSetupIntent as createStripeSetupIntent,
} from "@/features/payments/actions/stripeActions";

export async function fetchPaymentMethods(userId: string) {
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

export async function deletePaymentMethod(
  stripePaymentMethodId: string,
  cardId: string,
) {
  // Delete from Stripe
  await deleteStripePaymentMethod(stripePaymentMethodId);

  // Delete from Firestore
  await deleteDoc(doc(db, "paymentMethods", cardId));
}

export async function setDefaultPaymentMethod(
  cardId: string,
  allCards: PaymentMethodCard[],
) {
  const batch = allCards.map((card) =>
    updateDoc(doc(db, "paymentMethods", card.id as string), {
      isDefault: card.id === cardId,
    }),
  );

  await Promise.all(batch);
}

export async function createSetupIntent(userId: string, email: string) {
  const data = await createStripeSetupIntent(userId, email);
  return data.clientSecret;
}
