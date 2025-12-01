import { defineStore } from "pinia";

export const useJobApplyStore = defineStore("jobApply", {
  state: () => ({
    selectedJobId: null,
    selectedJobData: null,
  }),

  actions: {
    setJob(job) {
      this.selectedJobId = job.id;
      this.selectedJobData = job;
    },
  },
});
