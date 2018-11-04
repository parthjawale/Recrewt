export default {
  state: {
    jobs: [
      {
        id: 1,
        company: "Infosys Tech Solutions",
        requiredPosition: "Software Tester",
        positionsAvailable: 1,
        lastDate: "26th Nov",
        show: false,
        tag: "Design",
        estimatedDuration: "2 Months",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    ]
  },
  getters: {
    getJobs: state => {
      return state.jobs;
    }
  },
  mutations: {
    setJobs: (state, payload) => {
      state.jobs = payload;
    }
  },
  actions: {
    getJobs: ({ commit }) => {
      //Firebase code here
      // commit () after firebase async code.
    }
  }
};
