
import { create } from 'zustand';

export const useMentalAssessmentStore = create((set) => ({
  mentalAssessmentTotal: 0,
  setMentalAssessmentTotal: (total) => set({ mentalAssessmentTotal: total }),
}));


