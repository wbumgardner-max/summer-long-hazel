// Summer Long Hazel Tournament Data
// Last updated: 2026-03-28

const DATA_VERSION = 5;

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
        { name: "Wade Connor", email: "Wadeconnor@gmail.com" },
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
        { name: "Michael Hodge", email: "hmlhodge@gmail.com" },
        { name: "Nick Van Stratt", email: "nvanstratt@gmail.com" },
        { name: "Fred Matulli", email: "fred.matrulli@gmail.com" },
        { name: "Mitch Hodgkiss", email: "mitch.hodgkiss@ampf.com" },
        { name: "John (JJ) Jarrett", email: "jon@jbenjaminjarrett.com" },
        { name: "Sean Preston", email: "sean.preston25@yahoo.com" },
        { name: "Jim McDermott", email: "Jim.McDermott@firstcitizens.com" },
        { name: "John Reilly", email: "johnj.reilly1967@yahoo.com" },
        { name: "John Reilly Jr.", email: "jreilly96@gmail.com" },
        { name: "Mike Grippo", email: "mikegrippo@gmail.com" },
        { name: "John Fulton", email: "Fultonjohna3@gmail.com" },
        { name: "Chris Miller", email: "chrism284@gmail.com" },
        { name: "Sean Snell", email: "Ssnell@lockton.com" },
        { name: "Mike Kemmet", email: "Mike.Kemmet@cbre.com" },
        { name: "Beau Wilder", email: "beau@wilderlawgroup.com" },
        { name: "Sheldon Hilaire", email: "sheldonhilaire@yahoo.com" },
        { name: "Drew Mansfield", email: "dmansfield@vinmar.com" },
        { name: "Ben Johnson", email: "benejohnsonjr@gmail.com" },
        { name: "Kevin Blocker", email: "Kevin.Blocker@gmail.com" },
        { name: "Christian ciciarelli", email: "pcciciarelli@gmail.com" },
        { name: "Chris Drake", email: "cddrake7@gmail.com" },
        { name: "Jef Pearce", email: "jef.pearce@gmail.com" },
        { name: "Trent Haston", email: "trent.haston@andrewroby.com" },
        { name: "Bryan Boyd", email: "bboyd432@gmail.com" },
        { name: "AJ Hunter", email: "ajhunter512@gmail.com" },
        { name: "Kevin Cella", email: "crcella@gmail.com" },
        { name: "Adam Ackerman", email: "Ackerman131@yahoo.com" },
        { name: "Jack Willen", email: "jackwillen@gmail.com" },
        { name: "Ben Huckaby", email: "b.huck11@gmail.com" },
        { name: "Ken Doty", email: "ksdoty@yahoo.com" },
        { name: "Adam Greene", email: "adam.greene.uva@gmail.com" },
        { name: "Andrew Rowl", email: "leerowl@outlook.com" },
        { name: "Jon Visconti", email: "jjvisco@gmail.com" }
    ],
    
    // Teams (31 total)
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
        { id: 15, player1: "Jeff Jones", player2: "Michael Hodge", flight: null },
        { id: 16, player1: "Nick Van Stratt", player2: "Fred Matulli", flight: null },
        { id: 17, player1: "Mitch Hodgkiss", player2: "John (JJ) Jarrett", flight: null },
        { id: 18, player1: "Sean Preston", player2: "Jim McDermott", flight: null },
        { id: 19, player1: "John Reilly", player2: "John Reilly Jr.", flight: null },
        { id: 20, player1: "Mike Grippo", player2: "John Fulton", flight: null },
        { id: 21, player1: "Chris Miller", player2: "Sean Snell", flight: null },
        { id: 22, player1: "Mike Kemmet", player2: "Beau Wilder", flight: null },
        { id: 23, player1: "Sheldon Hilaire", player2: "Drew Mansfield", flight: null },
        { id: 24, player1: "Ben Johnson", player2: "Kevin Blocker", flight: null },
        { id: 25, player1: "Christian ciciarelli", player2: "Chris Drake", flight: null },
        { id: 26, player1: "Jef Pearce", player2: "Trent Haston", flight: null },
        { id: 27, player1: "Bryan Boyd", player2: "AJ Hunter", flight: null },
        { id: 28, player1: "Kevin Cella", player2: "Adam Ackerman", flight: null },
        { id: 29, player1: "Jack Willen", player2: "Ben Huckaby", flight: null },
        { id: 30, player1: "Ken Doty", player2: "Adam Greene", flight: null },
        { id: 31, player1: "Andrew Rowl", player2: "Jon Visconti", flight: null }
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
    const payload = {
        version: DATA_VERSION,
        teams: TOURNAMENT_DATA.teams,
        matches: TOURNAMENT_DATA.matches,
        payments: TOURNAMENT_DATA.payments,
        venmo: TOURNAMENT_DATA.venmo
    };
    localStorage.setItem('summerLongHazel', JSON.stringify(payload));
}

// Load data from localStorage
function loadData() {
    const saved = localStorage.getItem('summerLongHazel');
    if (saved) {
        const parsed = JSON.parse(saved);

        const savedVersion = parsed.version || 1;

        if (savedVersion < DATA_VERSION) {
            localStorage.removeItem('summerLongHazel');
            localStorage.removeItem('summerLongHazelVersion');
            return;
        }

        // Safety valve: if an old payload somehow survives without the full spreadsheet team list,
        // discard it and fall back to the shipped dataset.
        if (Array.isArray(parsed.teams) && parsed.teams.length < TOURNAMENT_DATA.teams.length) {
            localStorage.removeItem('summerLongHazel');
            localStorage.removeItem('summerLongHazelVersion');
            return;
        }

        // Keep canonical teams from the shipped dataset so new spreadsheet adds always show up.
        // Only merge user-generated state from local storage.
        TOURNAMENT_DATA.matches = parsed.matches || [];
        TOURNAMENT_DATA.payments = parsed.payments || {};
        TOURNAMENT_DATA.venmo = parsed.venmo || TOURNAMENT_DATA.venmo;
        calculateStandings();
    }
}

// Initialize
loadData();
calculateStandings();
