// Simple Slack Integration for Minimal Platform
const axios = require('axios');

class SimpleSlackCommands {
  constructor(orchestratorUrl = 'http://localhost:8080') {
    this.orchestratorUrl = orchestratorUrl;
  }
  
  // Simple webhook handler for Slack commands
  async handleSlashCommand(command, text, userId) {
    try {
      switch (command) {
        case '/platform-status':
          return await this.getPlatformStatus();
          
        case '/create-team':
          const [teamName, template] = text.split(' ');
          return await this.createTeam(teamName, template);
          
        case '/list-teams':
          return await this.listTeams();
          
        default:
          return {
            text: `❌ Unknown command: ${command}\n\nAvailable commands:\n• /platform-status\n• /create-team <name> [template]\n• /list-teams`
          };
      }
    } catch (error) {
      return {
        text: `❌ Error: ${error.message}`
      };
    }
  }
  
  async getPlatformStatus() {
    const response = await axios.get(`${this.orchestratorUrl}/status`);
    const status = response.data;
    
    return {
      text: `🚀 **AI Team Orchestrator Status**\n\n• **Mode**: ${status.platform} (${status.mode})\n• **Active Teams**: ${status.activeTeams}\n• **Monthly Cost**: $${status.cost}/${status.budget}\n• **Uptime**: ${Math.floor(status.uptime / 3600)}h ${Math.floor((status.uptime % 3600) / 60)}m`
    };
  }
  
  async createTeam(teamName, template = 'minimal-app') {
    if (!teamName) {
      return {
        text: `❌ **Usage**: /create-team <name> [template]\n\n**Example**: /create-team photocurate minimal-app`
      };
    }
    
    const response = await axios.post(`${this.orchestratorUrl}/teams`, {
      name: teamName,
      template
    });
    
    const team = response.data.team;
    
    return {
      text: `✅ **Team Created**: ${teamName}\n\n• **Template**: ${template}\n• **Agents**: ${Object.keys(team.agents).join(', ')}\n• **Repository**: Will be created\n• **Status**: ${team.status}\n\n🚀 Team is ready for directives!`
    };
  }
  
  async listTeams() {
    const response = await axios.get(`${this.orchestratorUrl}/teams`);
    const teams = response.data;
    
    if (teams.length === 0) {
      return {
        text: `📋 **No Active Teams**\n\nCreate your first team:\n/create-team my-project minimal-app`
      };
    }
    
    const teamList = teams.map(team => 
      `• **${team.name}** (${team.template}) - ${team.agents.length} agents - ${team.status}`
    ).join('\n');
    
    return {
      text: `📋 **Active Teams** (${teams.length})\n\n${teamList}`
    };
  }
}

module.exports = SimpleSlackCommands;
