// Minimal Platform Configuration
module.exports = {
  platform: {
    mode: 'minimal',
    maxTeams: 3,
    budgetLimit: 20, // dollars per month
    autoScaling: false
  },
  
  agents: {
    // Reduced agent types for minimal setup
    core: ['pm', 'developer', 'tester'],
    maxPerTeam: 3,
    resourceLimits: {
      memory: '512MB',
      cpu: '0.5 cores'
    }
  },
  
  infrastructure: {
    deployment: 'github-actions-free', // 2000 minutes/month free
    storage: 'github-repos',           // FREE
    monitoring: 'github-insights',     // FREE
    notifications: 'github-issues'     // FREE (can upgrade to Slack later)
  },
  
  integrations: {
    github: { required: true, cost: 0 },
    slack: { required: false, cost: 0 },    // FREE tier
    linear: { required: false, cost: 0 }    // FREE tier
  }
};
