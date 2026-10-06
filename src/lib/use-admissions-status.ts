import { useSyncExternalStore } from "react";

import {
  admissionsProgress,
  admissionsStatus,
  latestAdmissions,
  type AdmissionsStatus,
} from "@/data/announcements";

const noopSubscribe = () => () => {};

/* Κατάσταση της πιο πρόσφατης πρόσκλησης (upcoming/open/closed). Στο server
   render και στο hydration επιστρέφει null, ώστε μια σελίδα που χτίστηκε πριν
   αλλάξει η κατάσταση να μη δώσει hydration mismatch. Η σωστή τιμή εμφανίζεται
   αμέσως μετά. null και όταν δεν υπάρχει καμία πρόσκληση. */
export function useAdmissionsStatus(): AdmissionsStatus | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => (latestAdmissions ? admissionsStatus(latestAdmissions.admissions, new Date()) : null),
    () => null,
  );
}

/* Πόσο από το διάστημα υποβολής έχει περάσει (0–1), για τη μπάρα της αρχικής.
   Ίδιοι κανόνες με το useAdmissionsStatus: null στο server και στο hydration.
   Στρογγυλεμένο σε 2 δεκαδικά, ώστε δύο διαδοχικές αναγνώσεις να δίνουν την
   ίδια τιμή (απαίτηση του useSyncExternalStore). */
export function useAdmissionsProgress(): number | null {
  return useSyncExternalStore(
    noopSubscribe,
    () =>
      latestAdmissions
        ? Math.round(admissionsProgress(latestAdmissions.admissions, new Date()) * 100) / 100
        : null,
    () => null,
  );
}

export const ADMISSIONS_STATUS_LABEL: Record<AdmissionsStatus, string> = {
  upcoming: "Δεν έχουν ανοίξει ακόμη",
  open: "Οι αιτήσεις είναι ανοιχτές",
  closed: "Οι αιτήσεις έκλεισαν",
};
