/**
 * LUNAR MOD - AI Gaming Universe
 * Enhanced script with improved animations and interactions
 */

// Game state
const gameState = {
    // Player/Agent state
    agent: {
        name: 'Nova',
        location: 'Aetherion',
        level: 1,
        experience: 0,
        abilities: {
            scanning: 1,
            mining: 1,
            combat: 1,
            exploration: 1
        },
        customized: false,
        skin: 'default'
    },
    // Resources
    resources: {
        stardust: 0,
        plasma: 0,
        darkMatter: 0,
        quasarCrystals: 0,
        voidEssence: 0,
        nebulaFlux: 0,
        nebulaCurrency: 0
    },
    // Planet data
    planets: {
        'Aetherion': {
            visited: true,
            hazardLevel: 20,
            factionControl: 50,
            resourceRates: {
                stardust: 10,
                plasma: 3
            },
            anomalyActivity: 'Low',
            enemies: false,
            weather: 'Ion Storm',
            relicsDiscovered: 0
        },
        'Vortexia': {
            visited: false,
            hazardLevel: 35,
            factionControl: 40,
            resourceRates: {
                plasma: 8,
                darkMatter: 4
            },
            anomalyActivity: 'Medium',
            enemies: false,
            weather: 'Clear Skies',
            relicsDiscovered: 0
        },
        'Stellaris': {
            visited: false,
            hazardLevel: 50,
            factionControl: 30,
            resourceRates: {
                darkMatter: 6,
                quasarCrystals: 3
            },
            anomalyActivity: 'High',
            enemies: false,
            weather: 'Meteor Shower',
            relicsDiscovered: 0
        },
        'Nebulon': {
            visited: false,
            hazardLevel: 60,
            factionControl: 20,
            resourceRates: {
                quasarCrystals: 5,
                voidEssence: 2
            },
            anomalyActivity: 'Very High',
            enemies: false,
            weather: 'Clear Skies',
            relicsDiscovered: 0
        },
        'Cryon': {
            visited: false,
            hazardLevel: 75,
            factionControl: 10,
            resourceRates: {
                voidEssence: 4,
                nebulaFlux: 2
            },
            anomalyActivity: 'Extreme',
            enemies: false,
            weather: 'Cryonic Blizzard',
            relicsDiscovered: 0
        },
        'Umbra': {
            visited: false,
            hazardLevel: 90,
            factionControl: 5,
            resourceRates: {
                nebulaFlux: 3,
                stardust: 7
            },
            anomalyActivity: 'Unknown',
            enemies: false,
            weather: 'Clear Skies',
            relicsDiscovered: 0
        }
    },
    // Missions
    missions: {
        active: [
            {
                id: 1,
                title: 'Mine 100 Stardust on Aetherion',
                planet: 'Aetherion',
                progress: 0,
                target: 100,
                reward: 50,
                type: 'mining',
                completed: false
            },
            {
                id: 2,
                title: 'Defeat Hostile AI on Vortexia',
                planet: 'Vortexia',
                progress: 0,
                target: 1,
                reward: 75,
                type: 'combat',
                completed: false
            },
            {
                id: 3,
                title: 'Establish Outpost on Umbra',
                planet: 'Umbra',
                progress: 0,
                target: 1,
                reward: 100,
                type: 'exploration',
                completed: false
            }
        ],
        completed: 5,
        total: 10
    },
    // Faction info
    faction: {
        name: 'Cosmic Explorers',
        joined: false,
        standing: 0,
        controlledPlanets: 3,
        totalPlanets: 6,
        resourcesContributed: 0,
        nextEvent: 180 // in minutes
    },
    // Game progress
    progress: {
        planetsVisited: 1,
        relicsFound: 0,
        anomaliesScanned: 0,
        challengeProgress: 0,
        researchProgress: 0,
        dailyQuestProgress: 0
    },
    // Market data
    market: {
        trends: {
            stardust: 5,
            plasma: -2,
            darkMatter: 10,
            quasarCrystals: 0,
            voidEssence: 3,
            nebulaFlux: -5
        },
        conversionRates: {
            stardust: 0.5,
            plasma: 1,
            darkMatter: 2,
            quasarCrystals: 3,
            voidEssence: 5,
            nebulaFlux: 8
        }
    },
    // Game status
    status: {
        walletConnected: false,
        walletPublicKey: null,
        enemiesDefeated: 0,
        lootCratesOpened: 0,
        dailyQuestCompleted: false,
        factionWarActive: false,
        factionWarPoints: 0,
        outpostsSupported: 0
    }
};

// DOM elements
const domElements = {
    // Agent activity/navigation
    activityLog: document.getElementById('activityLog'),
    missionStatus: document.getElementById('missionStatus'),
    eventNotification: document.getElementById('eventNotification'),
    planetaryMap: document.getElementById('planetaryMap'),
    
    // Resource counters
    nebulaBalance: document.getElementById('nebulaBalance'),
    stardustCount: document.getElementById('stardustCount'),
    plasmaCount: document.getElementById('plasmaCount'),
    darkMatterCount: document.getElementById('darkMatterCount'),
    quasarCrystalsCount: document.getElementById('quasarCrystalsCount'),
    voidEssenceCount: document.getElementById('voidEssenceCount'),
    nebulaFluxCount: document.getElementById('nebulaFluxCount'),
    
    // Planet info
    selectedPlanet: document.getElementById('selectedPlanet'),
    planetResources: document.getElementById('planetResources'),
    anomalyActivity: document.getElementById('anomalyActivity'),
    hazardProgress: document.getElementById('hazardProgress'),
    factionProgress: document.getElementById('factionProgress'),
    
    // Progress trackers
    planetsVisited: document.getElementById('planetsVisited'),
    relicsFound: document.getElementById('relicsFound'),
    anomaliesScanned: document.getElementById('anomaliesScanned'),
    
    // Mission progress
    missionProgress1: document.getElementById('missionProgress1'),
    missionProgress2: document.getElementById('missionProgress2'),
    missionProgress3: document.getElementById('missionProgress3'),
    challengeProgress: document.getElementById('challengeProgress'),
    researchProgress: document.getElementById('researchProgress'),
    
    // UI containers
    modalContainer: document.getElementById('modal-container'),
    notificationContainer: document.getElementById('notification-container'),

    // Agent positions on planets
    agentAetherion: document.getElementById('agentAetherion'),
    agentVortexia: document.getElementById('agentVortexia'),
    agentStellaris: document.getElementById('agentStellaris'),
    agentNebulon: document.getElementById('agentNebulon'),
    agentCryon: document.getElementById('agentCryon'),
    agentUmbra: document.getElementById('agentUmbra'),
    
    // Wallet buttons
    connectWallet: document.getElementById('connectWallet'),
    depositNebula: document.getElementById('depositNebula'),
    withdrawNebula: document.getElementById('withdrawNebula'),
    customizeAgent: document.getElementById('customizeAgent'),
    
    // Market
    marketStatus: document.getElementById('marketStatus'),
    
    // Loot crate
    lootCrate: document.getElementById('lootCrate')
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initGame();
});

function initGame() {
    // Create cosmic background
    createStarField();
    
    // Show initial agent position
    updateAgentPosition();
    
    // Update UI elements with initial data
    updateResourceDisplay();
    updatePlanetInfo();
    updateMissionProgress();
    updateExplorationStats();
    
    // Start game loops
    startResourceCollection();
    startEnemySpawning();
    startMarketUpdates();
    startBackgroundAnimations();
    
    // Show welcome notification
    showNotification('Welcome to LUNAR MOD!', 'discovery');
    
    // Add event listeners for buttons and interactions
    setupEventListeners();
    
    // Log first entry
    logActivity(`${gameState.agent.name} is exploring Aetherion.`);
    
    // Initialize tooltips
    initializeTooltips();
    
    // Update market display
    updateMarketDisplay();
    
    // Animate dashboard sections
    animateDashboards();
    
    // Initialize audio system
    initializeAudio();
}

// Background star field creation
function createStarField() {
    const starsContainer = document.querySelector('.stars');
    
    // Create stars
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random star size
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random position
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        
        // Random delay for twinkle animation
        star.style.animationDelay = Math.random() * 3 + 's';
        
        starsContainer.appendChild(star);
    }
    
    // Create occasional comets
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every interval
            const comet = document.createElement('div');
            comet.className = 'comet';
            comet.style.left = Math.random() * 100 + 'vw';
            comet.style.top = Math.random() * 100 + 'vh';
            
            starsContainer.appendChild(comet);
            
            // Remove comet after animation completes
            setTimeout(() => {
                comet.remove();
            }, 10000);
        }
    }, 8000);
}

// Add nebula effects
function addNebulaEffects() {
    const nebulaGlow = document.querySelector('.nebula-glow');
    if (nebulaGlow) {
        // Alternate nebula colors
        setInterval(() => {
            const colors = [
                'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.05), transparent 40%), radial-gradient(circle at 80% 40%, rgba(255, 255, 255, 0.07), transparent 60%)',
                'radial-gradient(circle at 30% 60%, rgba(255, 255, 255, 0.05), transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.07), transparent 55%)',
                'radial-gradient(circle at 40% 50%, rgba(255, 255, 255, 0.04), transparent 45%), radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.06), transparent 50%)'
            ];
            
            nebulaGlow.style.background = colors[Math.floor(Math.random() * colors.length)];
        }, 10000);
    }
}

// Start background animations
function startBackgroundAnimations() {
    // Animate galaxy swirl
    const galaxySwirl = document.querySelector('.galaxy-swirl');
    if (galaxySwirl) {
        setInterval(() => {
            galaxySwirl.style.transform = `rotate(${Math.random() * 10 - 5}deg) scale(${1 + Math.random() * 0.1})`;
        }, 10000);
    }
    
    // Add nebula effects
    addNebulaEffects();
}

// Animate dashboard sections with staggered entrance
function animateDashboards() {
    const dashboards = document.querySelectorAll('.dashboard-section');
    
    dashboards.forEach((dashboard, index) => {
        setTimeout(() => {
            dashboard.style.animation = `fadeIn 0.8s forwards`;
        }, 100 * index);
    });
}

// Initialize audio effects
function initializeAudio() {
    // Create audio context (will be initialized on first user interaction)
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    
    // Audio will be initialized on first click
    document.body.addEventListener('click', initAudioOnFirstInteraction, { once: true });
}

// Initialize audio on first interaction
function initAudioOnFirstInteraction() {
    const audioContext = new AudioContext();
    
    // Store audio context for later use
    window.gameAudioContext = audioContext;
    
    // Create sound effects
    createSoundEffects(audioContext);
}

// Create sound effects
function createSoundEffects(audioContext) {
    // Collection of sound effects
    window.soundEffects = {
        collectResource: createCollectResourceSound(audioContext),
        buttonClick: createButtonClickSound(audioContext),
        enemyDefeat: createEnemyDefeatSound(audioContext),
        notification: createNotificationSound(audioContext),
        teleport: createTeleportSound(audioContext)
    };
}

// Create collect resource sound
function createCollectResourceSound(audioContext) {
    return function() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
    };
}

// Create button click sound
function createButtonClickSound(audioContext) {
    return function() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    };
}

// Create enemy defeat sound
function createEnemyDefeatSound(audioContext) {
    return function() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(110, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.4);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.4);
    };
}

// Create notification sound
function createNotificationSound(audioContext) {
    return function() {
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator1.type = 'sine';
        oscillator1.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator1.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        
        oscillator2.type = 'sine';
        oscillator2.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2); // E5
        oscillator2.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.3); // G5
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.4);
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator1.start();
        oscillator1.stop(audioContext.currentTime + 0.2);
        
        oscillator2.start(audioContext.currentTime + 0.2);
        oscillator2.stop(audioContext.currentTime + 0.4);
    };
}

// Create teleport sound
function createTeleportSound(audioContext) {
    return function() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.4);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    };
}

// Setup event listeners
function setupEventListeners() {
    // Connect wallet button
    if (domElements.connectWallet) {
        domElements.connectWallet.addEventListener('click', handleConnectWallet);
    }
    
    // Deposit and withdraw NEBULA buttons
    if (domElements.depositNebula) {
        domElements.depositNebula.addEventListener('click', handleDepositNebula);
    }
    
    if (domElements.withdrawNebula) {
        domElements.withdrawNebula.addEventListener('click', handleWithdrawNebula);
    }
    
    // Customize agent button
    if (domElements.customizeAgent) {
        domElements.customizeAgent.addEventListener('click', handleCustomizeAgent);
    }
    
    // Add click sound to all action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (window.soundEffects && window.soundEffects.buttonClick) {
                window.soundEffects.buttonClick();
            }
        });
    });
}

// Initialize tooltips
function initializeTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        // Dynamically update tooltips for planets
        if (tooltip.closest('.planet')) {
            const planetName = tooltip.closest('.planet').classList[1];
            const tooltipData = getTooltipDataForPlanet(planetName);
            tooltip.setAttribute('data-tooltip', tooltipData);
        }
    });
}

// Get tooltip data for a planet
function getTooltipDataForPlanet(planetName) {
    const tooltipData = {
        'aetherion': 'Aetherion: Rich in Stardust and Plasma. Temperature: -50°C to 30°C',
        'vortexia': 'Vortexia: Rich in Plasma and Dark Matter. Gravity: 1.2G',
        'stellaris': 'Stellaris: Rich in Dark Matter and Quasar Crystals. Atmosphere: Helium-Methane',
        'nebulon': 'Nebulon: Rich in Quasar Crystals and Void Essence. Biohazard Level: High',
        'cryon': 'Cryon: Rich in Void Essence and Nebula Flux. Temperature: -170°C',
        'umbra': 'Umbra: Rich in Nebula Flux and Stardust. Atmosphere: None'
    };
    
    return tooltipData[planetName] || `Planet: ${planetName}`;
}

// Agent movement
function moveAgent(planetName) {
    // Only move if it's a new planet
    if (gameState.agent.location === planetName) {
        showNotification(`Already on ${planetName}`, 'info');
        return;
    }
    
    const previousPlanet = gameState.agent.location;
    
    // Update agent location
    gameState.agent.location = planetName;
    
    // Mark planet as visited
    if (!gameState.planets[planetName].visited) {
        gameState.planets[planetName].visited = true;
        gameState.progress.planetsVisited++;
        updateExplorationStats();
        playDiscoveryEffect(planetName);
        showNotification(`New planet discovered: ${planetName}!`, 'discovery');
        
        // Award experience for discovering new planet
        gainExperience(25);
    }
    
    // Update agent position visually
    updateAgentPosition();
    
    // Update UI
    updatePlanetInfo();
    
    // Show movement effect
    showAgentTeleportEffect(planetName);
    
    // Draw animated path between planets
    drawPathBetweenPlanets(previousPlanet, planetName);
    
    // Log activity
    logActivity(`${gameState.agent.name} is now exploring ${planetName}.`);
    
    // Update mission status
    domElements.missionStatus.textContent = `Mission: Exploring ${planetName}`;
    
    // Check for related mission progress
    checkMissionProgress();
    
    // Random chance to spawn enemy
    if (Math.random() > 0.7) {
        spawnEnemy(planetName);
    }
    
    // Apply selected planet highlighting
    document.querySelectorAll('.planet').forEach(p => {
        p.classList.remove('selected');
    });
    const planetElement = document.querySelector(`.planet.${planetName.toLowerCase()}`);
    if (planetElement) {
        planetElement.classList.add('selected');
    }
    
    // Play teleport/travel sound if available
    if (window.soundEffects && window.soundEffects.teleport) {
        window.soundEffects.teleport();
    }
}

function updateAgentPosition() {
    // Hide agent on all planets
    document.querySelectorAll('.agent-icon').forEach(icon => {
        if (icon) {
            icon.style.display = 'none';
        }
    });
    
    // Show agent on current planet
    const currentAgentElement = document.getElementById(`agent${gameState.agent.location}`);
    if (currentAgentElement) {
        currentAgentElement.style.display = 'block';
    }
}

function showAgentTeleportEffect(planetName) {
    const agentElement = document.getElementById(`agent${planetName}`);
    if (agentElement) {
        // Add teleport animation class
        agentElement.classList.add('agent-teleport');
        
        // Remove animation class after it completes
        setTimeout(() => {
            agentElement.classList.remove('agent-teleport');
        }, 1000);
    }
}

// Play discovery effect for new planet
function playDiscoveryEffect(planet) {
    const planetElement = document.querySelector(`.planet.${planet.toLowerCase()}`);
    if (!planetElement) return;
    
    // Create expanding ring effect
    for (let i = 0; i < 3; i++) {
        const ring = document.createElement('div');
        ring.classList.add('discovery-ring');
        
        // Set ring position and delay
        ring.style.animationDelay = `${i * 0.2}s`;
        
        planetElement.appendChild(ring);
        
        // Remove ring after animation completes
        setTimeout(() => {
            ring.remove();
        }, 2000);
    }
}

// Draw animated path between planets
function drawPathBetweenPlanets(fromPlanet, toPlanet) {
    const fromElement = document.querySelector(`.planet.${fromPlanet.toLowerCase()}`);
    const toElement = document.querySelector(`.planet.${toPlanet.toLowerCase()}`);
    
    if (!fromElement || !toElement) return;
    
    const fromRect = fromElement.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();
    const gameCenter = document.querySelector('.game-center');
    
    if (!gameCenter) return;
    
    const gameRect = gameCenter.getBoundingClientRect();

    const fromX = fromRect.left + (fromRect.width / 2) - gameRect.left;
    const fromY = fromRect.top + (fromRect.height / 2) - gameRect.top;
    const toX = toRect.left + (toRect.width / 2) - gameRect.left;
    const toY = toRect.top + (toRect.height / 2) - gameRect.top;

    const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
    const angle = Math.atan2(toY - fromY, toX - fromX) * (180 / Math.PI);

    // Create path with animation
    const path = document.createElement('div');
    path.classList.add('path-line');
    path.style.width = `${length}px`;
    path.style.height = '3px';
    path.style.left = `${fromX}px`;
    path.style.top = `${fromY}px`;
    path.style.transform = `rotate(${angle}deg)`;
    path.style.transformOrigin = '0 0';
    
    gameCenter.appendChild(path);

    // Create small particles along the path
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.classList.add('path-particle');
            
            // Position particle at the start
            particle.style.left = `${fromX}px`;
            particle.style.top = `${fromY}px`;
            
            gameCenter.appendChild(particle);
            
            // Animate particle along the path
            setTimeout(() => {
                particle.style.left = `${toX}px`;
                particle.style.top = `${toY}px`;
            }, 10);
            
            // Remove particle when animation completes
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }, i * 200);
    }

    // Remove path after animation completes
    setTimeout(() => {
        path.remove();
    }, 2000);
}

// Check related mission progress
function checkMissionProgress() {
    const currentPlanet = gameState.agent.location;
    
    gameState.missions.active.forEach(mission => {
        if (mission.planet === currentPlanet && !mission.completed) {
            if (mission.type === 'exploration') {
                updateMissionProgress(mission.id, 25);
            }
        }
    });
}

// Spawn enemy with animation
function spawnEnemy(planet) {
    const enemyIcon = document.getElementById(`enemy${planet}`);
    if (!enemyIcon) return;
    
    // Don't spawn if there's already an enemy
    if (gameState.planets[planet].enemies) return;
    
    // Mark planet as having enemies
    gameState.planets[planet].enemies = true;
    
    // Show enemy with spawn animation
    enemyIcon.style.display = 'block';
    
    // Create spawn effect
    const enemySpawn = document.createElement('div');
    enemySpawn.classList.add('enemy-spawn');
    
    const planetElement = document.querySelector(`.planet.${planet.toLowerCase()}`);
    if (planetElement) {
        planetElement.appendChild(enemySpawn);
        
        // Remove spawn effect after animation
        setTimeout(() => {
            enemySpawn.remove();
        }, 1000);
    }
    
    // Log activity
    logActivity(`Hostile AI detected on ${planet}!`);
    
    // Show alert notification
    showNotification(`⚠️ Hostile AI detected on ${planet}!`, 'warning');
}

// Start enemy spawning loop
function startEnemySpawning() {
    setInterval(() => {
        const planets = Object.keys(gameState.planets);
        const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
        
        // 10% chance to spawn an enemy on a random planet
        if (Math.random() < 0.1 && !gameState.planets[randomPlanet].enemies) {
            spawnEnemy(randomPlanet);
        }
    }, 60000);
}

// Resource collection
function collectResources() {
    const currentPlanet = gameState.agent.location;
    const planetData = gameState.planets[currentPlanet];
    
    // Check resources available on the planet
    const availableResources = Object.keys(planetData.resourceRates);
    
    if (availableResources.length === 0) {
        showNotification('No resources available on this planet', 'warning');
        return;
    }
    
    // Calculate resource gain with planet-specific bonuses
    let totalResourceMessage = '';
    
    // Weather effects
    let weatherMultiplier = 1;
    const isStorm = planetData.weather.includes('Storm') || planetData.weather.includes('Shower') || planetData.weather.includes('Blizzard');
    if (isStorm) {
        weatherMultiplier = 0.7;
        logActivity(`Storm reduced resource gain on ${currentPlanet}.`);
    }
    
    // Apply agent level bonus
    const levelMultiplier = 1 + (gameState.agent.level * 0.1);
    
    // For each resource type on the planet
    availableResources.forEach(resource => {
        const baseAmount = planetData.resourceRates[resource];
        const amount = Math.floor(baseAmount * weatherMultiplier * levelMultiplier);
        
        // Add to player inventory
        gameState.resources[resource] += amount;
        
        // Add to collection message
        if (totalResourceMessage) {
            totalResourceMessage += `, ${amount} ${resource}`;
        } else {
            totalResourceMessage = `Collected ${amount} ${resource}`;
        }
        
        // Check for stardust mission progress
        if (resource === 'stardust' && currentPlanet === 'Aetherion') {
            updateMissionProgress(1, amount);
        }
    });
    
    // Show resource collection effect
    showResourceCollectionEffect();
    
    // Update resource display
    updateResourceDisplay();
    
    // Show notification
    showNotification(totalResourceMessage, 'success');
    
    // Log activity
    logActivity(totalResourceMessage + ` on ${currentPlanet}.`);
    
    // Update daily quest progress
    gameState.progress.dailyQuestProgress += Math.floor(availableResources.length * 5);
    updateDailyQuestProgress();
    
    // Award experience
    gainExperience(availableResources.length * 5);
    
    // Play collection sound
    if (window.soundEffects && window.soundEffects.collectResource) {
        window.soundEffects.collectResource();
    }
}

function collectResource(type, amount) {
    // Check if player is on the correct planet
    if (type === 'stardust' && gameState.agent.location === 'Aetherion') {
        updateMissionProgress(1, amount);
    }
    
    // Apply level bonus
    amount = Math.floor(amount * (1 + gameState.agent.level * 0.1));
    
    // Add to player inventory
    gameState.resources[type] += amount;
    
    // Update resource display
    updateResourceDisplay();
    
    // Show resource collection effect
    showResourceBeamEffect(event);
    
    // Show notification
    showNotification(`Collected ${amount} ${type.replace(/([A-Z])/g, ' $1').trim()}!`, 'success');
    
    // Log activity
    logActivity(`${gameState.agent.name} extracted ${amount} ${type.replace(/([A-Z])/g, ' $1').trim()} from ${gameState.agent.location}.`);
    
    // Award experience
    gainExperience(amount);
    
    // Play sound effect
    if (window.soundEffects && window.soundEffects.collectResource) {
        window.soundEffects.collectResource();
    }
}

function showResourceCollectionEffect() {
    const planetElement = document.querySelector(`.planet.${gameState.agent.location.toLowerCase()}`);
    if (!planetElement) return;
    
    // Create sparkle effects
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Random position within the planet
            const rect = planetElement.getBoundingClientRect();
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            
            planetElement.appendChild(sparkle);
            
            // Remove sparkle after animation completes
            setTimeout(() => {
                sparkle.remove();
            }, 1500);
        }, i * 100);
    }
}

function showResourceBeamEffect(event) {
    if (!event) return;
    
    const beam = document.createElement('div');
    beam.className = 'resource-beam';
    
    // Get the clicked element's position
    const target = event.currentTarget || event.target;
    const rect = target.getBoundingClientRect();
    
    // Position the beam
    beam.style.left = `${rect.left + rect.width/2}px`;
    beam.style.top = `${rect.top + rect.height/2}px`;
    
    document.body.appendChild(beam);
    
    // Create sparkles at the beam end
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Random position near the beam
            sparkle.style.left = `${rect.left + rect.width/2 + (Math.random() * 20 - 10)}px`;
            sparkle.style.top = `${rect.top + rect.height/2 - Math.random() * 50}px`;
            
            document.body.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                sparkle.remove();
            }, 1500);
        }, i * 100);
    }
    
    // Remove beam after animation
    setTimeout(() => {
        beam.remove();
    }, 1000);
}

// Start resource collection loop
function startResourceCollection() {
    // Passive resource collection
    setInterval(() => {
        // Only collect from visited planets
        Object.keys(gameState.planets).forEach(planet => {
            if (gameState.planets[planet].visited) {
                const resourceRates = gameState.planets[planet].resourceRates;
                
                // Small passive collection from visited planets
                Object.keys(resourceRates).forEach(resource => {
                    const passiveRate = Math.max(1, Math.floor(resourceRates[resource] * 0.1));
                    gameState.resources[resource] += passiveRate;
                });
            }
        });
        
        // Update UI
        updateResourceDisplay();
    }, 30000);
}

// Update resource display
function updateResourceDisplay() {
    // Update resource counters
    for (const resource in gameState.resources) {
        const element = document.getElementById(`${resource}Count`);
        if (element) {
            element.textContent = `${resource.replace(/([A-Z])/g, ' $1').trim()}: ${gameState.resources[resource]}`;
            
            // Apply glow effect based on quantity
            applyResourceGlowEffect(element, gameState.resources[resource]);
        }
    }
    
    // Update NEBULA balance
    if (domElements.nebulaBalance) {
        domElements.nebulaBalance.textContent = `${gameState.resources.nebulaCurrency} $LUNAR`;
    }
}

// Apply glow effect to resource elements based on quantity
function applyResourceGlowEffect(element, quantity) {
    // Remove existing glow classes
    element.classList.remove('low-glow', 'medium-glow', 'high-glow');
    
    // Add appropriate glow class
    if (quantity > 50) {
        element.classList.add('high-glow');
    } else if (quantity > 20) {
        element.classList.add('medium-glow');
    } else if (quantity > 0) {
        element.classList.add('low-glow');
    }
}

// Update planet info
function updatePlanetInfo() {
    const currentPlanet = gameState.agent.location;
    const planetData = gameState.planets[currentPlanet];
    
    // Update selected planet
    if (domElements.selectedPlanet) {
        domElements.selectedPlanet.textContent = `Selected Planet: ${currentPlanet}`;
    }
    
    // Update resources info
    if (domElements.planetResources) {
        const resourceRates = planetData.resourceRates;
        let resourcesText = 'Resources: ';
        
        Object.keys(resourceRates).forEach((resource, index) => {
            if (index > 0) resourcesText += ', ';
            resourcesText += `${resource.replace(/([A-Z])/g, ' $1').trim()} ${resourceRates[resource]}/s`;
        });
        
        domElements.planetResources.textContent = resourcesText;
    }
    
    // Update anomaly activity
    if (domElements.anomalyActivity) {
        domElements.anomalyActivity.textContent = `Anomaly Activity: ${planetData.anomalyActivity}`;
    }
    
    // Update hazard level
    if (domElements.hazardProgress) {
        domElements.hazardProgress.style.width = `${planetData.hazardLevel}%`;
    }
    
    // Update faction control
    if (domElements.factionProgress) {
        domElements.factionProgress.style.width = `${planetData.factionControl}%`;
    }
}

// Update mission progress
function updateMissionProgress(missionId, amount = 0) {
    // For specific mission updates
    if (missionId > 0) {
        const mission = gameState.missions.active.find(m => m.id === missionId);
        if (!mission) return;
        
        // Update progress
        mission.progress = Math.min(mission.progress + amount, mission.target);
        
        // Update progress bar
        const progressBar = document.getElementById(`missionProgress${missionId}`);
        if (progressBar) {
            const percentage = (mission.progress / mission.target) * 100;
            progressBar.style.width = `${percentage}%`;
        }
        
        // Check for completion
        if (mission.progress >= mission.target && !mission.completed) {
            mission.completed = true;
            
            // Add reward
            gameState.resources.nebulaCurrency += mission.reward;
            
            // Log completion
            logActivity(`Mission Completed: ${mission.title}! Earned ${mission.reward} $LUNAR.`);
            
            // Show notification
            showNotification(`🎯 Mission Complete! +${mission.reward} $LUNAR`, 'success');
            
            // Award experience
            gainExperience(50);
            
            // Reset progress bar (will be replaced with a new mission)
            if (progressBar) {
                progressBar.style.width = '0%';
            }
            
            // Update resource display
            updateResourceDisplay();
        }
    } else {
        // Update all mission progress bars
        gameState.missions.active.forEach(mission => {
            const progressBar = document.getElementById(`missionProgress${mission.id}`);
            if (progressBar) {
                const percentage = (mission.progress / mission.target) * 100;
                progressBar.style.width = `${percentage}%`;
            }
        });
    }
}

// Update exploration stats
function updateExplorationStats() {
    // Count visited planets
    const visitedPlanets = Object.keys(gameState.planets).filter(planet => 
        gameState.planets[planet].visited
    ).length;
    
    // Update DOM elements
    if (domElements.planetsVisited) {
        domElements.planetsVisited.textContent = visitedPlanets;
    }
    
    if (domElements.relicsFound) {
        domElements.relicsFound.textContent = gameState.progress.relicsFound;
    }
    
    if (domElements.anomaliesScanned) {
        domElements.anomaliesScanned.textContent = gameState.progress.anomaliesScanned;
    }
}

// Update daily quest progress
function updateDailyQuestProgress() {
    if (domElements.challengeProgress) {
        // Max daily quest progress is 100
        gameState.progress.dailyQuestProgress = Math.min(gameState.progress.dailyQuestProgress, 100);
        
        // Update challenge progress bar
        domElements.challengeProgress.style.width = `${gameState.progress.dailyQuestProgress}%`;
        
        // Check if daily quest is completed
        if (gameState.progress.dailyQuestProgress >= 100 && !gameState.status.dailyQuestCompleted) {
            // Mark as completed
            gameState.status.dailyQuestCompleted = true;
            
            // Add reward
            gameState.resources.nebulaCurrency += 25;
            
            // Log completion
            logActivity('Daily Quest Completed! Earned 25 $LUNAR!');
            
            // Show quest completion notification
            showNotification('🎯 Daily Quest Complete! +25 $LUNAR', 'success');
            
            // Award experience
            gainExperience(100);
            
            // Reset progress
            gameState.progress.dailyQuestProgress = 0;
            domElements.challengeProgress.style.width = '0%';
            
            // Reset completion status after a day
            setTimeout(() => {
                gameState.status.dailyQuestCompleted = false;
            }, 24 * 60 * 60 * 1000);
            
            // Update resources
            updateResourceDisplay();
        }
    }
}

// Start market updates
function startMarketUpdates() {
    updateMarketDisplay();
    
    // Update market every 30 seconds
    setInterval(() => {
        // Random market fluctuations
        for (const resource in gameState.market.trends) {
            // Random change between -5 and +5
            const change = Math.floor(Math.random() * 11) - 5;
            gameState.market.trends[resource] += change;
            
            // Keep within reasonable bounds
            if (gameState.market.trends[resource] > 20) {
                gameState.market.trends[resource] = 20;
            } else if (gameState.market.trends[resource] < -20) {
                gameState.market.trends[resource] = -20;
            }
        }
        
        updateMarketDisplay();
    }, 30000);
}

// Update market display
function updateMarketDisplay() {
    if (domElements.marketStatus) {
        let marketText = 'Market:';
        
        // Show top 3 market trends
        const trends = Object.entries(gameState.market.trends)
            .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
            .slice(0, 3);
        
        trends.forEach((trend, index) => {
            const [resource, value] = trend;
            const sign = value >= 0 ? '+' : '';
            marketText += ` ${resource.replace(/([A-Z])/g, ' $1').trim()} ${sign}${value}%`;
            if (index < trends.length - 1) {
                marketText += ' |';
            }
        });
        
        domElements.marketStatus.textContent = marketText;
        
        // Add animation class
        domElements.marketStatus.classList.add('market-update');
        setTimeout(() => {
            domElements.marketStatus.classList.remove('market-update');
        }, 1000);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('game-notification', `notification-${type}`);
    notification.textContent = message;
    
    // Add to notification container
    if (domElements.notificationContainer) {
        domElements.notificationContainer.appendChild(notification);
    } else {
        document.body.appendChild(notification);
    }
    
    // Animate notification entrance
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Play notification sound if available
    if (window.soundEffects && window.soundEffects.notification) {
        window.soundEffects.notification();
    }
    
    // Remove notification after display time
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
        
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Log activity
function logActivity(message) {
    if (!domElements.activityLog) return;
    
    // Create log entry element
    const logEntry = document.createElement('p');
    logEntry.classList.add('log-entry');
    
    // Format timestamp
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // Set log entry content
    logEntry.innerHTML = `<span class="log-time">${timestamp}</span> ${message}`;
    
    // Add to activity log
    domElements.activityLog.insertBefore(logEntry, domElements.activityLog.firstChild);
    
    // Limit number of entries
    if (domElements.activityLog.children.length > 8) {
        domElements.activityLog.lastChild.remove();
    }
}

// Show modal
function showModal(title, content, buttons = []) {
    if (!domElements.modalContainer) return;
    
    // Create modal element
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    // Create modal title
    const modalTitle = document.createElement('div');
    modalTitle.classList.add('modal-title');
    modalTitle.innerHTML = `
        <span>${title}</span>
        <button class="modal-close">&times;</button>
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.innerHTML = content;
    
    // Create modal actions
    const modalActions = document.createElement('div');
    modalActions.classList.add('modal-actions');
    
    // Add buttons
    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.classList.add('action-btn');
        if (button.primary) btn.classList.add('primary-btn');
        btn.textContent = button.text;
        btn.addEventListener('click', () => {
            if (button.action) button.action();
            closeModal();
        });
        modalActions.appendChild(btn);
    });
    
    // Assemble modal
    modal.appendChild(modalTitle);
    modal.appendChild(modalContent);
    modal.appendChild(modalActions);
    
    // Add modal to container
    domElements.modalContainer.innerHTML = '';
    domElements.modalContainer.appendChild(modal);
    
    // Show modal container
    domElements.modalContainer.classList.remove('hidden');
    domElements.modalContainer.classList.add('show');
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Add event listener to close button
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Add event listener to close on backdrop click
    domElements.modalContainer.addEventListener('click', function(event) {
        if (event.target === domElements.modalContainer) {
            closeModal();
        }
    });
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('show');
    }
    
    setTimeout(() => {
        if (domElements.modalContainer) {
            domElements.modalContainer.classList.remove('show');
            domElements.modalContainer.classList.add('hidden');
        }
    }, 300);
}

// Modal functions for dashboard sections
function showInventoryModal() {
    showModal('Inventory', `
        <div class="inventory-grid">
            <div class="inventory-category">
                <p class="category-title">Equipment</p>
                <p>Quantum Scanner: 1</p>
                <p>Energy Core: 2</p>
                <p>Plasma Shield: 1</p>
            </div>
            <div class="inventory-category">
                <p class="category-title">Artifacts</p>
                <p>Void Shard: +5% Anomaly Rewards</p>
                <p>Gear: Standard Suit</p>
            </div>
        </div>
        <div class="crafting-queue">
            <p class="category-title">Crafting Queue</p>
            <p>Warp Drive (ETA: 5 mins)</p>
            <p>Nebula Blaster (ETA: 10 mins)</p>
        </div>
        <div class="dashboard-actions">
            <button class="action-btn" onclick="craftItem()">
                <i class="fas fa-hammer"></i> Craft Item
            </button>
            <button class="action-btn" onclick="upgradeGear()">
                <i class="fas fa-tshirt"></i> Upgrade Gear
            </button>
        </div>
    `, [
        { text: 'Close', action: closeModal }
    ]);
}

function showGalacticEventsModal() {
    showModal('Galactic Events', `
        <div class="event-alert">
            <p class="event-name">Nebula Storm Incoming!</p>
            <p class="event-timer">Time Left: <span class="countdown">02:45:30</span></p>
        </div>
        <div class="event-details">
            <p>Effects: Resource Production +20%</p>
            <p>Anomaly Tracker: 3 Active</p>
            <p>Event History: Dark Matter Surge</p>
        </div>
        <div class="dashboard-actions">
            <button class="action-btn" onclick="prepareForEvent()">
                <i class="fas fa-shield-alt"></i> Prepare
            </button>
            <button class="action-btn" onclick="decryptSignal()">
                <i class="fas fa-satellite-dish"></i> Decrypt
            </button>
        </div>
    `, [
        { text: 'Close', action: closeModal }
    ]);
}

function showResearchLabModal() {
    showModal('Research Lab', `
        <p>Current Research: Resource Efficiency</p>
        <div class="stat-bar-container">
            <p>Progress:</p>
            <div class="progress-bar">
                <div class="progress" id="modalResearchProgress" style="width: ${document.getElementById('researchProgress')?.style.width || '0%'};"></div>
            </div>
        </div>
        <div class="research-options">
            <p class="category-title">Available Technologies:</p>
            <p>Quantum Mining: 500 Stardust</p>
            <p>Void Scanner: 200 Plasma</p>
        </div>
        <div class="dashboard-actions">
            <button class="action-btn" onclick="startResearch(); closeModal();">
                <i class="fas fa-atom"></i> Start Research
            </button>
        </div>
    `, [
        { text: 'Close', action: closeModal }
    ]);
}

function showExplorationLogsModal() {
    showModal('Exploration Logs', `
        <div class="exploration-stats">
            <p>Planets Visited: <span>${document.getElementById('planetsVisited')?.textContent || '1'}</span></p>
            <p>Relics Found: <span>${document.getElementById('relicsFound')?.textContent || '0'}</span></p>
            <p>Anomalies Scanned: <span>${document.getElementById('anomaliesScanned')?.textContent || '0'}</span></p>
        </div>
        <div class="recent-logs">
            <p class="category-title">Recent Activity:</p>
            <p>Aetherion scanned.</p>
            <p>Discovered cosmic relic on Stellaris.</p>
            <p>Explored anomaly in Vortexia.</p>
            <p>Defeated hostile AI on Nebulon.</p>
        </div>
    `, [
        { text: 'Close', action: closeModal }
    ]);
}

function showTradingPostModal() {
    showModal('Trading Post', `
        <div class="trading-info">
            <p>Trader: Quasar Merchant</p>
            <p>Offer: 100 Stardust for 50 $LUNAR</p>
            <p>Rare Item: Nebula Core (200 $LUNAR)</p>
            <p>Trade Cooldown: <span class="countdown">00:30:00</span></p>
        </div>
        <div class="dashboard-actions">
            <button class="action-btn" onclick="tradeResources(); closeModal();">
                <i class="fas fa-exchange-alt"></i> Trade
            </button>
            <button class="action-btn" onclick="buyRareItem(); closeModal();">
                <i class="fas fa-shopping-cart"></i> Buy Item
            </button>
        </div>
    `, [
        { text: 'Close', action: closeModal }
    ]);
}

// Gain experience and handle level ups
function gainExperience(amount) {
    const prevLevel = gameState.agent.level;
    
    // Add experience
    gameState.agent.experience += amount;
    
    // Calculate level based on experience (simple formula)
    const newLevel = Math.floor(1 + Math.sqrt(gameState.agent.experience / 100));
    
    // Check for level up
    if (newLevel > prevLevel) {
        gameState.agent.level = newLevel;
        handleLevelUp(newLevel);
    }
}

// Handle level up
function handleLevelUp(newLevel) {
    // Show level up notification
    showNotification(`⬆️ Level Up! Agent Level ${newLevel} Reached!`, 'success');
    
    // Log level up
    logActivity(`Reached Agent Level ${newLevel}! Resource efficiency increased by ${newLevel * 5}%.`);
}

// Discover relic
function discoverRelic(planet) {
    if (planet !== gameState.agent.location) return;
    
    gameState.progress.relicsFound++;
    gameState.planets[planet].relicsDiscovered++;
    
    // Relic bonuses
    const bonuses = ['+10% Resource Gain', 'Faster Agent Movement', 'Unlock Agent Skin'];
    const bonus = bonuses[Math.floor(Math.random() * bonuses.length)];
    
    // Log discovery
    logActivity(`Discovered a Cosmic Relic on ${planet}! Bonus: ${bonus}`);
    updateExplorationStats();
    
    // Show discovery notification
    showNotification(`🏆 Discovered Cosmic Relic! ${bonus}`, 'discovery');
    
    // Apply effects if agent skin
    if (bonus === 'Unlock Agent Skin') {
        gameState.agent.skin = 'cosmic';
        document.querySelectorAll('.agent-icon').forEach(icon => {
            icon.style.background = 'radial-gradient(circle, #ffffff, #a0a0a0)';
            icon.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.8)';
        });
    }
    
    // Create relic discovery effect
    const planetElement = document.querySelector(`.planet.${planet.toLowerCase()}`);
    if (planetElement) {
        // Create discovery burst
        const burst = document.createElement('div');
        burst.classList.add('discovery-ring');
        planetElement.appendChild(burst);
        
        // Remove after animation
        setTimeout(() => {
            burst.remove();
        }, 2000);
    }
    
    // Award experience
    gainExperience(50);
}

// Check weather
function checkWeather(planet) {
    if (planet !== gameState.agent.location) return;
    
    const weather = gameState.planets[planet].weather;
    const isStorm = weather.includes('Storm') || weather.includes('Shower') || weather.includes('Blizzard');
    const weatherType = isStorm ? `${weather} - Reduced resources` : `${weather} - Optimal conditions`;
    
    logActivity(`Weather on ${planet}: ${weatherType}`);
    
    // Show weather notification
    showNotification(`🌡️ ${planet} Weather: ${weatherType}`, isStorm ? 'warning' : 'info');
}

// Fight enemy
function fightEnemy(planet) {
    if (planet !== gameState.agent.location) return;
    
    // Check if there's an enemy on this planet
    if (!gameState.planets[planet].enemies) return;
    
    const enemyIcon = document.getElementById(`enemy${planet}`);
    if (!enemyIcon || enemyIcon.style.display === 'none') return;
    
    // Hide enemy with defeat animation
    enemyIcon.classList.add('enemy-defeated');
    
    // Create defeat effect
    const defeatEffect = document.createElement('div');
    defeatEffect.classList.add('enemy-defeat-effect');
    
    const planetElement = document.querySelector(`.planet.${planet.toLowerCase()}`);
    if (planetElement) {
        planetElement.appendChild(defeatEffect);
    }
    
    // Remove enemy and effect after animation
    setTimeout(() => {
        enemyIcon.style.display = 'none';
        enemyIcon.classList.remove('enemy-defeated');
        defeatEffect.remove();
        
        // Mark planet as not having enemies
        gameState.planets[planet].enemies = false;
    }, 1000);
    
    // Increment counter and update mission
    gameState.status.enemiesDefeated++;
    logActivity(`Defeated Hostile AI on ${planet}.`);
    
    // Update mission progress for combat mission
    if (planet === 'Vortexia') {
        updateMissionProgress(2, 1);
    }
    
    // Award experience
    gainExperience(30);
    
    // Show defeat notification
    showNotification(`⚔️ Enemy Defeated!`, 'success');
    
    // Play enemy defeat sound
    if (window.soundEffects && window.soundEffects.enemyDefeat) {
        window.soundEffects.enemyDefeat();
    }
}

// Explore anomaly
function exploreAnomaly(planet) {
    if (!planet) planet = gameState.agent.location;
    if (planet !== gameState.agent.location) return;
    
    if (gameState.resources.nebulaCurrency < 10) {
        logActivity('Insufficient $LUNAR to explore anomaly (10 required).');
        showNotification('❌ Insufficient $LUNAR (10 required)', 'error');
        return;
    }
    
    // Spend NEBULA
    gameState.resources.nebulaCurrency -= 10;
    updateResourceDisplay();
    
    // Create anomaly effect
    const anomalyElement = document.getElementById(`anomaly${planet}`);
    if (anomalyElement) {
        const planetElement = document.querySelector(`.planet.${planet.toLowerCase()}`);
        if (planetElement) {
            // Create visual effect
            const anomalyEffect = document.createElement('div');
            anomalyEffect.classList.add('discovery-ring');
            planetElement.appendChild(anomalyEffect);
            
            // Remove effect after animation
            setTimeout(() => {
                anomalyEffect.remove();
            }, 2000);
        }
    }
    
    // Increment counter
    gameState.progress.anomaliesScanned++;
    updateExplorationStats();
    
    // Random rewards
    const rewards = [
        { type: 'resource', resource: 'stardust', amount: Math.floor(Math.random() * 30) + 20 },
        { type: 'resource', resource: 'plasma', amount: Math.floor(Math.random() * 20) + 10 },
        { type: 'resource', resource: 'darkMatter', amount: Math.floor(Math.random() * 15) + 5 },
        { type: 'xp', amount: Math.floor(Math.random() * 50) + 25 }
    ];
    
    // Select random reward
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    
    // Apply reward
    if (reward.type === 'resource') {
        gameState.resources[reward.resource] += reward.amount;
        logActivity(`Anomaly explored! Found ${reward.amount} ${reward.resource.replace(/([A-Z])/g, ' $1').trim()}.`);
        showNotification(`🌀 Anomaly Explored! +${reward.amount} ${reward.resource.replace(/([A-Z])/g, ' $1').trim()}`, 'discovery');
    } else if (reward.type === 'xp') {
        gainExperience(reward.amount);
        logActivity(`Anomaly explored! Gained valuable knowledge (${reward.amount} XP).`);
        showNotification(`🌀 Anomaly Explored! +${reward.amount} XP`, 'discovery');
    }
    
    updateResourceDisplay();
}

// Support outpost
function supportOutpost(planet) {
    if (planet !== gameState.agent.location) return;
    
    if (gameState.resources.nebulaCurrency < 15) {
        logActivity('Insufficient $LUNAR to support outpost (15 required).');
        showNotification('❌ Insufficient $LUNAR (15 required)', 'error');
        return;
    }
    
    // Spend NEBULA
    gameState.resources.nebulaCurrency -= 15;
    updateResourceDisplay();
    
    gameState.status.outpostsSupported++;
    
    // Create support visual effect
    const outpostElement = document.getElementById(`outpost${planet}`);
    if (outpostElement) {
        const planetElement = document.querySelector(`.planet.${planet.toLowerCase()}`);
        if (planetElement) {
            // Create pulsing effect
            const supportEffect = document.createElement('div');
            supportEffect.classList.add('discovery-ring');
            planetElement.appendChild(supportEffect);
            
            // Remove effect after animation
            setTimeout(() => {
                supportEffect.remove();
            }, 2000);
        }
    }
    
    logActivity(`Supported faction outpost on ${planet}.`);
    
    // Increase faction control
    gameState.planets[planet].factionControl = Math.min(gameState.planets[planet].factionControl + 10, 100);
    if (domElements.factionProgress) {
        domElements.factionProgress.style.width = `${gameState.planets[planet].factionControl}%`;
    }
    
    // Update mission progress for Umbra outpost mission
    if (planet === 'Umbra') {
        updateMissionProgress(3, 1);
    }
    
    // Show notification
    showNotification(`🏗️ Outpost Supported on ${planet}!`, 'success');
    
    // Award experience
    gainExperience(20);
}

// Loot crate
function lootCrate() {
    if (gameState.resources.nebulaCurrency < 50) {
        logActivity('Insufficient $LUNAR to open Loot Crate (50 required).');
        showNotification('❌ Insufficient $LUNAR (50 required)', 'error');
        return;
    }
    
    // Spend NEBULA
    gameState.resources.nebulaCurrency -= 50;
    updateResourceDisplay();
    
    // Animate loot crate
    if (domElements.lootCrate) {
        domElements.lootCrate.classList.add('opening');
        
        // Reset animation after completion
        setTimeout(() => {
            domElements.lootCrate.classList.remove('opening');
        }, 1500);
    }
    
    // Random loot
    const lootTables = [
        { type: 'resource', resource: 'stardust', amount: Math.floor(Math.random() * 50) + 50 },
        { type: 'resource', resource: 'plasma', amount: Math.floor(Math.random() * 30) + 30 },
        { type: 'resource', resource: 'darkMatter', amount: Math.floor(Math.random() * 20) + 20 }
    ];
    
    // Select random loot
    const loot = lootTables[Math.floor(Math.random() * lootTables.length)];
    
    // Apply loot
    if (loot.type === 'resource') {
        gameState.resources[loot.resource] += loot.amount;
        logActivity(`Loot Crate opened! Found ${loot.amount} ${loot.resource.replace(/([A-Z])/g, ' $1').trim()}.`);
        showNotification(`📦 Loot Crate: +${loot.amount} ${loot.resource.replace(/([A-Z])/g, ' $1').trim()}`, 'discovery');
    }
    
    updateResourceDisplay();
    
    // Award experience
    gainExperience(20);
    
    // Increment counter
    gameState.status.lootCratesOpened++;
}

// Start daily quest 
function startDailyQuest() { 
    if (gameState.status.dailyQuestCompleted) { 
        logActivity('Daily quest already completed. New quest available tomorrow.'); 
        showNotification('Daily quest already completed today.', 'info'); 
        return; 
    } 
    
    logActivity('Started daily quest: Collect resources or defeat enemies.'); 
    showNotification('🎯 Daily Quest Started!', 'info');
    
    // Initial progress update
    if (domElements.challengeProgress) {
        domElements.challengeProgress.style.width = `${gameState.progress.dailyQuestProgress}%`;
    }
}

// Join faction war
function joinFactionWar() {
    if (gameState.resources.nebulaCurrency < 50) {
        logActivity('Insufficient $LUNAR to join faction war (50 required).');
        showNotification('❌ Insufficient $LUNAR (50 required)', 'error');
        return;
    }
    
    // Spend NEBULA
    gameState.resources.nebulaCurrency -= 50;
    updateResourceDisplay();
    
    // Set faction war status
    gameState.status.factionWarActive = true;
    
    logActivity('Joined the faction war on the Explorers side!');
    showNotification('⚔️ Joined Faction War!', 'warning');
    
    // Award experience
    gainExperience(25);
}

// Support faction
function supportFaction() {
    if (gameState.resources.nebulaCurrency < 25) {
        logActivity('Insufficient $LUNAR to support faction (25 required).');
        showNotification('❌ Insufficient $LUNAR (25 required)', 'error');
        return;
    }
    
    // Spend NEBULA
    gameState.resources.nebulaCurrency -= 25;
    updateResourceDisplay();
    
    // Increase faction standing
    gameState.faction.standing = Math.min(gameState.faction.standing + 15, 100);
    
    logActivity('Supported Explorers faction. Faction reputation increased.');
    
    // Show support notification
    showNotification('🏳️ Supported Explorers Faction!', 'success');
    
    // Award experience
    gainExperience(15);
}

// Upgrade agent
function upgradeAgent() {
    if (gameState.resources.stardust < 100) {
        logActivity('Insufficient Stardust to upgrade agent (100 required).');
        showNotification('❌ Insufficient Stardust (100 required)', 'error');
        return;
    }
    
    // Spend resources
    gameState.resources.stardust -= 100;
    updateResourceDisplay();
    
    // Increase agent abilities randomly
    const abilities = ['scanning', 'mining', 'combat', 'exploration'];
    const randomAbility = abilities[Math.floor(Math.random() * abilities.length)];
    
    gameState.agent.abilities[randomAbility]++;
    
    logActivity(`Agent upgraded! ${randomAbility.charAt(0).toUpperCase() + randomAbility.slice(1)} ability increased to level ${gameState.agent.abilities[randomAbility]}.`);
    
    // Show upgrade notification
    showNotification(`⬆️ Agent Upgraded! ${randomAbility.charAt(0).toUpperCase() + randomAbility.slice(1)} +1`, 'success');
    
    // Award experience
    gainExperience(25);
}

// Scan planet
function scanPlanet() {
    if (gameState.resources.nebulaCurrency < 10) {
        logActivity('Insufficient $LUNAR to scan planet (10 required).');
        showNotification('❌ Insufficient $LUNAR (10 required)', 'error');
        return;
    }
    
    // Spend NEBULA
    gameState.resources.nebulaCurrency -= 10;
    updateResourceDisplay();
    
    // Create scan effect on planet
    const planetElement = document.querySelector(`.planet.${gameState.agent.location.toLowerCase()}`);
    if (planetElement) {
        const scanEffect = document.createElement('div');
        scanEffect.classList.add('discovery-ring');
        planetElement.appendChild(scanEffect);
        
        // Remove effect after animation
        setTimeout(() => {
            scanEffect.remove();
        }, 2000);
    }
    
    // Increase anomaly detection chance temporarily
    const anomalyElement = document.getElementById(`anomaly${gameState.agent.location}`);
    if (anomalyElement) {
        anomalyElement.style.display = 'block';
        
        // Hide after some time
        setTimeout(() => {
            anomalyElement.style.display = 'none';
        }, 30000);
    }
    
    // Log scan
    logActivity(`Planet scan complete. Detected resources on ${gameState.agent.location}.`);
    
    // Show scan notification
    showNotification(`🔍 Scan Complete: Resources Detected`, 'info');
    
    // Award experience
    gainExperience(15);
}

// Challenge leader
function challengeLeader() {
    if (gameState.resources.nebulaCurrency < 50) {
        logActivity('Insufficient $LUNAR to challenge leader (50 required).');
        showNotification('❌ Insufficient $LUNAR (50 required)', 'error');
        return;
    }
    
    // Spend NEBULA
    gameState.resources.nebulaCurrency -= 50;
    updateResourceDisplay();
    
    // Random success chance based on agent level
    const successChance = 0.3 + (gameState.agent.level * 0.05);
    const success = Math.random() < successChance;
    
    if (success) {
        // Challenge successful
        logActivity('Challenge successful! You defeated the leader and gained 100 $LUNAR!');
        showNotification('🏆 Challenge Victory! +100 $LUNAR', 'success');
        
        // Award reward
        gameState.resources.nebulaCurrency += 100;
        updateResourceDisplay();
        
        // Award experience
        gainExperience(100);
    } else {
        // Challenge failed
        logActivity('Challenge failed! The leader was too strong.');
        showNotification('❌ Challenge Failed!', 'error');
        
        // Award experience anyway for trying
        gainExperience(25);
    }
}

// Refresh leaderboard
function refreshLeaderboard() {
    // Generate random competitors
    const competitors = [
        { name: 'Astra', resources: Math.floor(Math.random() * 1000) + 1000 },
        { name: 'Zenith', resources: Math.floor(Math.random() * 800) + 800 },
        { name: 'Lyra', resources: Math.floor(Math.random() * 900) + 700 }
    ];
    
    // Total player resources
    const playerTotal = Object.values(gameState.resources).reduce((sum, value) => sum + value, 0);
    
    // Add player
    const allCompetitors = [...competitors, { name: gameState.agent.name, resources: playerTotal }];
    
    // Sort competitors
    allCompetitors.sort((a, b) => b.resources - a.resources);
    
    // Generate leaderboard HTML
    const leaderboardEntries = document.getElementById('leaderboardEntries');
    if (leaderboardEntries) {
        let html = '';
        allCompetitors.forEach((competitor, index) => {
            const isPlayer = competitor.name === gameState.agent.name;
            html += `<p${isPlayer ? ' class="player-rank"' : ''}>${index + 1}. ${competitor.name}: ${competitor.resources.toLocaleString()} Resources</p>`;
        });
        
        leaderboardEntries.innerHTML = html;
    }
    
    logActivity('Leaderboard refreshed.');
    
    // Show refresh notification
    showNotification('🔄 Leaderboard Refreshed', 'info');
}

// Join faction
function joinFaction() {
    if (gameState.faction.joined) {
        logActivity('Already a member of the Cosmic Explorers faction.');
        showNotification('Already a faction member', 'info');
        return;
    }
    
    gameState.faction.joined = true;
    logActivity('Joined Cosmic Explorers faction.');
    showNotification('🏳️ Joined Cosmic Explorers Faction!', 'success');
    
    // Award experience
    gainExperience(50);
}

// Donate resources
function donateResources() {
    if (gameState.resources.stardust < 200) {
        logActivity('Insufficient Stardust to donate (200 required).');
        showNotification('❌ Insufficient Stardust (200 required)', 'error');
        return;
    }
    
    gameState.resources.stardust -= 200;
    gameState.faction.resourcesContributed += 200;
    
    logActivity('Donated 200 Stardust to faction.');
    updateResourceDisplay();
    
    // Small NEBULA reward
    gameState.resources.nebulaCurrency += 20;
    
    showNotification('🏳️ Donated 200 Stardust to Faction! +20 $LUNAR', 'success');
    
    // Award experience
    gainExperience(30);
}

// Start faction war
function startFactionWar() {
    if (!gameState.faction.joined) {
        logActivity('You must join a faction first.');
        showNotification('❌ Not a faction member', 'error');
        return;
    }
    
    if (gameState.resources.nebulaCurrency < 100) {
        logActivity('Insufficient $LUNAR to start faction war (100 required).');
        showNotification('❌ Insufficient $LUNAR (100 required)', 'error');
        return;
    }
    
    gameState.resources.nebulaCurrency -= 100;
    updateResourceDisplay();
    
    gameState.status.factionWarActive = true;
    
    logActivity('Faction war initiated! The battle for cosmic dominance has begun.');
    showNotification('⚔️ Faction War Initiated!', 'warning');
    
    // Award experience
    gainExperience(75);
}

// Craft item
function craftItem() {
    if (gameState.resources.stardust < 200) {
        logActivity('Insufficient Stardust to craft item (200 required).');
        showNotification('❌ Insufficient Stardust (200 required)', 'error');
        return;
    }
    
    // Show crafting modal
    showModal('Craft Item', `
        <div class="crafting-options">
            <div class="craftable-item" data-item="quantum-scanner">
                <h4>Quantum Scanner</h4>
                <p>Increases resource detection by 20%</p>
                <p>Cost: 200 Stardust</p>
                <button class="craft-btn" onclick="completeCrafting('quantum-scanner')">Craft</button>
            </div>
            <div class="craftable-item" data-item="energy-core">
                <h4>Energy Core</h4>
                <p>Powers equipment and increases efficiency</p>
                <p>Cost: 200 Stardust, 50 Plasma</p>
                <button class="craft-btn" onclick="completeCrafting('energy-core')">Craft</button>
            </div>
            <div class="craftable-item" data-item="plasma-shield">
                <h4>Plasma Shield</h4>
                <p>Protects against environmental hazards</p>
                <p>Cost: 150 Stardust, 100 Plasma</p>
                <button class="craft-btn" onclick="completeCrafting('plasma-shield')">Craft</button>
            </div>
        </div>
    `, [
        { text: 'Cancel', action: closeModal }
    ]);
}

// Complete crafting
function completeCrafting(item) {
    // Deduct resources
    gameState.resources.stardust -= 200;
    
    if (item === 'energy-core' || item === 'plasma-shield') {
        if (gameState.resources.plasma < 50) {
            showNotification('❌ Insufficient Plasma', 'error');
            return;
        }
        gameState.resources.plasma -= item === 'energy-core' ? 50 : 100;
    }
    
    updateResourceDisplay();
    
    // Close modal
    closeModal();
    
    // Start crafting timer
    logActivity(`Crafting ${item.replace(/-/g, ' ')}... ETA: 5 mins`);
    showNotification(`🔨 Crafting Started!`, 'info');
    
    // Award experience
    gainExperience(40);
}

// Upgrade gear
function upgradeGear() {
    if (gameState.resources.stardust < 300) {
        logActivity('Insufficient Stardust to upgrade gear (300 required).');
        showNotification('❌ Insufficient Stardust (300 required)', 'error');
        return;
    }
    
    gameState.resources.stardust -= 300;
    logActivity('Gear upgraded! Defense increased.');
    updateResourceDisplay();
    
    showNotification('⬆️ Gear Upgraded!', 'success');
    
    // Award experience
    gainExperience(40);
}

// Prepare for event
function prepareForEvent() {
    if (gameState.resources.nebulaCurrency < 50) {
        logActivity('Insufficient $LUNAR to prepare for event (50 required).');
        showNotification('❌ Insufficient $LUNAR (50 required)', 'error');
        return;
    }
    
    gameState.resources.nebulaCurrency -= 50;
    updateResourceDisplay();
    
    logActivity('Prepared for upcoming galactic event.');
    showNotification('🔧 Prepared for Galactic Event!', 'success');
    
    // Award experience
    gainExperience(30);
}

// Decrypt signal
function decryptSignal() {
    if (gameState.resources.nebulaCurrency < 25) {
        logActivity('Insufficient $LUNAR to decrypt signal (25 required).');
        showNotification('❌ Insufficient $LUNAR (25 required)', 'error');
        return;
    }
    
    gameState.resources.nebulaCurrency -= 25;
    updateResourceDisplay();
    
    // Generate random coordinates
    const coordinates = {
        x: Math.floor(Math.random() * 1000),
        y: Math.floor(Math.random() * 1000),
        z: Math.floor(Math.random() * 1000)
    };
    
    logActivity(`Signal decrypted! Detected coordinates for rare resources: X${coordinates.x}, Y${coordinates.y}, Z${coordinates.z}.`);
    showNotification('📡 Signal Decrypted!', 'discovery');
    
    // Award experience
    gainExperience(20);
}

// Convert resources
function convertResources() {
    const convertResource = document.getElementById('convertResource');
    if (!convertResource) return;
    
    const resource = convertResource.value;
    
    if (gameState.resources[resource] < 100) {
        logActivity(`Insufficient ${resource.replace(/([A-Z])/g, ' $1').trim()} to convert (100 required).`);
        showNotification(`❌ Insufficient ${resource.replace(/([A-Z])/g, ' $1').trim()}`, 'error');
        return;
    }
    
    // Apply market trend to conversion rate
    const baseRate = gameState.market.conversionRates[resource] || 0.5;
    const marketAdjustment = 1 + (gameState.market.trends[resource] / 100);
    const conversionRate = baseRate * marketAdjustment;
    
    const nebulaGain = Math.floor(conversionRate * 100);
    
    // Perform conversion
    gameState.resources[resource] -= 100;
    gameState.resources.nebulaCurrency += nebulaGain;
    
    logActivity(`Converted 100 ${resource.replace(/([A-Z])/g, ' $1').trim()} to ${nebulaGain} $LUNAR.`);
    updateResourceDisplay();
    
    showNotification(`💱 Converted to ${nebulaGain} $LUNAR`, 'success');
    
    // Award experience
    gainExperience(10);
}

// Start research
function startResearch() {
    if (gameState.resources.stardust < 500) {
        logActivity('Insufficient Stardust to start research (500 required).');
        showNotification('❌ Insufficient Stardust (500 required)', 'error');
        return;
    }
    
    gameState.resources.stardust -= 500;
    gameState.progress.researchProgress = Math.min(gameState.progress.researchProgress + 25, 100);
    
    if (domElements.researchProgress) {
        domElements.researchProgress.style.width = `${gameState.progress.researchProgress}%`;
    }
    
    logActivity('Started research on Resource Efficiency.');
    updateResourceDisplay();
    
    if (gameState.progress.researchProgress >= 100) {
        logActivity('Research Completed: Resource Efficiency unlocked!');
        showNotification('🔬 Research Complete!', 'success');
        
        // Award experience
        gainExperience(100);
        
        // Reset research progress
        gameState.progress.researchProgress = 0;
        if (domElements.researchProgress) {
            domElements.researchProgress.style.width = '0%';
        }
    } else {
        showNotification('🔬 Research Progress: 25%', 'info');
    }
    
    // Award experience for research effort
    gainExperience(25);
}

// View mission archive
function viewMissionArchive() {
    logActivity('Viewed mission archive.');
    
    // Show modal with mission archive
    showModal('Mission Archive', `
        <div class="archive-missions">
            <div class="mission-item completed">
                <span class="mission-status">✅ Completed</span>
                <h4>First Contact</h4>
                <p>Establish communication with Cosmic Explorers</p>
                <p class="mission-reward">Reward: 50 $LUNAR</p>
            </div>
            <div class="mission-item completed">
                <span class="mission-status">✅ Completed</span>
                <h4>Resource Hunt</h4>
                <p>Collect 200 Stardust from Aetherion</p>
                <p class="mission-reward">Reward: 75 $LUNAR</p>
            </div>
            <div class="mission-item in-progress">
                <span class="mission-status">⏳ In Progress</span>
                <h4>Anomaly Investigation</h4>
                <p>Explore 3 anomalies across different planets</p>
                <p class="mission-reward">Reward: 100 $LUNAR</p>
            </div>
        </div>
    `, [
        { text: 'Close', action: closeModal }
    ]);
}

// View exploration log
function viewExplorationLog() {
    logActivity('Viewed exploration log.');
    
    // Get visited planets
    const visitedPlanets = Object.keys(gameState.planets).filter(planet => 
        gameState.planets[planet].visited
    );
    
    // Generate history based on visited planets
    let historyHtml = '';
    visitedPlanets.forEach(planet => {
        historyHtml += `
            <div class="log-entry">
                <span class="log-planet">${planet}</span>
                <span class="log-event">Discovered and explored.</span>
            </div>
        `;
    });
    
    // Show modal with exploration log
    showModal('Exploration Log', `
        <div class="exploration-stats">
            <div class="stat-row">Planets Visited: ${visitedPlanets.length}/6</div>
            <div class="stat-row">Relics Found: ${gameState.progress.relicsFound}</div>
            <div class="stat-row">Anomalies Explored: ${gameState.progress.anomaliesScanned}</div>
        </div>
        <div class="exploration-history">
            <h4>Recent Activities</h4>
            ${historyHtml}
        </div>
    `, [
        { text: 'Close', action: closeModal }
    ]);
}

// Trade resources
function tradeResources() {
    if (gameState.resources.stardust < 100) {
        logActivity('Insufficient Stardust to trade (100 required).');
        showNotification('❌ Insufficient Stardust (100 required)', 'error');
        return;
    }
    
    gameState.resources.stardust -= 100;
    gameState.resources.nebulaCurrency += 50;
    
    logActivity('Traded 100 Stardust for 50 $LUNAR.');
    updateResourceDisplay();
    
    showNotification('💱 Traded for 50 $LUNAR', 'success');
    
    // Award experience
    gainExperience(15);
}

// Buy rare item
function buyRareItem() {
    if (gameState.resources.nebulaCurrency < 200) {
        logActivity('Insufficient $LUNAR to buy rare item (200 required).');
        showNotification('❌ Insufficient $LUNAR (200 required)', 'error');
        return;
    }
    
    gameState.resources.nebulaCurrency -= 200;
    logActivity('Purchased Nebula Core! Enhanced resource collection.');
    updateResourceDisplay();
    
    showNotification('🛒 Purchased Nebula Core!', 'success');
    
    // Award experience
    gainExperience(50);
}

// Customize agent
function handleCustomizeAgent() {
    // Show modal with customization options
    showModal('Customize Agent', `
        <div class="customize-form">
            <div class="form-group">
                <label for="agent-name">Agent Name:</label>
                <input type="text" id="agent-name" value="${gameState.agent.name}" placeholder="Enter agent name">
            </div>
            ${gameState.progress.relicsFound >= 1 ? `
                <div class="form-group">
                    <label>Agent Skin:</label>
                    <div class="skin-options">
                        <label class="skin-option">
                            <input type="radio" name="agent-skin" value="default" ${gameState.agent.skin === 'default' ? 'checked' : ''}>
                            <span>Default</span>
                        </label>
                        <label class="skin-option">
                            <input type="radio" name="agent-skin" value="cosmic" ${gameState.agent.skin === 'cosmic' ? 'checked' : ''}>
                            <span>Cosmic</span>
                        </label>
                    </div>
                </div>
            ` : ''}
        </div>
    `, [
        { text: 'Save', primary: true, action: saveAgentCustomization },
        { text: 'Cancel', action: closeModal }
    ]);
}

// Save agent customization
function saveAgentCustomization() {
    const nameInput = document.getElementById('agent-name');
    if (nameInput && nameInput.value.trim()) {
        gameState.agent.name = nameInput.value.trim();
        logActivity(`Agent renamed to ${gameState.agent.name}.`);
    }
    
    const skinInputs = document.querySelectorAll('input[name="agent-skin"]');
    skinInputs.forEach(input => {
        if (input.checked && input.value !== gameState.agent.skin) {
            gameState.agent.skin = input.value;
            
            if (gameState.agent.skin === 'cosmic') {
                document.querySelectorAll('.agent-icon').forEach(icon => {
                    icon.style.background = 'radial-gradient(circle, #ffffff, #a0a0a0)';
                    icon.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.8)';
                });
                logActivity('Agent skin changed to Cosmic.');
            } else {
                document.querySelectorAll('.agent-icon').forEach(icon => {
                    icon.style.background = 'radial-gradient(circle, white, #a0a0a0)';
                    icon.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.5)';
                });
                logActivity('Agent skin changed to Default.');
            }
        }
    });
    
    gameState.agent.customized = true;
    showNotification('✨ Agent Customized!', 'success');
}

// Replace the existing handleConnectWallet function in script.js with this:

// Connect wallet
async function handleConnectWallet() {
    // Check if Phantom wallet is installed
    if (window.phantom?.solana?.isPhantom) {
        try {
            if (!gameState.status.walletConnected) {
                // Connect to wallet
                const connection = await window.phantom.solana.connect();
                
                // Update game state with connection info
                gameState.status.walletConnected = true;
                gameState.status.walletPublicKey = connection.publicKey.toString();
                
                // Update button text
                if (domElements.connectWallet) {
                    domElements.connectWallet.innerHTML = '<i class="fas fa-wallet"></i> Disconnect';
                }
                
                // Add some NEBULA for testing
                gameState.resources.nebulaCurrency += 100;
                updateResourceDisplay();
                
                // Log connection and show notification
                logActivity(`Connected Phantom Wallet: ${gameState.status.walletPublicKey.slice(0, 4)}...${gameState.status.walletPublicKey.slice(-4)}`);
                showNotification('🔌 Wallet Connected!', 'success');
                
                // Award experience
                gainExperience(25);
            } else {
                // Disconnect wallet
                await window.phantom.solana.disconnect();
                
                // Update game state
                gameState.status.walletConnected = false;
                gameState.status.walletPublicKey = null;
                
                // Update button text
                if (domElements.connectWallet) {
                    domElements.connectWallet.innerHTML = '<i class="fas fa-wallet"></i> Connect Phantom';
                }
                
                // Log disconnection
                logActivity('Disconnected Phantom Wallet.');
                showNotification('🔌 Wallet Disconnected', 'info');
            }
        } catch (error) {
            // Handle connection error
            console.error('Wallet connection error:', error);
            logActivity('Failed to connect wallet: ' + (error.message || 'Unknown error'));
            showNotification('❌ Wallet Connection Failed', 'error');
        }
    } else {
        // Phantom wallet not installed
        logActivity('Phantom wallet extension not found.');
        showNotification('❌ Please install Phantom wallet extension', 'error');
        
        // Open Phantom wallet website in new tab
        window.open('https://phantom.app/', '_blank');
    }
}

// Also update these deposit and withdrawal functions to handle real interactions:

// Handle deposit NEBULA
async function handleDepositNebula() {
    if (!gameState.status.walletConnected) {
        logActivity('Please connect Phantom Wallet first.');
        showNotification('❌ Wallet Not Connected', 'error');
        return;
    }
    
    try {
        // In a real implementation, you would have a contract interaction here
        // This is a simplified version that still simulates the deposit
        
        // For demo purposes we're just simulating
        const depositAmount = 50;
        gameState.resources.nebulaCurrency += depositAmount;
        updateResourceDisplay();
        
        logActivity(`Deposited ${depositAmount} $LUNAR from Phantom Wallet.`);
        showNotification(`💰 Deposited ${depositAmount} $LUNAR`, 'success');
    } catch (error) {
        console.error('Deposit error:', error);
        logActivity('Failed to deposit: ' + (error.message || 'Unknown error'));
        showNotification('❌ Deposit Failed', 'error');
    }
}

// Handle withdraw NEBULA
async function handleWithdrawNebula() {
    if (!gameState.status.walletConnected) {
        logActivity('Please connect Phantom Wallet first.');
        showNotification('❌ Wallet Not Connected', 'error');
        return;
    }
    
    if (gameState.resources.nebulaCurrency <= 0) {
        logActivity('Withdraw failed: No $LUNAR tokens available.');
        showNotification('❌ Insufficient $LUNAR', 'error');
        return;
    }
    
    try {
        // In a real implementation, you would have a contract interaction here
        // This is a simplified version that still simulates the withdrawal
        
        const withdrawAmount = Math.min(gameState.resources.nebulaCurrency, 50);
        gameState.resources.nebulaCurrency -= withdrawAmount;
        updateResourceDisplay();
        
        logActivity(`Withdrawn ${withdrawAmount} $LUNAR to Phantom Wallet.`);
        showNotification(`💸 Withdrawn ${withdrawAmount} $LUNAR`, 'success');
    } catch (error) {
        console.error('Withdrawal error:', error);
        logActivity('Failed to withdraw: ' + (error.message || 'Unknown error'));
        showNotification('❌ Withdrawal Failed', 'error');
    }
}

// Handle deposit NEBULA
function handleDepositNebula() {
    if (!gameState.status.walletConnected) {
        logActivity('Please connect Phantom Wallet first.');
        showNotification('❌ Wallet Not Connected', 'error');
        return;
    }
    
    // Simulate deposit
    const depositAmount = 50;
    gameState.resources.nebulaCurrency += depositAmount;
    updateResourceDisplay();
    
    logActivity(`Deposited ${depositAmount} $LUNAR from Phantom Wallet.`);
    showNotification(`💰 Deposited ${depositAmount} $LUNAR`, 'success');
}

// Handle withdraw NEBULA
function handleWithdrawNebula() {
    if (!gameState.status.walletConnected) {
        logActivity('Please connect Phantom Wallet first.');
        showNotification('❌ Wallet Not Connected', 'error');
        return;
    }
    
    if (gameState.resources.nebulaCurrency <= 0) {
        logActivity('Withdraw failed: No $LUNAR tokens available.');
        showNotification('❌ Insufficient $LUNAR', 'error');
        return;
    }
    
    const withdrawAmount = Math.min(gameState.resources.nebulaCurrency, 50);
    gameState.resources.nebulaCurrency -= withdrawAmount;
    updateResourceDisplay();
    
    logActivity(`Withdrawn ${withdrawAmount} $LUNAR to Phantom Wallet.`);
    showNotification(`💸 Withdrawn ${withdrawAmount} $LUNAR`, 'success');
}

// Generate random events
function generateRandomEvents() {
    const events = [
        'Nebula Storm approaching! Resource production +20%',
        'Dark Matter Surge detected! Dark Matter production +15%',
        'Cosmic Rift opening! Anomaly activity increased.',
        'Meteor Shower on Stellaris! Resource gain reduced.',
        'Faction War brewing between Explorers and Conquerors!',
        'Quantum Fluctuations detected! Research efficiency +25%',
        'Void Eruption imminent! Increased rare resource drops.',
        'Stellar Alignment in progress! Trading rates improved.',
        'Hostile AI swarm detected near Vortexia. Caution advised!',
        'Ancient Relic signals detected on Umbra! Expedition needed.'
    ];
    
    // Only show events occasionally
    if (Math.random() < 0.3) {
        // Select random event
        const event = events[Math.floor(Math.random() * events.length)];
        
        // Update event notification
        if (domElements.eventNotification) {
            domElements.eventNotification.textContent = event;
            
            // Add notification animation
            domElements.eventNotification.classList.add('event-flash');
            setTimeout(() => {
                domElements.eventNotification.classList.remove('event-flash');
            }, 2000);
        }
        
        // Play notification sound if available
        if (window.soundEffects && window.soundEffects.notification) {
            window.soundEffects.notification();
        }
    }
}

// Start event generation loop
setInterval(generateRandomEvents, 60000);

// Initialize the game when document is loaded
document.addEventListener('DOMContentLoaded', initGame);
