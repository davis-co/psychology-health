
import { create } from 'zustand';

export const useViolenceAssessmentStore = create((set) => ({
  violenceAssessmentTotal: 0,
  setViolenceAssessmentTotal: (total) => set({ violenceAssessmentTotal: total }),
}));


