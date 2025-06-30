# AI Team Orchestrator - Minimal Budget Setup

🚀 **Universal AI agent team platform for autonomous software development**

## 💰 Budget: $0-20/month (vs $200-300 premium)

### Quick Start

1. **Set API tokens**:
   ```bash
   export GITHUB_TOKEN="your_token_here"
   export SLACK_BOT_TOKEN="xoxb-your_token_here" # Optional
   ```

2. **Install and run**:
   ```bash
   npm install
   npm start
   ```

3. **Create your first team**:
   ```bash
   curl -X POST http://localhost:8080/teams \
     -H "Content-Type: application/json" \
     -d '{"name":"my-project","template":"minimal-app"}'
   ```

### Features

- ✅ **FREE GitHub integration** (repos, actions, issues)
- ✅ **FREE Slack integration** (10k messages/month)
- ✅ **FREE Linear integration** (3 teammates)
- ✅ **Auto team creation** (up to 3 teams)
- ✅ **GitHub Actions CI/CD** (2000 minutes/month free)
- ✅ **Platform monitoring** via GitHub insights

### Architecture

```
platform/core/          # Core orchestration logic
platform/agents/         # AI agent definitions  
platform/templates/      # Project templates
integrations/           # GitHub, Slack, Linear
deployment/minimal/     # Lightweight deployment
```

### Scaling Path

Start minimal → Add premium features as needed:
- $0-20/month: 3 teams, basic features
- $50-100/month: 10 teams, advanced automation  
- $200-300/month: Unlimited teams, full platform

### Commands

- **Platform**: `GET /status`, `GET /teams`
- **Teams**: `POST /teams`, `GET /teams/:id`
- **Slack**: `/platform-status`, `/create-team`, `/list-teams`

Ready to deploy your first autonomous AI development team! 🎯
