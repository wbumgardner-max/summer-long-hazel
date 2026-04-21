// Summer Long Hazel - Main Application

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initLeaderboard();
    initPayment();
    initScoreForm();
    initSchedule();
    initAdmin();
    
    // Secret admin access via /admin path or session flag
    const isAdminMode = window.location.pathname.includes('admin') || 
                        sessionStorage.getItem('slh-admin') === 'true' ||
                        window.location.hash === '#admin-redirect';
    
    if (isAdminMode) {
        // Clear the flag so refresh goes back to normal (unless on /admin path)
        if (window.location.hash === '#admin-redirect') {
            sessionStorage.removeItem('slh-admin');
            history.replaceState(null, '', window.location.pathname);
        }
        
        const adminBtn = document.getElementById('admin-nav-btn');
        if (adminBtn) {
            adminBtn.style.display = 'inline-flex';
            adminBtn.click(); // Auto-show admin view
        }
    }
});

// ==================== Navigation ====================
function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const viewId = btn.dataset.view;
            showView(viewId);
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

// ==================== Leaderboard ====================
function initLeaderboard() {
    const flightTabs = document.querySelectorAll('.flight-tab');
    flightTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            flightTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderLeaderboard(tab.dataset.flight);
        });
    });
    
    renderLeaderboard('all');
    updatePurseCounter();
}

function updatePurseCounter() {
    const teamCount = TOURNAMENT_DATA.teams.length;
    const totalPurse = teamCount * 1000; // $1000 per team ($500/person)
    
    const purseEl = document.getElementById('total-purse');
    const teamCountEl = document.getElementById('purse-team-count');
    
    if (purseEl) {
        // Animate the counter
        animateValue(purseEl, 0, totalPurse, 1500);
    }
    if (teamCountEl) {
        teamCountEl.textContent = teamCount;
    }
}

function animateValue(el, start, end, duration) {
    const startTime = performance.now();
    const format = (val) => '$' + val.toLocaleString();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        
        el.textContent = format(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function renderLeaderboard(flight) {
    const tbody = document.getElementById('leaderboard-body');
    
    // Get teams with standings
    let teamsWithStandings = TOURNAMENT_DATA.teams.map(team => ({
        ...team,
        ...TOURNAMENT_DATA.standings[team.id]
    }));
    
    // Filter by flight if needed
    if (flight !== 'all') {
        teamsWithStandings = teamsWithStandings.filter(t => t.flight === flight);
    }
    
    // Sort by points, then wins
    teamsWithStandings.sort((a, b) => {
        if (b.pointsFor !== a.pointsFor) return b.pointsFor - a.pointsFor;
        if (b.wins !== a.wins) return b.wins - a.wins;
        return a.losses - b.losses;
    });
    
    tbody.innerHTML = teamsWithStandings.map((team, idx) => `
        <tr class="${idx < 3 ? 'rank-' + (idx + 1) : ''}">
            <td><strong>${idx + 1}</strong></td>
            <td class="team-name">${getTeamFullName(team.id)}</td>
            <td>
                ${team.flight ? 
                    `<span class="flight-badge flight-${team.flight}">${capitalizeFirst(team.flight)}</span>` : 
                    '<span style="color:#999">TBD</span>'}
            </td>
            <td>${team.wins}-${team.losses}-${team.ties}</td>
            <td><strong>${team.pointsFor}</strong></td>
            <td>${team.matchesPlayed}</td>
        </tr>
    `).join('');
    
    if (teamsWithStandings.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;padding:2rem;color:#666">
                    ${flight === 'all' ? 'No matches played yet. Season starts April 15!' : 'No teams assigned to this flight yet.'}
                </td>
            </tr>
        `;
    }
}

// ==================== Payment ====================
function initPayment() {
    renderPaymentStatus();
    updateVenmoLink();
}

function updateVenmoLink() {
    const username = TOURNAMENT_DATA.venmo?.username || '@SummerLongHazel';
    const usernameClean = username.replace('@', '');
    
    document.getElementById('venmo-username').textContent = username;
    document.getElementById('venmo-link').href = `https://venmo.com/${usernameClean}?txn=pay&amount=1000&note=Summer%20Long%20Hazel%20Entry%20Fee`;
}

function renderPaymentStatus() {
    const teamsPaid = Object.values(TOURNAMENT_DATA.payments || {}).filter(p => p.paid).length;
    const totalCollected = teamsPaid * 1000;
    const totalExpected = TOURNAMENT_DATA.teams.length * 1000;
    
    document.getElementById('teams-paid').textContent = teamsPaid;
    document.getElementById('total-collected').textContent = `$${totalCollected.toLocaleString()}`;
    document.getElementById('total-expected').textContent = `$${totalExpected.toLocaleString()}`;
    
    const paymentList = document.getElementById('payment-list');
    paymentList.innerHTML = TOURNAMENT_DATA.teams.map(team => {
        const payment = TOURNAMENT_DATA.payments?.[team.id];
        const isPaid = payment?.paid || false;
        
        return `
            <div class="payment-row ${isPaid ? 'paid' : ''}">
                <span class="payment-team">${getTeamFullName(team.id)}</span>
                <span class="payment-badge ${isPaid ? 'paid' : 'unpaid'}">
                    ${isPaid ? '✓ Paid' : 'Unpaid'}
                </span>
            </div>
        `;
    }).join('');
}

function updateVenmoUsername(username) {
    if (!TOURNAMENT_DATA.venmo) TOURNAMENT_DATA.venmo = {};
    TOURNAMENT_DATA.venmo.username = username.startsWith('@') ? username : '@' + username;
    saveData();
    updateVenmoLink();
    showToast('Venmo username updated!', 'success');
}

function renderPaymentManagement() {
    const container = document.getElementById('payment-management');
    const adminVenmoInput = document.getElementById('admin-venmo-username');
    
    if (adminVenmoInput) {
        adminVenmoInput.value = TOURNAMENT_DATA.venmo?.username || '@SummerLongHazel';
    }
    
    container.innerHTML = TOURNAMENT_DATA.teams.map(team => {
        const payment = TOURNAMENT_DATA.payments?.[team.id];
        const isPaid = payment?.paid || false;
        
        return `
            <div class="payment-admin-row">
                <span>${getTeamFullName(team.id)}</span>
                <div class="payment-toggle">
                    <button class="paid-btn ${isPaid ? 'active' : ''}" 
                            onclick="setPaymentStatus(${team.id}, true)">
                        ✓ Paid
                    </button>
                    <button class="unpaid-btn ${!isPaid ? 'active' : ''}" 
                            onclick="setPaymentStatus(${team.id}, false)">
                        Unpaid
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function setPaymentStatus(teamId, paid) {
    if (!TOURNAMENT_DATA.payments) TOURNAMENT_DATA.payments = {};
    
    TOURNAMENT_DATA.payments[teamId] = {
        paid: paid,
        amount: paid ? 1000 : 0,
        date: paid ? new Date().toISOString().split('T')[0] : null,
        method: 'venmo'
    };
    
    saveData();
    renderPaymentStatus();
    renderPaymentManagement();
    showToast(paid ? 'Payment recorded!' : 'Payment status updated', paid ? 'success' : 'info');
}

// ==================== Score Submission ====================
function initScoreForm() {
    populateTeamSelects();
    
    const form = document.getElementById('score-form');
    form.addEventListener('submit', handleScoreSubmit);
    
    // Set default date to today
    document.getElementById('match-date').valueAsDate = new Date();
    
    // Add listeners for points inputs
    const team1Input = document.getElementById('team1-points-input');
    const team2Input = document.getElementById('team2-points-input');
    
    team1Input.addEventListener('input', validateAndPreviewResult);
    team2Input.addEventListener('input', validateAndPreviewResult);
}

function validateAndPreviewResult() {
    const team1Points = parseFloat(document.getElementById('team1-points-input').value) || 0;
    const team2Points = parseFloat(document.getElementById('team2-points-input').value) || 0;
    const total = team1Points + team2Points;
    
    const totalDisplay = document.getElementById('total-display');
    const pointsTotal = document.getElementById('points-total');
    const submitBtn = document.getElementById('submit-btn');
    const resultPreview = document.getElementById('match-result-preview');
    const matchWinner = document.getElementById('match-winner');
    
    totalDisplay.textContent = total;
    
    // Validate total equals 20
    if (total === 20) {
        pointsTotal.classList.add('valid');
        pointsTotal.classList.remove('invalid');
        submitBtn.disabled = false;
        resultPreview.style.display = 'block';
        
        // Determine winner
        const team1Select = document.getElementById('team1');
        const team2Select = document.getElementById('team2');
        const team1Name = team1Select.options[team1Select.selectedIndex]?.text || 'Your Team';
        const team2Name = team2Select.options[team2Select.selectedIndex]?.text || 'Opponent';
        
        if (team1Points > team2Points) {
            matchWinner.textContent = team1Name + ' wins!';
        } else if (team2Points > team1Points) {
            matchWinner.textContent = team2Name + ' wins!';
        } else {
            matchWinner.textContent = 'Match tied!';
        }
    } else if (total > 0) {
        pointsTotal.classList.add('invalid');
        pointsTotal.classList.remove('valid');
        submitBtn.disabled = true;
        resultPreview.style.display = 'none';
    } else {
        pointsTotal.classList.remove('valid', 'invalid');
        submitBtn.disabled = true;
        resultPreview.style.display = 'none';
    }
}

function populateTeamSelects() {
    const team1Select = document.getElementById('team1');
    const team2Select = document.getElementById('team2');
    
    const options = TOURNAMENT_DATA.teams.map(team => 
        `<option value="${team.id}">${getTeamFullName(team.id)}</option>`
    ).join('');
    
    team1Select.innerHTML = '<option value="">Select your team...</option>' + options;
    team2Select.innerHTML = '<option value="">Select opponent...</option>' + options;
    
    // Update opponent options when team1 changes
    team1Select.addEventListener('change', () => {
        const team1Id = team1Select.value;
        const filteredOptions = TOURNAMENT_DATA.teams
            .filter(t => t.id !== parseInt(team1Id))
            .map(team => `<option value="${team.id}">${getTeamFullName(team.id)}</option>`)
            .join('');
        team2Select.innerHTML = '<option value="">Select opponent...</option>' + filteredOptions;
    });
}

// Hole-by-hole entry removed - using simplified points entry

function handleScoreSubmit(e) {
    e.preventDefault();
    
    const team1Id = parseInt(document.getElementById('team1').value);
    const team2Id = parseInt(document.getElementById('team2').value);
    const date = document.getElementById('match-date').value;
    
    if (!team1Id || !team2Id) {
        showToast('Please select both teams', 'error');
        return;
    }
    
    // Get points from simplified entry
    const team1Points = parseFloat(document.getElementById('team1-points-input').value) || 0;
    const team2Points = parseFloat(document.getElementById('team2-points-input').value) || 0;
    
    // Validate points total 20
    if (team1Points + team2Points !== 20) {
        showToast('Points must total 20', 'error');
        return;
    }
    
    const match = {
        id: Date.now(),
        date,
        team1Id,
        team2Id,
        course: 'Carolina Golf Club', // All matches at CGC
        team1Points,
        team2Points,
        winner: team1Points > team2Points ? team1Id : (team2Points > team1Points ? team2Id : null),
        verified: false, // Admin must verify
        submittedAt: new Date().toISOString()
    };
    
    TOURNAMENT_DATA.matches.push(match);
    saveData();
    
    showToast('Match submitted! Awaiting admin verification.', 'success');
    e.target.reset();
    document.getElementById('match-date').valueAsDate = new Date();
    
    // Reset the form
    document.getElementById('team1-points-input').value = '';
    document.getElementById('team2-points-input').value = '';
    document.getElementById('submit-btn').disabled = true;
    document.getElementById('match-result-preview').style.display = 'none';
    document.getElementById('points-total').classList.remove('valid', 'invalid');
    document.getElementById('total-display').textContent = '0';
}

// ==================== Schedule ====================
function initSchedule() {
    document.getElementById('schedule-flight').addEventListener('change', renderSchedule);
    document.getElementById('schedule-status').addEventListener('change', renderSchedule);
    renderSchedule();
}

function renderSchedule() {
    const flightFilter = document.getElementById('schedule-flight').value;
    const statusFilter = document.getElementById('schedule-status').value;
    const container = document.getElementById('schedule-container');
    
    // Generate all possible matches within each flight
    const allMatches = [];
    const flights = flightFilter === 'all' ? TOURNAMENT_DATA.flights : [flightFilter];
    
    flights.forEach(flight => {
        const flightTeams = TOURNAMENT_DATA.teams.filter(t => t.flight === flight);
        
        for (let i = 0; i < flightTeams.length; i++) {
            for (let j = i + 1; j < flightTeams.length; j++) {
                const team1 = flightTeams[i];
                const team2 = flightTeams[j];
                
                // Check if match exists
                const existingMatch = TOURNAMENT_DATA.matches.find(m => 
                    (m.team1Id === team1.id && m.team2Id === team2.id) ||
                    (m.team1Id === team2.id && m.team2Id === team1.id)
                );
                
                allMatches.push({
                    team1,
                    team2,
                    flight,
                    match: existingMatch,
                    status: existingMatch ? 'completed' : 'pending'
                });
            }
        }
    });
    
    // Filter by status
    const filtered = statusFilter === 'all' ? allMatches : 
        allMatches.filter(m => m.status === statusFilter);
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:2rem;color:#666">
                ${TOURNAMENT_DATA.teams.some(t => t.flight) ? 
                    'No matches found for this filter.' : 
                    'Flights have not been assigned yet. Check back after April 8!'}
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map(m => `
        <div class="match-card">
            <div class="match-teams">
                <span class="team-name">${getTeamName(m.team1.id)}</span>
                <span class="match-vs">vs</span>
                <span class="team-name">${getTeamName(m.team2.id)}</span>
            </div>
            <span class="flight-badge flight-${m.flight}">${capitalizeFirst(m.flight)}</span>
            ${m.match ? `
                <div>
                    <strong>${m.match.team1Points} - ${m.match.team2Points}</strong>
                    <br><small>${m.match.date} @ ${m.match.course}</small>
                </div>
            ` : ''}
            <span class="match-status status-${m.status}">${capitalizeFirst(m.status)}</span>
        </div>
    `).join('');
}

// ==================== Admin ====================
function initAdmin() {
    // Check if already logged in
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        showAdminContent();
    }
}

function checkAdminPassword() {
    const pass = document.getElementById('admin-pass').value;
    if (pass === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        showAdminContent();
    } else {
        showToast('Invalid password', 'error');
    }
}

function showAdminContent() {
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-content').style.display = 'block';
    renderPaymentManagement();
    renderFlightAssignment();
    renderPendingScores();
}

function renderFlightAssignment() {
    const container = document.getElementById('flight-assignment');
    
    container.innerHTML = TOURNAMENT_DATA.teams.map(team => `
        <div class="team-flight-row">
            <span>${getTeamFullName(team.id)}</span>
            <select id="flight-${team.id}" onchange="updateTeamFlight(${team.id}, this.value)">
                <option value="">Not Assigned</option>
                <option value="titleist" ${team.flight === 'titleist' ? 'selected' : ''}>Titleist</option>
                <option value="ping" ${team.flight === 'ping' ? 'selected' : ''}>Ping</option>
                <option value="taylormade" ${team.flight === 'taylormade' ? 'selected' : ''}>TaylorMade</option>
                <option value="callaway" ${team.flight === 'callaway' ? 'selected' : ''}>Callaway</option>
                <option value="pxg" ${team.flight === 'pxg' ? 'selected' : ''}>PXG</option>
            </select>
        </div>
    `).join('');
}

function updateTeamFlight(teamId, flight) {
    const team = TOURNAMENT_DATA.teams.find(t => t.id === teamId);
    if (team) {
        team.flight = flight || null;
    }
}

function saveFlightAssignments() {
    saveData();
    showToast('Flight assignments saved!', 'success');
    renderLeaderboard('all');
    renderSchedule();
}

function renderPendingScores() {
    const container = document.getElementById('pending-scores');
    const pending = TOURNAMENT_DATA.matches.filter(m => !m.verified);
    
    if (pending.length === 0) {
        container.innerHTML = '<p style="color:#666">No pending submissions.</p>';
        return;
    }
    
    container.innerHTML = pending.map(match => `
        <div class="match-card">
            <div>
                <strong>${getTeamName(match.team1Id)} vs ${getTeamName(match.team2Id)}</strong>
                <br>Score: ${match.team1Points} - ${match.team2Points}
                <br><small>${match.date} @ ${match.course}</small>
            </div>
            <div>
                <button class="admin-btn" onclick="verifyMatch(${match.id})">✓ Verify</button>
                <button class="admin-btn" style="background:#dc3545" onclick="rejectMatch(${match.id})">✗ Reject</button>
            </div>
        </div>
    `).join('');
}

function verifyMatch(matchId) {
    const match = TOURNAMENT_DATA.matches.find(m => m.id === matchId);
    if (match) {
        match.verified = true;
        saveData();
        calculateStandings();
        renderPendingScores();
        renderLeaderboard('all');
        showToast('Match verified!', 'success');
    }
}

function rejectMatch(matchId) {
    TOURNAMENT_DATA.matches = TOURNAMENT_DATA.matches.filter(m => m.id !== matchId);
    saveData();
    renderPendingScores();
    showToast('Match rejected', 'error');
}

function generateWeeklyUpdate() {
    calculateStandings();
    
    let output = `🏌️ THE SUMMER LONG HAZEL - WEEKLY UPDATE\n`;
    output += `📅 ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n\n`;
    
    TOURNAMENT_DATA.flights.forEach(flight => {
        const flightTeams = TOURNAMENT_DATA.teams
            .filter(t => t.flight === flight)
            .map(t => ({ ...t, ...TOURNAMENT_DATA.standings[t.id] }))
            .sort((a, b) => b.pointsFor - a.pointsFor);
        
        if (flightTeams.length === 0) return;
        
        output += `\n📊 ${flight.toUpperCase()} FLIGHT\n`;
        output += `${'─'.repeat(40)}\n`;
        
        flightTeams.forEach((team, idx) => {
            output += `${idx + 1}. ${getTeamName(team.id).padEnd(20)} ${team.wins}-${team.losses}-${team.ties} (${team.pointsFor} pts)\n`;
        });
    });
    
    // Recent matches
    const recentMatches = TOURNAMENT_DATA.matches
        .filter(m => m.verified)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    
    if (recentMatches.length > 0) {
        output += `\n\n🎯 RECENT RESULTS\n`;
        output += `${'─'.repeat(40)}\n`;
        
        recentMatches.forEach(m => {
            const winner = m.winner ? getTeamName(m.winner) : 'TIE';
            output += `${m.date}: ${getTeamName(m.team1Id)} vs ${getTeamName(m.team2Id)} - ${m.team1Points}-${m.team2Points} (${winner})\n`;
        });
    }
    
    output += `\n\nFairways and Greens! ⛳`;
    
    document.getElementById('weekly-update-output').innerHTML = `
        <textarea style="width:100%;height:300px;font-family:monospace;padding:1rem;margin-top:1rem">${output}</textarea>
        <button class="admin-btn" onclick="copyToClipboard(this.previousElementSibling.value)">Copy to Clipboard</button>
    `;
}

function exportData(format) {
    if (format === 'json') {
        const blob = new Blob([JSON.stringify(TOURNAMENT_DATA, null, 2)], { type: 'application/json' });
        downloadBlob(blob, 'summer-long-hazel.json');
    } else if (format === 'csv') {
        let csv = 'Team,Player 1,Player 2,Flight,Wins,Losses,Ties,Points For,Points Against,Matches Played\n';
        TOURNAMENT_DATA.teams.forEach(team => {
            const s = TOURNAMENT_DATA.standings[team.id];
            csv += `"${getTeamName(team.id)}","${team.player1}","${team.player2}","${team.flight || ''}",${s.wins},${s.losses},${s.ties},${s.pointsFor},${s.pointsAgainst},${s.matchesPlayed}\n`;
        });
        const blob = new Blob([csv], { type: 'text/csv' });
        downloadBlob(blob, 'summer-long-hazel.csv');
    }
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// ==================== Utilities ====================
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    });
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
