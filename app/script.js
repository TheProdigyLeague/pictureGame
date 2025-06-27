document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const loadingScreen = document.getElementById('loading-screen');
    const startButton = document.getElementById('start-button');
    const storyImage = document.getElementById('story-image');
    const storyText = document.getElementById('story-text');
    const choicesContainer = document.getElementById('choices-container');

    // --- Game Data: Story Scenes ---
    // This is where your short Dark Fantasy Gothic Romcom script goes.
    // Each 'scene' object has a description, an image, and choices that lead to other scenes.
    // Replace 'path/to/your/ai-anime-pics/' with the actual path to your images.
    const story = {
        'intro': {
            text: "The moon hung heavy, a fractured pearl in the inky sky, casting long, skeletal shadows across the ancient, crumbling manor. Inside, a chill wind whispered through broken windows, carrying the scent of dust and forgotten dreams. You, Elara, a renowned scholar of forbidden lore, found yourself drawn to this accursed place by whispers of a powerful, cursed artifact. But you were not alone...",
            image: 'imgs/cover.png',
            choices: [
                { text: "Enter the decaying grand hall.", nextScene: 'hall_entry' },
                { text: "Search the overgrown gardens for another entrance.", nextScene: 'garden_explore' }
            ]
        },
        'hall_entry': {
            text: "The grand hall was a tomb of forgotten opulence. Cobwebs draped like funeral shrouds, and the air crackled with a strange, dark energy. A sudden movement caught your eye – a figure, impossibly graceful, yet radiating an aura of ancient sorrow, stood before a shattered stained-glass window. Lord Valerius, the manor's infamous, brooding master, a vampire of immense power and devastating charm. His eyes, the color of twilight, met yours.",
            image: 'imgs/manor_exterior.jpg',
            choices: [
                { text: "Introduce yourself, cautiously.", nextScene: 'valerius_greet' },
                { text: "Draw your arcane wards, preparing for conflict.", nextScene: 'valerius_ward' }
            ]
        },
        'valerius_greet': {
            text: "“My apologies for the intrusion, Lord Valerius,” you began, your voice steady despite the tremor in your heart. “I am Elara, a scholar investigating certain… anomalies.” A faint, enigmatic smile played on his lips. “Anomalies, you say? Or perhaps, merely the echoes of a broken heart?” His voice was a silken caress, laced with centuries of unspoken pain.",
            image: 'imgs/subtle-gothic-pattern.jpg',
            choices: [
                { text: "“Your heart, my lord? I am merely seeking historical truths.”", nextScene: 'valerius_truth_denial' },
                { text: "“Perhaps… I am a scholar of both lore and the human, or rather, inhuman, condition.”", nextScene: 'valerius_insight' }
            ]
        },
        'valerius_ward': {
            text: "As you began to chant, intricate patterns of light shimmered around you. Lord Valerius merely observed, a hint of amusement in his deep eyes. “Such a display of trivial parlor tricks, little mortal. Do you truly believe such trinkets could harm one who has walked through epochs?” He took a step closer, and the air grew heavy with his presence.",
            image: 'imgs/valerius_intimidating.jpg',
            choices: [
                { text: "Stand your ground, ready to defend yourself.", nextScene: 'valerius_stand_ground' },
                { text: "Lower your wards, attempting a more diplomatic approach.", nextScene: 'valerius_diplomacy' }
            ]
        },
        'valerius_truth_denial': {
            text: "He chuckled, a low, resonant sound that vibrated through the very stones of the manor. “Oh, but all history is a tapestry woven with the threads of hearts, Elara. And mine, alas, is particularly tangled.” He extended a hand, pale and elegant. “Come, tell me of these ‘anomalies’ over a cup of… the finest crimson tea.” His gaze was intense, unwavering.",
            image: 'imgs/valerius_offering_hand.jpg',
            choices: [
                { text: "Take his hand, intrigued.", nextScene: 'tea_invitation' },
                { text: "Decline, maintaining a respectful distance.", nextScene: 'keep_distance' }
            ]
        },
        'valerius_insight': {
            text: "A genuine, albeit brief, smile touched his lips. “A rare quality, Elara. Most mortals see only the monstrous, not the burdens. Perhaps… you are different.” He gestured towards a grand, dust-laden sofa. “Join me. There are tales in this house that yearn to be heard, and perhaps… a heart that yearns to understand.”",
            image: 'imgs/valerius_gesturing_sofa.jpg',
            choices: [
                { text: "Accept his invitation to sit.", nextScene: 'sofa_conversation' },
                { text: "Remain standing, but listen intently.", nextScene: 'standing_listen' }
            ]
        },
        'valerius_stand_ground': {
            text: "“Foolishness,” he murmured, and with a speed that defied the eye, he was before you. His cold fingers brushed your cheek, sending a jolt through your entire being. “Such spirit. A pity to extinguish it so soon.” He wasn't aggressive, but the air thrummed with a raw, undeniable power.",
            image: 'imgs/valerius_close_confront.jpg',
            choices: [
                { text: "Attempt to break free.", nextScene: 'try_break_free' },
                { text: "Meet his gaze, defiantly.", nextScene: 'defiant_gaze' }
            ]
        },
        'valerius_diplomacy': {
            text: "You slowly lowered your hands, a deep sigh escaping you. “My apologies, Lord Valerius. My instincts as a scholar sometimes override my manners. I meant no disrespect. I merely seek knowledge.” He paused, his gaze softening almost imperceptibly. “Knowledge, then. This manor holds much of it. Perhaps… we can exchange. Information for… company.”",
            image: 'imgs/valerius_calm.jpg',
            choices: [
                { text: "“Company? What kind of company?”", nextScene: 'inquire_company' },
                { text: "“I am intrigued by your offer, my Lord.”", nextScene: 'accept_offer' }
            ]
        },
        // --- Romcom elements start intertwining ---
        'tea_invitation': {
            text: "His hand was surprisingly warm, or perhaps it was just the intensity of his gaze that made it feel so. You followed him to a small, ornate table where two steaming cups of a dark, fragrant liquid awaited. \"Crimson tea,\" he reiterated, a hint of dark humor in his eyes. \"It's quite… stimulating.\" You took a sip – it tasted of rich berries and something else, something subtly intoxicating.",
            image: 'imgs/tea_scene.jpg',
            choices: [
                { text: "“This is… exquisite, my Lord.”", nextScene: 'tea_compliment' },
                { text: "“What exactly is in this 'crimson tea'?”", nextScene: 'tea_suspicion' }
            ]
        },
        'sofa_conversation': {
            text: "You settled onto the velvet cushions, the dust surprisingly absent where you sat. Valerius took a seat opposite you, his posture regal, yet with an underlying weariness. He began to speak of the manor's history, of its secrets, but his gaze kept returning to you, a spark of something unreadable in his depths. \"You have an unusual light about you, Elara,\" he observed, his voice a low hum. \"It's been... centuries since I've felt such warmth within these walls.\"",
            image: 'imgs/sofa_talk.jpg',
            choices: [
                { text: "“I believe warmth is a choice, even in darkness.”", nextScene: 'warmth_philosophy' },
                { text: "“Perhaps the manor simply needed a new visitor.”", nextScene: 'modest_reply' }
            ]
        },
        'defiant_gaze': {
            text: "You met his gaze, unflinching. A flicker of surprise, then respect, crossed his features. \"Brave,\" he murmured, his thumb gently stroking your cheek. \"Or perhaps, simply foolish. Which is it, scholar?\" The tension in the air was thick, charged with an undeniable, dangerous attraction. You felt your pulse quicken.",
            image: 'imgs/defiant_close_up.jpg',
            choices: [
                { text: "“I choose defiance, my Lord.”", nextScene: 'choose_defiance' },
                { text: "“Perhaps a little of both.”", nextScene: 'little_of_both' }
            ]
        },
        'inquire_company': {
            text: "He leaned back, a subtle smirk playing on his lips. \"Company, Elara, of the intellectual and... perhaps, less intellectual variety. Loneliness is a heavy cloak to wear for centuries. I seek stimulating conversation, and perhaps... a distraction from the unending night.\" His eyes twinkled with a mischievous glint.",
            image: 'imgs/valerius_mischievous.jpg',
            choices: [
                { text: "“And what do you offer in return, besides cryptic smiles?”", nextScene: 'demand_more' },
                { text: "“I can certainly offer stimulating conversation, my Lord.”", nextScene: 'offer_conversation' }
            ]
        },
        // --- Further story developments ---
        'tea_compliment': {
            text: "He leaned forward, his gaze intense. \"I'm pleased you find it to your liking. It is a rare blend, meant for... discerning palates.\" A comfortable silence fell between you, punctuated only by the crackle of a distant fire. You felt a strange sense of peace, a feeling that defied the gothic gloom of your surroundings. Was it the tea, or him?",
            image: 'imgs/tea_comfort.jpg',
            choices: [
                { text: "Ask about his centuries of life.", nextScene: 'ask_about_past' },
                { text: "Change the subject to your research.", nextScene: 'discuss_research' }
            ]
        },
        'warmth_philosophy': {
            text: "\"Indeed,\" he said, his voice softer now. \"A choice that few are brave enough to make in the shadows. You remind me of someone... from a long, long time ago.\" His eyes seemed to cloud with ancient memories, then focused back on you. \"Tell me, Elara, what drives you to seek knowledge in such desolate places?\"",
            image: 'imgs/valerius_pensive.jpg',
            choices: [
                { text: "“The pursuit of truth, wherever it may lead.”", nextScene: 'pursuit_truth' },
                { text: "“Perhaps... a desire for something beyond the mundane.”", nextScene: 'desire_beyond' }
            ]
        },
        'choose_defiance': {
            text: "His smile widened, a true, predatory grin that was nonetheless captivating. \"Defiance. I like that. It's far more interesting than submission.\" His grip on your cheek tightened, pulling you just slightly closer. \"But defiance against a creature like me... can be a dangerous game, little scholar. Are you prepared to play?\"",
            image: 'imgs/valerius_smirk_danger.jpg',
            choices: [
                { text: "“I am not afraid.”", nextScene: 'not_afraid' },
                { text: "“Perhaps… but I learn quickly.”", nextScene: 'learn_quickly' }
            ]
        },
        'offer_conversation': {
            text: "\"Excellent,\" he purred, a genuinely pleased expression on his face. \"Then let us begin. Tell me, Elara, what is the most intriguing forbidden lore you have uncovered in your journeys? And perhaps... what is the most unsettling secret you've kept hidden within your own heart?\" He leaned forward, his interest palpable.",
            image: 'imgs/valerius_intrigued.jpg',
            choices: [
                { text: "Share a fascinating historical secret.", nextScene: 'share_history' },
                { text: "Blush and change the subject.", nextScene: 'blush_change_subject' }
            ]
        },
        // --- More Romcom Escalations ---
        'ask_about_past': {
            text: "He sighed, a sound filled with the weight of ages. \"My past... is a tapestry of triumphs and tragedies, of love found and eternally lost. It is not a tale for faint hearts, Elara. But... for you, perhaps, I could make an exception.\" He looked at you, a profound vulnerability in his eyes that made your own heart ache.",
            image: 'imgs/valerius_vulnerable.jpg',
            choices: [
                { text: "“I am not faint of heart, my Lord.”", nextScene: 'not_faint_heart' },
                { text: "“Tell me everything.”", nextScene: 'tell_everything' }
            ]
        },
        'pursuit_truth': {
            text: "“Truth,” he mused, tracing the rim of his cup. “An elusive mistress. But a noble pursuit. Tell me, Elara, if you found a truth that shattered your world, would you still seek it?” His eyes held yours, a challenge and an invitation.",
            image: 'imgs/valerius_challenge.jpg',
            choices: [
                { text: "“Always. Truth is paramount.”", nextScene: 'truth_paramount' },
                { text: "“It depends on the truth.”", nextScene: 'depends_on_truth' }
            ]
        },
        'not_afraid': {
            text: "He leaned in closer, his breath, surprisingly warm, ghosting over your lips. \"Good,\" he whispered, his voice a low growl. \"Because fear, Elara, is a wasted emotion when there are so many more interesting ones to explore...\" He closed the small distance, and you found yourself lost in a kiss that tasted of ancient magic and forbidden desire.",
            image: 'imgs/kiss_scene.jpg', // **Final Romantic Scene!**
            choices: [
                { text: "Embrace the kiss.", nextScene: 'ending_kiss' },
                { text: "Pull away, breathless.", nextScene: 'ending_pull_away' }
            ]
        },
        // --- ENDINGS ---
        'ending_kiss': {
            text: "The kiss deepened, a swirling vortex of dark enchantment and blossoming affection. In that moment, the crumbling manor, the ancient curse, the very concept of time faded away. There was only you, and him, and the promise of an eternity intertwined. The scholarly pursuit of forbidden lore had led you to the most forbidden, and most enchanting, of all hearts. This was your new truth. THE END.",
            image: 'imgs/kiss_epilogue.jpg',
            choices: [] // No choices, this is an ending.
        },
        'ending_pull_away': {
            text: "You pulled away, your heart pounding like a drum against your ribs. \"Lord Valerius, I... I cannot.\" His expression was unreadable, but a flicker of disappointment crossed his eyes. \"As you wish, little scholar. Perhaps some truths are best left undiscovered. You are free to go.\" The magical pull was broken, leaving you with a profound sense of loss and the chilling realization of what you had turned away from. THE END.",
            image: 'imgs/parting_scene.jpg',
            choices: [] // No choices, this is an ending.
        },
        // --- Add more intermediary scenes and choices as needed to build out the story ---
        'garden_explore': {
            text: "The gardens were a labyrinth of thorny roses and weeping willows, their branches like skeletal fingers grasping at the moonlight. You stumbled upon a hidden gate, overgrown with ivy, and a faint, mournful melody drifted from beyond it. It sounded like a forgotten lullaby, steeped in sorrow.",
            image: 'imgs/garden_entrance.jpg',
            choices: [
                { text: "Push open the gate and investigate the sound.", nextScene: 'fountain_melody' },
                { text: "Decide the grand hall is less spooky and head back.", nextScene: 'hall_entry' }
            ]
        },
        'fountain_melody': {
            text: "Beyond the gate, a crumbling fountain sculpted with grotesque gargoyles stood at the center of a forgotten courtyard. A figure sat on its edge, bathed in moonlight, playing a melancholic tune on a spectral flute. It was a vampire, but not Valerius. This one was slender, with long silver hair and eyes like ancient sapphires. Lady Isolde, Valerius's estranged, equally powerful sister.",
            image: 'imgs/isolde_fountain.jpg',
            choices: [
                { text: "Approach the figure cautiously.", nextScene: 'isolde_approach' },
                { text: "Hide and observe from a distance.", nextScene: 'hide_observe' }
            ]
        },
        'isolde_approach': {
            text: "As you stepped into the light, the music ceased. Lady Isolde's eyes, sharp and intelligent, fixed on you. \"Another lost lamb wandering into the lion's den?\" Her voice was like wind chimes in a storm – beautiful, yet hinting at danger. \"Or perhaps... a morsel for my brother's collection?\"",
            image: 'imgs/isolde_confront.jpg',
            choices: [
                { text: "“I am Elara, a scholar. I seek knowledge.”", nextScene: 'isolde_scholar_claim' },
                { text: "“I mean no harm. I simply got lost.”", nextScene: 'isolde_lost_lamb' }
            ]
        },
        'isolde_scholar_claim': {
            text: "She arched an elegant eyebrow. \"Knowledge? In this place? You seek your own demise, little scholar. This house devours those who pry too deeply.\" She rose, gliding towards you with an ethereal grace. \"Unless... you have something of true value to offer me.\"",
            image: 'imgs/isolde_intrigued.jpg',
            choices: [
                { text: "“What would you consider of 'true value'?”", nextScene: 'isolde_true_value' },
                { text: "“I offer only my intellect and discretion.”", nextScene: 'isolde_intellect_discretion' }
            ]
        },
        'isolde_true_value': {
            text: "A faint smile touched her lips. \"Secrets, Elara. The kind that Valerius would keep hidden even from himself. Or perhaps... a heart that pulses with life, untouched by the shadows.\" Her gaze drifted to your chest, then back to your eyes, a possessive glint within their sapphire depths. \"What do you say? A dangerous game, but with a potential for... exquisite rewards.\"",
            image: 'imgs/isolde_seductive.jpg',
            choices: [
                { text: "“What kind of 'secrets' are we talking about?”", nextScene: 'isolde_demand_secrets' },
                { text: "“I am not a prize to be won, Lady Isolde.”", nextScene: 'isolde_not_a_prize' }
            ]
        },
        'isolde_demand_secrets': {
            text: "Her laughter, though soft, seemed to chill the very air. \"The kind that unravel centuries of lies, scholar. The kind that expose the vulnerabilities of a king. Are you brave enough to delve into the depths of a vampire's ancient heart?\" She extended a hand, adorned with glittering, dark rings. \"Join me, Elara. And together, we shall rewrite history.\"",
            image: 'imgs/isolde_hand_extended.jpg',
            choices: [
                { text: "Take her hand, drawn by her allure.", nextScene: 'isolde_join' },
                { text: "Refuse, feeling a growing unease.", nextScene: 'isolde_refuse' }
            ]
        },
        'isolde_join': {
            text: "As your fingers brushed hers, a jolt of dark magic surged through you. Her grip was cold, yet intoxicating. \"Excellent,\" she purred, pulling you closer. \"Now, tell me everything you know, little mortal. And I shall show you a darkness more profound, and perhaps, more thrilling, than you could ever imagine.\" Your quest for forbidden lore had taken a very unexpected, and very dangerous, turn. THE END (Isolde Route).",
            image: 'imgs/isolde_embrace.jpg',
            choices: []
        },
        'isolde_refuse': {
            text: "You recoiled, shaking your head. \"I came for knowledge, not to become a pawn in some ancient game.\" Her smile vanished, replaced by a chilling frown. \"A pity. Then you are of no further use to me.\" The air crackled, and you suddenly felt a crushing weight, as if the shadows themselves were pressing in. You had made a powerful enemy. THE END (Bad Ending - Isolde).",
            image: 'imgs/isolde_angry.jpg',
            choices: []
        },
        // --- Add a "Game Over" scene if the user makes a fatal choice ---
        'game_over': {
            text: "Your journey ends here, shrouded in the eternal night of the manor. Perhaps some secrets are best left undisturbed.",
            image: 'imgs/game_over_image.jpg',
            choices: [
                { text: "Restart Game", nextScene: 'intro' }
            ]
        }
        // ... continue adding scenes for your short story.
        // Remember to create paths for your romcom elements!
    };

    let currentScene = 'intro'; // Starting point of the story

    // --- Function to update the game display ---
    function updateScene() {
        const sceneData = story[currentScene];
        if (!sceneData) {
            console.error("Scene not found:", currentScene);
            // Fallback to a game over or intro if a scene isn't found
            currentScene = 'game_over';
            updateScene();
            return;
        }

        // Show loading screen briefly for transitions, like a fade to black in a game
        loadingScreen.classList.add('active');
        gameScreen.classList.remove('active');

        setTimeout(() => {
            storyText.textContent = sceneData.text;
            storyImage.src = sceneData.image; // Update image source

            // Clear previous choices
            choicesContainer.innerHTML = '';

            // Add new choices
            if (sceneData.choices && sceneData.choices.length > 0) {
                sceneData.choices.forEach(choice => {
                    const button = document.createElement('button');
                    button.classList.add('choice-button');
                    button.textContent = choice.text;
                    button.addEventListener('click', () => {
                        currentScene = choice.nextScene;
                        updateScene();
                    });
                    choicesContainer.appendChild(button);
                });
            } else {
                // If no choices, it's an ending. Maybe show a "Restart" button explicitly.
                const restartButton = document.createElement('button');
                restartButton.classList.add('glossy-button');
                restartButton.textContent = "Play Again?";
                restartButton.addEventListener('click', () => {
                    currentScene = 'intro';
                    updateScene();
                });
                choicesContainer.appendChild(restartButton);
            }

            // After content is loaded, hide loading screen and show game screen
            loadingScreen.classList.remove('active');
            gameScreen.classList.add('active');
        }, 800); // Simulate a short loading time for the transition effect
    }

    // --- Event Listener for Start Button ---
    startButton.addEventListener('click', () => {
        startScreen.classList.remove('active');
        loadingScreen.classList.add('active'); // Show loading before game starts

        // Simulate a brief loading, then start the game
        setTimeout(() => {
            updateScene();
            loadingScreen.classList.remove('active');
            gameScreen.classList.add('active');
        }, 1200); // Slightly longer load for the initial transition
    });

    // Initialize game (optional: call updateScene directly for debugging a specific scene)
    // updateScene();
});