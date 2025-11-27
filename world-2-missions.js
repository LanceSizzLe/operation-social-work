// World 2: Interview Intel - Mission Logic
// Operation: Social Work

// World state
const worldState = {
    energy: 100,
    xpEarned: 0,
    coinsEarned: 0,
    completedMissions: [],
    currentMission: null
};

// Settings for feedback delay (can be toggled)
let feedbackDelay = 3000; // Default 3 seconds
let fastMode = false;

// Toggle fast mode
function toggleFastMode() {
    fastMode = !fastMode;
    feedbackDelay = fastMode ? 800 : 3000;
    const btn = document.getElementById('fast-mode-btn');
    if (btn) {
        btn.textContent = fastMode ? '⚡ Fast Mode: ON' : '🐢 Fast Mode: OFF';
        btn.style.background = fastMode ? 'rgba(0, 255, 159, 0.2)' : 'rgba(255, 107, 53, 0.1)';
    }
}

// Skip current feedback and move to next
let skipFeedback = false;
function skipToNext() {
    skipFeedback = true;
}

// Get parent game state if available
const parentState = window.opener && window.opener.operationSocialWork ? 
    window.opener.operationSocialWork.getState() : null;

if (parentState) {
    worldState.energy = parentState.energy;
}

// Update HUD
function updateHUD() {
    document.getElementById('missions-completed').textContent = worldState.completedMissions.length;
    document.getElementById('world-progress-bar').style.width = (worldState.completedMissions.length / 3 * 100) + '%';
    document.getElementById('xp-earned').textContent = worldState.xpEarned;
    document.getElementById('coins-earned').textContent = worldState.coinsEarned;
    document.getElementById('energy-display').textContent = worldState.energy;
    document.getElementById('energy-bar').style.width = worldState.energy + '%';
}

function addXP(amount) {
    worldState.xpEarned += amount;
    updateHUD();
}

function addCoins(amount) {
    worldState.coinsEarned += amount;
    updateHUD();
}

function adjustEnergy(amount) {
    worldState.energy += amount;
    if (worldState.energy < 0) worldState.energy = 0;
    if (worldState.energy > 100) worldState.energy = 100;
    updateHUD();
}

// Mission selection
document.querySelectorAll('.mission-card').forEach(card => {
    card.addEventListener('click', function() {
        showMission(this.dataset.mission);
    });
});

function showMission(num) {
    document.getElementById('mission-selection').classList.add('hidden');
    document.getElementById('mission-' + num).classList.remove('hidden');
    worldState.currentMission = parseInt(num);
    
    // Initialize mission
    if (num === '1') initMission1();
    if (num === '2') initMission2();
    if (num === '3') initMission3();
}

// Cancel mission and return
function cancelMission() {
    if (confirm('Are you sure you want to cancel this mission? Progress will not be saved.')) {
        // Reset mission counters
        if (worldState.currentMission === 1) {
            m1Current = 0;
            m1Score = 0;
        } else if (worldState.currentMission === 2) {
            m2Current = 0;
            m2Score = 0;
        } else if (worldState.currentMission === 3) {
            m3Current = 0;
            m3Score = 0;
        }
        returnToMissionSelect();
    }
}

function returnToMissionSelect() {
    ['mission-1', 'mission-2', 'mission-3'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById('mission-selection').classList.remove('hidden');
    worldState.currentMission = null;
    updateHUD();
}

// Return to HQ
document.getElementById('return-to-hq').addEventListener('click', function() {
    if (window.opener && window.opener.operationSocialWork) {
        window.opener.operationSocialWork.updateFromWorld(2, {
            xpEarned: worldState.xpEarned,
            coinsEarned: worldState.coinsEarned,
            energyChange: worldState.energy - (parentState ? parentState.energy : 100),
            missionCompleted: worldState.completedMissions.length > 0
        });
        window.close();
    } else {
        window.location.href = 'agency-hq.html';
    }
});

// MISSION DATA - Shortened for file size
const mission1Data = {
    title: "Mission 1: First Contact",
    brief: "The first words you speak to a client set the tone. Choose appropriate opening responses.",
    scenarios: [
        {
            client: "Sarah, 32", avatar: "👩", emotion: "anxious",
            line: "Hi... I'm Sarah. The school sent me here. I don't really know what to say.",
            options: [
                { text: "Welcome Sarah. Let's start wherever feels comfortable for you.", correct: true, 
                  feedback: "Excellent! You acknowledged her discomfort and gave her control." },
                { text: "Don't worry, I'll ask questions. Let's start with your details.", correct: false,
                  feedback: "Too directive. This positions you as interrogator, not support." },
                { text: "You need to tell me why you're here so I can help.", correct: false,
                  feedback: "Too abrupt. Ignores her emotional state." }
            ]
        },
        {
            client: "Michael, 45", avatar: "👨", emotion: "frustrated",
            line: "I don't have time. Can you just give me the forms?",
            options: [
                { text: "I hear you're pressed for time. Let me help efficiently.", correct: true,
                  feedback: "Perfect! Validated urgency while offering collaboration." },
                { text: "You need to calm down and follow the process.", correct: false,
                  feedback: "Dismissive and escalates tension." },
                { text: "Here are forms. Fill them out in the waiting room.", correct: false,
                  feedback: "Misses opportunity to understand and build relationship." }
            ]
        }
    ]
};

const mission2Data = {
    title: "Mission 2: Emotional Echo",
    brief: "Select reflective statements that demonstrate accurate empathy.",
    scenarios: [
        {
            client: "Emma, 24", avatar: "👩", emotion: "frustrated",
            statement: "Six months applying for jobs. Every interview: not enough experience. How do I get experience if no one will hire me?",
            options: [
                { text: "You're feeling frustrated by this catch-22, and you're losing hope.", correct: true,
                  feedback: "Excellent! Named emotion and reflected deeper feeling." },
                { text: "Job market is tough. Have you tried volunteering?", correct: false,
                  feedback: "Bypasses emotion and jumps to problem-solving." },
                { text: "Don't be dramatic. Keep trying and stay positive.", correct: false,
                  feedback: "Dismisses feelings. Highly invalidating." }
            ]
        },
        {
            client: "David, 52", avatar: "👨", emotion: "anxious",
            statement: "I need surgery but can't afford it. My family depends on me working. I don't want to think about it.",
            options: [
                { text: "This is overwhelming - worried about costs, but more scared about providing for family.", correct: true,
                  feedback: "Perfect! Acknowledged both practical and deeper fear." },
                { text: "Don't worry, we can look into state hospital options.", correct: false,
                  feedback: "Skips emotional validation before problem-solving." },
                { text: "Sounds like you're stressed about money.", correct: false,
                  feedback: "Too surface-level. Misses deeper anxiety." }
            ]
        }
    ]
};

const mission3Data = {
    title: "Mission 3: Identify the Gap",
    brief: "Identify what critical information the client did NOT mention but needs exploration.",
    scenarios: [
        {
            client: "Sophie, 21", avatar: "👩",
            statement: "My boyfriend is protective - doesn't like when I go out with friends. He checks my phone sometimes, but I have nothing to hide.",
            gaps: [
                { text: "Signs of controlling behavior she's normalizing", correct: true,
                  feedback: "Correct! She describes isolation and monitoring but frames as love." },
                { text: "Whether they're planning marriage", correct: false,
                  feedback: "Not the critical concern. Controlling behaviors are the issue." },
                { text: "How she feels when he checks her phone", correct: false,
                  feedback: "Useful follow-up, but bigger gap is lack of awareness." }
            ]
        },
        {
            client: "Robert, 45", avatar: "👨",
            statement: "Work is fine. Boss is reasonable. Get my tasks done. Been there 15 years. No complaints really.",
            gaps: [
                { text: "Any sense of fulfillment or emotional connection to work", correct: true,
                  feedback: "Excellent! Description is mechanical with no emotion or meaning." },
                { text: "His exact job title", correct: false,
                  feedback: "Surface info. Emotional flatness is the real gap." },
                { text: "Whether he wants promotion", correct: false,
                  feedback: "Broader gap: entire description lacks emotional content." }
            ]
        }
    ]
};

// Mission 1 Implementation
function initMission1() {
    const container = document.getElementById('mission-1');
    container.innerHTML = `
        <div class="briefing">
            <h2>${mission1Data.title}</h2>
            <p>${mission1Data.brief}</p>
        </div>
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px;">
            <button class="btn" id="start-m1"><span>Begin Simulation</span></button>
            <button class="btn btn-secondary" id="cancel-m1"><span>✖ Cancel Mission</span></button>
        </div>
        <div id="m1-game" class="hidden"></div>
    `;
    
    document.getElementById('start-m1').addEventListener('click', () => {
        document.getElementById('m1-game').classList.remove('hidden');
        document.getElementById('start-m1').parentElement.innerHTML = `
            <button class="btn btn-secondary" id="fast-mode-btn" onclick="toggleFastMode()">🐢 Fast Mode: OFF</button>
            <button class="btn btn-secondary" onclick="cancelMission()">✖ Cancel Mission</button>
        `;
        runMission1();
    });
    
    document.getElementById('cancel-m1').addEventListener('click', cancelMission);
}

let m1Current = 0, m1Score = 0;

function runMission1() {
    if (m1Current >= mission1Data.scenarios.length) {
        endMission1();
        return;
    }
    
    const s = mission1Data.scenarios[m1Current];
    const container = document.getElementById('m1-game');
    
    container.innerHTML = `
        <div class="client-profile">
            <div class="client-avatar">${s.avatar}</div>
            <div class="client-info">
                <h3>${s.client}</h3>
            </div>
        </div>
        <div class="dialogue-box">
            <div class="dialogue-text">
                "${s.line}"
                <span class="emotion-indicator emotion-${s.emotion}">${s.emotion}</span>
            </div>
        </div>
        <div><strong>Choose your response:</strong> (${m1Current + 1}/${mission1Data.scenarios.length})</div>
        <div class="response-options" id="m1-opts"></div>
    `;
    
    s.options.forEach((opt, i) => {
        const el = document.createElement('div');
        el.className = 'response-option';
        el.innerHTML = `<div class="response-label">Option ${String.fromCharCode(65+i)}</div><div class="response-text">${opt.text}</div>`;
        el.onclick = () => selectM1(opt, el);
        document.getElementById('m1-opts').appendChild(el);
    });
}

function selectM1(opt, el) {
    document.querySelectorAll('.response-option').forEach(e => e.style.pointerEvents = 'none');
    
    // Add skip button
    const container = document.getElementById('m1-game');
    let skipBtn = document.getElementById('skip-btn');
    if (!skipBtn) {
        skipBtn = document.createElement('button');
        skipBtn.id = 'skip-btn';
        skipBtn.className = 'btn btn-secondary';
        skipBtn.innerHTML = '<span>⏩ Skip to Next</span>';
        skipBtn.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 1000;';
        skipBtn.onclick = skipToNext;
        document.body.appendChild(skipBtn);
    }
    
    setTimeout(() => {
        el.classList.add(opt.correct ? 'correct' : 'incorrect');
        if (opt.correct) { m1Score++; addXP(30); addCoins(12); }
        else adjustEnergy(-7);
        
        const fb = document.createElement('div');
        fb.className = 'feedback' + (opt.correct ? '' : ' warning');
        fb.innerHTML = `<h3>${opt.correct ? '✓ Excellent' : '✗ Reconsider'}</h3><p>${opt.feedback}</p>`;
        container.appendChild(fb);
        
        const nextScenario = () => {
            skipFeedback = false;
            if (skipBtn) skipBtn.remove();
            m1Current++;
            runMission1();
        };
        
        // Check for skip or wait for delay
        const checkSkip = setInterval(() => {
            if (skipFeedback) {
                clearInterval(checkSkip);
                nextScenario();
            }
        }, 100);
        
        setTimeout(() => {
            clearInterval(checkSkip);
            if (!skipFeedback) nextScenario();
        }, feedbackDelay);
    }, 500);
}

function endMission1() {
    const acc = (m1Score / mission1Data.scenarios.length) * 100;
    const refl = acc >= 80 ? "Outstanding! Strong rapport-building skills." : 
                 acc >= 60 ? "Good effort. Practice warmer, client-centered approaches." :
                 "Focus on building safety and respect over efficiency.";
    
    document.getElementById('m1-game').innerHTML = `
        <div class="feedback">
            <h3>Mission Complete</h3>
            <p><strong>Score:</strong> ${m1Score}/${mission1Data.scenarios.length} (${acc.toFixed(0)}%)</p>
            <p>${refl}</p>
            <div class="reflection-box">
                <strong>Reflection:</strong> First Contact Skills<br>
                ${acc >= 60 ? 'Competent opening approaches.' : 'Strengthen warmth and empathy.'}
            </div>
            <div class="feedback-actions">
                <button class="btn" onclick="completeMission(1)"><span>Continue</span></button>
            </div>
        </div>
    `;
}

// Mission 2 Implementation
function initMission2() {
    const container = document.getElementById('mission-2');
    container.innerHTML = `
        <div class="briefing">
            <h2>${mission2Data.title}</h2>
            <p>${mission2Data.brief}</p>
        </div>
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px;">
            <button class="btn" id="start-m2"><span>Begin Simulation</span></button>
            <button class="btn btn-secondary" id="cancel-m2"><span>✖ Cancel Mission</span></button>
        </div>
        <div id="m2-game" class="hidden"></div>
    `;
    
    document.getElementById('start-m2').addEventListener('click', () => {
        document.getElementById('m2-game').classList.remove('hidden');
        document.getElementById('start-m2').parentElement.innerHTML = `
            <button class="btn btn-secondary" id="fast-mode-btn" onclick="toggleFastMode()">🐢 Fast Mode: OFF</button>
            <button class="btn btn-secondary" onclick="cancelMission()">✖ Cancel Mission</button>
        `;
        runMission2();
    });
    
    document.getElementById('cancel-m2').addEventListener('click', cancelMission);
}

let m2Current = 0, m2Score = 0;

function runMission2() {
    if (m2Current >= mission2Data.scenarios.length) {
        endMission2();
        return;
    }
    
    const s = mission2Data.scenarios[m2Current];
    const container = document.getElementById('m2-game');
    
    container.innerHTML = `
        <div class="client-profile">
            <div class="client-avatar">${s.avatar}</div>
            <div class="client-info"><h3>${s.client}</h3></div>
        </div>
        <div class="dialogue-box">
            <div class="dialogue-text">"${s.statement}"</div>
        </div>
        <div><strong>Choose empathic response:</strong> (${m2Current + 1}/${mission2Data.scenarios.length})</div>
        <div class="response-options" id="m2-opts"></div>
    `;
    
    s.options.forEach((opt, i) => {
        const el = document.createElement('div');
        el.className = 'response-option';
        el.innerHTML = `<div class="response-label">Response ${String.fromCharCode(65+i)}</div><div class="response-text">"${opt.text}"</div>`;
        el.onclick = () => selectM2(opt, el);
        document.getElementById('m2-opts').appendChild(el);
    });
}

function selectM2(opt, el) {
    document.querySelectorAll('.response-option').forEach(e => e.style.pointerEvents = 'none');
    
    // Add skip button
    const container = document.getElementById('m2-game');
    let skipBtn = document.getElementById('skip-btn');
    if (!skipBtn) {
        skipBtn = document.createElement('button');
        skipBtn.id = 'skip-btn';
        skipBtn.className = 'btn btn-secondary';
        skipBtn.innerHTML = '<span>⏩ Skip to Next</span>';
        skipBtn.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 1000;';
        skipBtn.onclick = skipToNext;
        document.body.appendChild(skipBtn);
    }
    
    setTimeout(() => {
        el.classList.add(opt.correct ? 'correct' : 'incorrect');
        if (opt.correct) { m2Score++; addXP(35); addCoins(15); }
        else adjustEnergy(-6);
        
        const fb = document.createElement('div');
        fb.className = 'feedback' + (opt.correct ? '' : ' warning');
        fb.innerHTML = `<h3>${opt.correct ? '✓ Excellent Empathy' : '✗ Missed Emotion'}</h3><p>${opt.feedback}</p>`;
        container.appendChild(fb);
        
        const nextScenario = () => {
            skipFeedback = false;
            if (skipBtn) skipBtn.remove();
            m2Current++;
            runMission2();
        };
        
        const checkSkip = setInterval(() => {
            if (skipFeedback) {
                clearInterval(checkSkip);
                nextScenario();
            }
        }, 100);
        
        setTimeout(() => {
            clearInterval(checkSkip);
            if (!skipFeedback) nextScenario();
        }, feedbackDelay);
    }, 500);
}

function endMission2() {
    const acc = (m2Score / mission2Data.scenarios.length) * 100;
    const refl = acc >= 80 ? "Outstanding empathic listening!" : 
                 acc >= 60 ? "Good work. Reflect feelings before solutions." :
                 "Practice identifying emotions beneath client words.";
    
    document.getElementById('m2-game').innerHTML = `
        <div class="feedback">
            <h3>Mission Complete</h3>
            <p><strong>Score:</strong> ${m2Score}/${mission2Data.scenarios.length} (${acc.toFixed(0)}%)</p>
            <p>${refl}</p>
            <div class="reflection-box">
                <strong>Reflection:</strong> Empathic Reflection Skills<br>
                ${acc >= 60 ? 'Strong empathic capacity.' : 'Strengthen emotional attunement.'}
            </div>
            <div class="feedback-actions">
                <button class="btn" onclick="completeMission(2)"><span>Continue</span></button>
            </div>
        </div>
    `;
}

// Mission 3 Implementation
function initMission3() {
    const container = document.getElementById('mission-3');
    container.innerHTML = `
        <div class="briefing">
            <h2>${mission3Data.title}</h2>
            <p>${mission3Data.brief}</p>
        </div>
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px;">
            <button class="btn" id="start-m3"><span>Begin Simulation</span></button>
            <button class="btn btn-secondary" id="cancel-m3"><span>✖ Cancel Mission</span></button>
        </div>
        <div id="m3-game" class="hidden"></div>
    `;
    
    document.getElementById('start-m3').addEventListener('click', () => {
        document.getElementById('m3-game').classList.remove('hidden');
        document.getElementById('start-m3').parentElement.innerHTML = `
            <button class="btn btn-secondary" id="fast-mode-btn" onclick="toggleFastMode()">🐢 Fast Mode: OFF</button>
            <button class="btn btn-secondary" onclick="cancelMission()">✖ Cancel Mission</button>
        `;
        runMission3();
    });
    
    document.getElementById('cancel-m3').addEventListener('click', cancelMission);
}

let m3Current = 0, m3Score = 0;

function runMission3() {
    if (m3Current >= mission3Data.scenarios.length) {
        endMission3();
        return;
    }
    
    const s = mission3Data.scenarios[m3Current];
    const container = document.getElementById('m3-game');
    
    container.innerHTML = `
        <div class="client-profile">
            <div class="client-avatar">${s.avatar}</div>
            <div class="client-info"><h3>${s.client}</h3></div>
        </div>
        <div class="dialogue-box">
            <div class="dialogue-text">"${s.statement}"</div>
        </div>
        <div style="background: rgba(255,107,53,0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
            <strong>What important information did the client NOT mention?</strong><br>
            <span style="color: #8ba3b8;">(${m3Current + 1}/${mission3Data.scenarios.length})</span>
        </div>
        <div class="response-options" id="m3-opts"></div>
    `;
    
    s.gaps.forEach((gap, i) => {
        const el = document.createElement('div');
        el.className = 'response-option';
        el.innerHTML = `<div class="response-label">Gap ${String.fromCharCode(65+i)}</div><div class="response-text">${gap.text}</div>`;
        el.onclick = () => selectM3(gap, el);
        document.getElementById('m3-opts').appendChild(el);
    });
}

function selectM3(gap, el) {
    document.querySelectorAll('.response-option').forEach(e => e.style.pointerEvents = 'none');
    
    // Add skip button
    const container = document.getElementById('m3-game');
    let skipBtn = document.getElementById('skip-btn');
    if (!skipBtn) {
        skipBtn = document.createElement('button');
        skipBtn.id = 'skip-btn';
        skipBtn.className = 'btn btn-secondary';
        skipBtn.innerHTML = '<span>⏩ Skip to Next</span>';
        skipBtn.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 1000;';
        skipBtn.onclick = skipToNext;
        document.body.appendChild(skipBtn);
    }
    
    setTimeout(() => {
        el.classList.add(gap.correct ? 'correct' : 'incorrect');
        if (gap.correct) { m3Score++; addXP(40); addCoins(18); }
        else adjustEnergy(-6);
        
        const fb = document.createElement('div');
        fb.className = 'feedback' + (gap.correct ? '' : ' warning');
        fb.innerHTML = `<h3>${gap.correct ? '✓ Excellent Insight' : '✗ Missed Gap'}</h3><p>${gap.feedback}</p>`;
        container.appendChild(fb);
        
        const nextScenario = () => {
            skipFeedback = false;
            if (skipBtn) skipBtn.remove();
            m3Current++;
            runMission3();
        };
        
        const checkSkip = setInterval(() => {
            if (skipFeedback) {
                clearInterval(checkSkip);
                nextScenario();
            }
        }, 100);
        
        setTimeout(() => {
            clearInterval(checkSkip);
            if (!skipFeedback) nextScenario();
        }, feedbackDelay);
    }, 500);
}

function endMission3() {
    const acc = (m3Score / mission3Data.scenarios.length) * 100;
    const refl = acc >= 80 ? "Exceptional listening! You hear what's unspoken." : 
                 acc >= 60 ? "Good work. Practice noticing emotional absences." :
                 "Focus on what clients avoid or minimize.";
    
    document.getElementById('m3-game').innerHTML = `
        <div class="feedback">
            <h3>Mission Complete</h3>
            <p><strong>Score:</strong> ${m3Score}/${mission3Data.scenarios.length} (${acc.toFixed(0)}%)</p>
            <p>${refl}</p>
            <div class="reflection-box">
                <strong>Reflection:</strong> Reading Between Lines<br>
                ${acc >= 60 ? 'Strong deep listening skills.' : 'Strengthen gap identification.'}
            </div>
            <div class="feedback-actions">
                <button class="btn" onclick="completeMission(3)"><span>Continue</span></button>
            </div>
        </div>
    `;
}

// Complete mission
function completeMission(num) {
    if (!worldState.completedMissions.includes(num)) {
        worldState.completedMissions.push(num);
        const card = document.querySelector(`[data-mission="${num}"]`);
        card.classList.add('completed');
        card.querySelector('.mission-status').className = 'mission-status status-completed';
        card.querySelector('.mission-status').textContent = 'Completed';
    }
    returnToMissionSelect();
}

// Initialize
updateHUD();

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Spacebar or Enter to skip feedback
    if (e.code === 'Space' || e.code === 'Enter') {
        const skipBtn = document.getElementById('skip-btn');
        if (skipBtn && !skipFeedback) {
            e.preventDefault();
            skipToNext();
        }
    }
    
    // F key to toggle fast mode
    if (e.code === 'KeyF') {
        const fastBtn = document.getElementById('fast-mode-btn');
        if (fastBtn) toggleFastMode();
    }
    
    // Escape to cancel mission
    if (e.code === 'Escape' && worldState.currentMission) {
        cancelMission();
    }
});
