import { useSyncExternalStore } from "react";

import { admissionsStatus, type AdmissionsStatus } from "@/data/program";

const noopSubscribe = () => () => {};

/* Κατάσταση αιτήσεων (upcoming/open/closed) με βάση τις ημερομηνίες του
   program.ts. Στο server render και στο hydration επιστρέφει null, ώστε μια
   σελίδα που χτίστηκε πριν αλλάξει η κατάσταση να μη δώσει hydration
   mismatch. Η σωστή τιμή εμφανίζεται αμέσως μετά. */
export function useAdmissionsStatus(): AdmissionsStatus | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => admissionsStatus(new Date()),
    () => null,
  );
}

export const ADMISSIONS_STATUS_LABEL: Record<AdmissionsStatus, string> = {
  upcoming: "Δεν έχουν ανοίξει ακόμη",
  open: "Οι αιτήσεις είναι ανοιχτές",
  closed: "Οι αιτήσεις έκλεισαν",
};
