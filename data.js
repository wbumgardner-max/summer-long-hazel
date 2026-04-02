// Summer Long Hazel Tournament Data
// Last updated: 2026-03-28

const TOURNAMENT_DATA = {
    name: "The Summer Long Hazel",
    season: {
        start: "2026-04-15",
        end: "2026-09-07"  // Labor Day
    },
    buyIn: 500,
    lastPlacePenalty: 250,
    pointsPerMatch: 20,  // 18 holes + 2 bonus for winner
    
    // Venmo settings
    venmo: {
        username: "@SummerLongHazel",
        note: "Summer Long Hazel - [Your Team Name]"
    },
    
    // Payment tracking
    payments: {
        // teamId: { paid: true/false, amount: 1000, date: "2026-04-01", method: "venmo" }
    },
    
    // All participants
    players: [
        { name: "Locke Page", email: "lockepage1@yahoo.com" },
        { name: "Tyler Gibson", email: "jtylergibson@yahoo.com" },
        { name: "Michael Catanese", email: "michael@parkcre.com" },
        { name: "Greg Childress", email: "gdchildress@yahoo.com" },
        { name: "Justin Gough", email: "justin.p.gough@gmail.com" },
        { name: "Jason Boulware", email: "boulware.jason@gmail.com" },
        { name: "Rolfe Hughes", email: "rolfehughes@hotmail.com" },
        { name: "Paul Uher", email: "puher@yahoo.com" },
        { name: "Lee Froneberger", email: "lfroneberger@1asmc.com" },
        { name: "Wade Connor", email: "wadeconnor@gmail.com" },
        { name: "Bo South", email: "bsouth@myers-chapman.com" },
        { name: "Mike Goldman", email: "mikewgoldman@yahoo.com" },
        { name: "Wallace Whitlock", email: "WallaceWhitlock@gmail.com" },
        { name: "Carter Sorrell", email: "cartersorrell@mac.com" },
        { name: "Tommy Truman", email: "tommy.truman@ampf.com" },
        { name: "William Smith", email: "willy1smith@yahoo.com" },
        { name: "Steve Harry", email: "steveharry111@gmail.com" },
        { name: "Kyle Bumgardner", email: "kylebumgardner@gmail.com" },
        { name: "Tripp Beacham", email: "tbeacham@bbm-arch.com" },
        { name: "Jimmy Warren", email: "jwarren@warcoconstruction.com" },
        { name: "Erik Wallace", email: "ecwallace9@gmail.com" },
        { name: "Ted Haley", email: "ted.c.haley@gmail.com" },
        { name: "Will Lively", email: "Jwill.lively@gmail.com" },
        { name: "Andrew Payne", email: "andrewpayne4@gmail.com" },
        { name: "Cam Payne", email: "camerondpayne@gmail.com" },
        { name: "Jason Kenna", email: "jkenna@heedesoutheast.com" },
        { name: "Charles Jonas", email: "charles.jonas@icloud.com" },
        { name: "Mark Holoman", email: "mholoman@gmail.com" },
        { name: "Jeff Jones", email: "jeffdjones55@gmail.com" },
        { name: "Michael Hodge", email: "hmlhodge@gmail.com" }
    ],
    
    // Teams (15 total)
    teams: [
        { id: 1, player1: "Locke Page", player2: "Tyler Gibson", flight: null },
        { id: 2, player1: "Michael Catanese", player2: "Greg Childress", flight: null },
        { id: 3, player1: "Justin Gough", player2: "Jason Boulware", flight: null },
        { id: 4, player1: "Rolfe Hughes", player2: "Paul Uher", flight: null },
        { id: 5, player1: "Lee Froneberger", player2: "Wade Connor", flight: null },
        { id: 6, player1: "Bo South", player2: "Mike Goldman", flight: null },
        { id: 7, player1: "Wallace Whitlock", player2: "Carter Sorrell", flight: null },
        { id: 8, player1: "Tommy Truman", player2: "William Smith", flight: null },
        { id: 9, player1: "Steve Harry", player2: "Kyle Bumgardner", flight: null },
        { id: 10, player1: "Tripp Beacham", player2: "Jimmy Warren", flight: null },
        { id: 11, player1: "Erik Wallace", player2: "Ted Haley", flight: null },
        { id: 12, player1: "Will Lively", player2: "Andrew Payne", flight: null },
        { id: 13, player1: "Cam Payne", player2: "Jason Kenna", flight: null },
        { id: 14, player1: "Charles Jonas", player2: "Mark Holoman", flight: null },
        { id: 15, player1: "Jeff Jones", player2: "Michael Hodge", flight: null }
    ],
    
    flights: ["titleist", "ping", "taylormade", "callaway"],
    
    // Match results (populated as games are played)
    matches: [
        // Example match structure:
        // {
        //     id: 1,
        //     date: "2026-04-20",
        //     team1Id: 1,
        //     team2Id: 2,
        //     course: "Quail Hollow",
        //     holes: [1, 2, 0, 1, 2, 1, 0, 1, 2, 1, 1, 2, 0, 1, 1, 2, 1, 0], // 1=team1 wins hole, 2=team2, 0=tie
        //     team1Points: 11,
        //     team2Points: 9,
        //     winner: 1, // team1Id, or null for tie
        //     verified: true
        // }
    ],
    
    // Team standings (calculated from matches)
    standings: {}
};

// Admin password (in production, this would be server-side)
const ADMIN_PASSWORD = "hazel2026";

// Initialize standings
function initializeStandings() {
    TOURNAMENT_DATA.teams.forEach(team => {
        TOURNAMENT_DATA.standings[team.id] = {
            teamId: team.id,
            wins: 0,
            losses: 0,
            ties: 0,
            pointsFor: 0,
            pointsAgainst: 0,
            matchesPlayed: 0
        };
    });
}

// Calculate standings from matches
function calculateStandings() {
    initializeStandings();
    
    TOURNAMENT_DATA.matches.forEach(match => {
        if (!match.verified) return;
        
        const s1 = TOURNAMENT_DATA.standings[match.team1Id];
        const s2 = TOURNAMENT_DATA.standings[match.team2Id];
        
        s1.matchesPlayed++;
        s2.matchesPlayed++;
        
        s1.pointsFor += match.team1Points;
        s1.pointsAgainst += match.team2Points;
        s2.pointsFor += match.team2Points;
        s2.pointsAgainst += match.team1Points;
        
        if (match.team1Points > match.team2Points) {
            s1.wins++;
            s2.losses++;
        } else if (match.team2Points > match.team1Points) {
            s2.wins++;
            s1.losses++;
        } else {
            s1.ties++;
            s2.ties++;
        }
    });
}

// Get team by ID
function getTeam(teamId) {
    return TOURNAMENT_DATA.teams.find(t => t.id === teamId);
}

// Get team display name
function getTeamName(teamId) {
    const team = getTeam(teamId);
    if (!team) return "Unknown";
    return `${team.player1.split(' ')[1]} / ${team.player2.split(' ')[1]}`;
}

// Get full team display name
function getTeamFullName(teamId) {
    const team = getTeam(teamId);
    if (!team) return "Unknown";
    return `${team.player1} & ${team.player2}`;
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('summerLongHazel', JSON.stringify(TOURNAMENT_DATA));
}

// Load data from localStorage
function loadData() {
    const saved = localStorage.getItem('summerLongHazel');
    if (saved) {
        const parsed = JSON.parse(saved);
        // Merge saved data
        TOURNAMENT_DATA.teams = parsed.teams || TOURNAMENT_DATA.teams;
        TOURNAMENT_DATA.matches = parsed.matches || [];
        TOURNAMENT_DATA.payments = parsed.payments || {};
        TOURNAMENT_DATA.venmo = parsed.venmo || TOURNAMENT_DATA.venmo;
        calculateStandings();
    }
}

// Initialize
loadData();
calculateStandings();
