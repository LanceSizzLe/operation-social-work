# Operation: Social Work - Integration Guide
## Connecting All Worlds Together

This guide explains how the multi-world system works and how to set up your files.

---

## 📁 File Structure

Your project should have this structure:

```
operation-social-work/
├── agency-hq.html                 ← Main hub (START HERE)
├── world-1-orientation-ops.html   ← World 1
├── world-2-interview-intel.html   ← World 2  
├── world-2-missions.js            ← World 2 logic
├── README.md
├── .gitignore
└── (future worlds will go here)
```

---

## 🎮 How the Integration Works

### 1. **Central Hub System** (`agency-hq.html`)
- This is your main menu/HQ
- Shows all 8 worlds with their status
- Tracks global progress (XP, coins, energy)
- Saves progress to browser localStorage
- Unlocks worlds progressively

### 2. **Individual World Files**
- Each world is a separate HTML file
- Loads with current energy/progress from HQ
- Tracks missions completed within that world
- Returns progress data back to HQ when exiting

### 3. **Data Persistence**
- Uses `localStorage` to save progress
- Data persists between sessions
- No server needed - all client-side

---

## 🚀 Quick Start Instructions

### Step 1: Download All Files
Download these files to the same folder:
- `agency-hq.html`
- `world-1-orientation-ops.html`
- `world-2-interview-intel.html`
- `world-2-missions.js`

### Step 2: Open the Hub
**Double-click `agency-hq.html`** to open in your browser.

That's it! The hub will:
- Show World 1 as unlocked
- Track your progress
- Unlock World 2 when you complete World 1
- Save everything automatically

---

## 🔄 How World Unlocking Works

1. **World 1** starts unlocked
2. Complete all 3 missions in World 1
3. **World 2** automatically unlocks
4. Complete World 2 to unlock World 3 (when built)
5. And so on...

Each world checks the HQ's progress data to know what to unlock.

---

## 💾 Data Flow Explained

### When You Enter a World:

```javascript
HQ → World
├── Current XP
├── Current Coins  
├── Current Energy
└── Completed missions in this world
```

### When You Exit a World:

```javascript
World → HQ
├── XP Earned (+X)
├── Coins Earned (+X)
├── Energy Change (-X or +X)
└── Mission completion status
```

### The Code That Does This:

**In HQ (agency-hq.html):**
```javascript
window.operationSocialWork = {
    getState: () => gameState,
    saveState: saveGameState,
    updateFromWorld: (worldId, data) => {
        // Updates HQ with world progress
        gameState.xp += data.xpEarned;
        gameState.coins += data.coinsEarned;
        // ... etc
    }
};
```

**In Each World:**
```javascript
// Get HQ state when loading
const parentState = window.opener?.operationSocialWork?.getState();

// Send progress back when exiting
window.opener.operationSocialWork.updateFromWorld(2, {
    xpEarned: worldState.xpEarned,
    coinsEarned: worldState.coinsEarned,
    energyChange: energyDelta
});
```

---

## 🛠️ Technical Details

### localStorage Keys Used:
- `operationSocialWorkState` - Main game state

### State Structure:
```javascript
{
    xp: 0,                    // Total XP earned
    coins: 0,                 // Total coins earned
    energy: 100,              // Current energy level
    worlds: {
        1: {
            unlocked: true,
            completed: false,
            missionsCompleted: 0,
            totalMissions: 3
        },
        2: { ... },
        // ... up to world 8
    }
}
```

---

## 🎨 Customizing Worlds

### Adding a New World

1. **Create the HTML file** (e.g., `world-3-network-nexus.html`)
2. **Copy the structure from World 2**
3. **Update these items:**
   - Title and subtitle
   - Color scheme (CSS variables)
   - Mission data
   - World ID in the return function

4. **Update `agency-hq.html`:**
   - Add to `worldDefinitions` array
   - Specify filename

Example:
```javascript
{
    id: 3,
    title: "Network Nexus",
    subtitle: '"The Collaboration Grid"',
    description: "Navigate interdisciplinary teamwork...",
    theme: "Interdisciplinary Collaboration",
    file: "world-3-network-nexus.html"
}
```

---

## 🎯 Mission Structure

Each world should have 3-5 missions following this pattern:

### Mission Template:
```javascript
{
    title: "Mission Name",
    brief: "Brief description",
    scenarios: [
        {
            client: "Name, Age",
            avatar: "emoji",
            content: "Scenario details",
            options: [
                {
                    text: "Option text",
                    correct: true/false,
                    feedback: "Explanation"
                }
            ]
        }
    ]
}
```

### Rewards System:
- **Correct answer:** +30-40 XP, +12-18 coins
- **Incorrect answer:** -5 to -7 energy
- **Mission complete:** Shows feedback + reflection

---

## 🐛 Troubleshooting

### Problem: Worlds won't unlock
**Solution:** Make sure you're viewing the files through a web browser (not just opening in a text editor). The localStorage API needs a proper HTTP context.

### Problem: Progress doesn't save
**Solution:** 
- Check browser console for errors (F12)
- Make sure localStorage isn't disabled
- Try a different browser
- Clear cache and reload

### Problem: World 2 won't load properly
**Solution:** Make sure `world-2-missions.js` is in the same folder as the HTML files.

### Problem: Clicking world cards does nothing
**Solution:** Check that:
1. The world is unlocked (green border)
2. The filename in `worldDefinitions` matches your actual file
3. Files are in the same directory

---

## 🔐 Privacy & Security

### What Data is Stored:
- Game progress (missions, XP, coins)
- Energy levels
- World unlock status

### What Data is NOT Stored:
- No personal information
- No user identification
- No reflection content (only shown, not stored)
- No tracking or analytics

### Where Data is Stored:
- Browser's localStorage only
- Never sent to any server
- Stays on your device

### Clearing Data:
- Browser: Clear site data for the file location
- Manual: Open browser console and run: `localStorage.clear()`

---

## 📱 Mobile Support

The game works on mobile devices:
- Responsive design adapts to screen size
- Touch-friendly buttons and cards
- No mouse required
- Optimized for phones and tablets

**Note:** World 1's drag-and-drop mission works best on desktop. Mobile users should use the other missions for best experience.

---

## 🚧 Future Enhancements

When building Worlds 3-8, you can add:

### Optional Features:
- **Achievements/Badges** - Track special accomplishments
- **Leaderboards** - Compare with classmates (optional)
- **Supervisor Dashboard** - View student progress (requires backend)
- **LMS Integration** - Auto-sync reflection exports
- **Additional Mechanics:**
  - Timed missions
  - Multi-step scenarios
  - Client relationship tracking
  - Supervisor feedback simulations

### Progressive Difficulty:
- World 1-2: Recognition and basic decisions
- World 3-5: Layered reasoning, ambiguity
- World 6-7: Complex ethical dilemmas
- World 8: Integrated competency assessment

---

## 📖 Educational Principles

The integration system supports key pedagogical goals:

### 1. **Scaffolded Learning**
- Progressive unlock ensures mastery before advancing
- Each world builds on previous competencies

### 2. **Intrinsic Motivation**
- XP/coins provide immediate feedback
- World unlocking creates achievement goals
- Energy meter teaches self-care

### 3. **Reflective Practice**
- Automatic reflection generation
- Feedback explains "why" not just "wrong"
- Encourages mission replay

### 4. **Low-Stakes Practice**
- Mistakes reduce energy, not grades
- Unlimited retries available
- Focus on learning, not evaluation

---

## 🎓 For Educators

### Using in Classroom:
1. **Demo Mode:** Project HQ on screen, discuss world themes
2. **Paired Play:** Students discuss options before choosing
3. **Debrief:** Use reflection summaries for group discussion
4. **Assignments:** "Complete World X and export reflections"

### Tracking Progress:
Currently: Students self-report via reflections
Future: Optional instructor dashboard

### Customization:
- Edit mission content for local context
- Adjust XP thresholds for world unlocks
- Modify energy penalties for your cohort
- Add/remove missions as needed

---

## 🔧 Developer Notes

### Adding Analytics (Optional):

```javascript
// Add to agency-hq.html
function trackEvent(event, data) {
    // Send to your analytics system
    console.log('Event:', event, data);
}

// Call when worlds are completed
trackEvent('world_completed', { worldId: 2, xp: 250 });
```

### Backend Integration (Future):

```javascript
// Save to database instead of localStorage
async function saveToServer(state) {
    await fetch('/api/save-progress', {
        method: 'POST',
        body: JSON.stringify(state)
    });
}
```

### Custom Themes:

Edit CSS variables in each world file:
```css
:root {
    --neon-cyan: #00f3ff;    /* Change primary color */
    --neon-purple: #9d00ff;  /* Change accent color */
    /* ... etc */
}
```

---

## 📚 Additional Resources

### Related Documentation:
- `README.md` - Project overview
- `git-setup-guide.md` - Version control instructions
- Game Design Document - Full specifications

### Technologies Used:
- HTML5 - Structure
- CSS3 - Styling & animations
- JavaScript (ES6+) - Game logic
- localStorage API - Data persistence
- PixiJS - Graphics rendering (World 1)

### Browser Requirements:
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+)
- JavaScript enabled
- localStorage enabled
- ~50MB available storage

---

## ✅ Checklist for Adding New Worlds

When creating World 3-8, ensure:

- [ ] HTML file follows naming convention (`world-X-name.html`)
- [ ] Updated HQ's `worldDefinitions` array
- [ ] Unique color scheme in CSS
- [ ] 3-5 missions with educational content
- [ ] Proper XP/coin rewards set
- [ ] Return-to-HQ button working
- [ ] Integration code present
- [ ] Mobile responsive
- [ ] Tested on multiple browsers
- [ ] Reflections exportable

---

## 🎉 Conclusion

You now have a fully integrated, multi-world educational game system! The hub manages progress, worlds provide focused learning experiences, and everything saves automatically.

**To get started:**
1. Open `agency-hq.html` in your browser
2. Click on World 1
3. Complete missions
4. Watch World 2 unlock!

**Questions?** Check the troubleshooting section or review the code comments in each file.

---

**Happy Gaming and Learning! 🎮📚**

*Operation: Social Work - Preparing the next generation of Social Work professionals*
