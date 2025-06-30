// Minimal AI Team Orchestrator
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class MinimalOrchestrator {
  constructor() {
    this.app = express();
    this.teams = new Map();
    this.config = require('./config');
    this.setupRoutes();
  }
  
  setupRoutes() {
    this.app.use(express.json());
    
    // Platform status endpoint
    this.app.get('/status', (req, res) => {
      res.json({
        platform: 'AI Team Orchestrator',
        mode: 'minimal',
        activeTeams: this.teams.size,
        uptime: process.uptime(),
        budget: this.config.platform.budgetLimit,
        cost: this.calculateMonthlyCost()
      });
    });
    
    // Create team endpoint
    this.app.post('/teams', async (req, res) => {
      try {
        const { name, template } = req.body;
        const team = await this.createTeam(name, template);
        res.json({ success: true, team });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
    
    // List teams
    this.app.get('/teams', (req, res) => {
      const teamList = Array.from(this.teams.values()).map(team => ({
        name: team.name,
        template: team.template,
        status: team.status,
        agents: Object.keys(team.agents),
        created: team.created
      }));
      res.json(teamList);
    });
  }
  
  async createTeam(name, template = 'minimal-app') {
    if (this.teams.size >= this.config.platform.maxTeams) {
      throw new Error(`Maximum teams reached (${this.config.platform.maxTeams}). Upgrade for more.`);
    }
    
    const teamId = uuidv4();
    const team = {
      id: teamId,
      name,
      template,
      status: 'initializing',
      created: new Date().toISOString(),
      agents: await this.createAgents(template),
      repository: null,
      cost: 0
    };
    
    // Create GitHub repository for the team
    team.repository = await this.createTeamRepository(name);
    
    this.teams.set(teamId, team);
    team.status = 'active';
    
    console.log(`✅ Team '${name}' created with ${Object.keys(team.agents).length} agents`);
    return team;
  }
  
  async createAgents(template) {
    // Minimal agent setup - just core roles
    const agents = {
      pm: {
        role: 'project_manager',
        focus: 'coordination',
        status: 'active'
      },
      developer: {
        role: 'full_stack_developer', 
        focus: 'implementation',
        status: 'active'
      },
      tester: {
        role: 'quality_assurance',
        focus: 'testing',
        status: 'active'
      }
    };
    
    return agents;
  }
  
  async createTeamRepository(teamName) {
    // This would integrate with GitHub API to create team repo
    // For now, return mock data
    return {
      name: `${teamName}-project`,
      url: `https://github.com/YOUR_USERNAME/${teamName}-project`,
      created: true
    };
  }
  
  calculateMonthlyCost() {
    // Track costs for budget management
    const baseCost = 0; // Platform is free
    const teamCosts = this.teams.size * 5; // $5 per active team (estimated AI usage)
    return baseCost + teamCosts;
  }
  
  start(port = 8080) {
    this.app.listen(port, () => {
      console.log(`🚀 AI Team Orchestrator running on port ${port}`);
      console.log(`💰 Monthly budget limit: $${this.config.platform.budgetLimit}`);
      console.log(`🤖 Max teams: ${this.config.platform.maxTeams}`);
    });
  }
}

module.exports = MinimalOrchestrator;

// Start if run directly
if (require.main === module) {
  const orchestrator = new MinimalOrchestrator();
  orchestrator.start();
}
