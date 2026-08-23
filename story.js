// ═══════════════════════════════════════════════════════════
//  QUEST — CHAPTER 1: "COLD WATER"
//  Story data: scenes, characters, quests, dialogue.
//  The engine in index.html reads window.STORY.
// ═══════════════════════════════════════════════════════════

(function () {
  // ── Flags: the whole state of Chapter 1 ──────────────────
  const INITIAL_FLAGS = {
    trust: 0,

    // Act 1 — July's room
    woke: false,
    read_email: false,
    found_money: false,
    saw_pot: false,
    checked_closet: false,

    // Act 2 — stairwell
    met_june: false,
    covered: false,
    refused: false,

    // Act 3 — kitchen
    kitchen_intro: false,
    tv_off: false,
    dishes_done: false,
    bottles_hidden: false,
    chores_done: false,
    checked_breaker: false,
    has_rice: false,
    has_egg: false,
    cooked: false,

    // Act 4 — store
    store_intro: false,
    has_fuse: false,
    has_bread: false,
    heard_about_kade: false,
    paid_tab: false,
    refused_tab: false,
    errand_done: false,

    // Act 5 — June's room
    power_back: false,
    clue_phone: false,
    clue_cash: false,
    clue_slip: false,
    confronted: false,
    pressed: false,

    // Act 6 — balcony
    balcony_called: false,
    chapter_done: false,
  };

  const clues = (F) => (F.clue_phone ? 1 : 0) + (F.clue_cash ? 1 : 0) + (F.clue_slip ? 1 : 0);

  // ── Characters ───────────────────────────────────────────
  const characters = {
    narrator: { name: 'Narrator', dialogue_color: '#d9d9e3', hide_name: true },
    july: { name: 'July', dialogue_color: '#7ab8ff' },
    june: { name: 'June', dialogue_color: '#ff9ec7' },
    dad: { name: 'Dad', dialogue_color: '#c9a227' },
    clerk: { name: 'Mr. Oyo', dialogue_color: '#9fe0b0' },
    phone: { name: 'K.', dialogue_color: '#b78cff' },
  };

  // ── Objectives (shown in the HUD) ────────────────────────
  const OBJ = {
    wake: 'Get up. Find out why the power is out.',
    email: 'Read the school email on your computer.',
    money: 'Find the rent envelope under your bed.',
    leave: 'Leave your room. The landing is up the stairs.',
    june_stairs: 'Talk to June on the landing.',
    kitchen: 'Get to the kitchen — quietly. Dad is asleep.',
    chores: 'Kill the noise before Dad wakes: TV, dishes, bottles.',
    breaker: 'Check the fuse box by the fridge.',
    store: 'Go to Oyo\'s store. Buy a fuse and bread.',
    back: 'Take the fuse home and get the power back on.',
    cook: 'Make June something to eat.',
    search: 'Something is wrong with June. Search her room.',
    confront: 'Face June.',
    balcony: 'Go out to the balcony. She\'s waiting.',
    end: '',
  };

  // ═══════════════════════════════════════════════════════
  //  SCENE 1 — JULY'S ROOM
  // ═══════════════════════════════════════════════════════
  const scenes = {};

  scenes['scene-1'] = {
    background: 'assets/room1.png',
    spawn: { col: 23, row: 9 },
    walkable:
      "C6R6C7R6C8R6C6R7C7R7C8R7C6R8C7R8C8R8C6R9C7R9C8R9C6R10C7R10C8R10C6R11C7R11C8R11C6R12C7R12C8R12C6R13C7R13C8R13C6R14C7R14C8R14C6R15C7R15C8R15C9R15C10R15C11R15C12R15C13R15C14R15C15R15C16R15C17R15C18R15C19R15C20R15C21R15C22R15C23R15C24R15C25R15C26R15C27R15C9R7C9R8C9R9C9R10C9R11C9R12C9R13C9R14C6R5C4R7C5R7C9R7C10R7C11R7C12R7C13R7C14R7C15R7C16R7C17R7C18R7C19R7C20R7C21R7C22R7C23R7C24R7C25R7C26R7C27R7C9R8C10R8C11R8C12R8C13R8C14R8C15R8C16R8C17R8C18R8C19R8C20R8C21R8C22R8C23R8C24R8C25R8C26R8C27R8C11R6C12R6C13R6C14R6C15R6C16R6C17R6C18R6C19R6C20R6C21R6C16R5C17R5C18R5C19R5C20R5C21R5C17R4C18R4C19R4C21R5C21R6C21R7C21R8C20R7C21R7C22R7C23R7C24R7C25R7C26R7C20R8C21R8C22R8C23R8C24R8C25R8C26R8C17R14C18R14C19R14C20R14C21R14C22R14C23R14C24R14C25R14C16R6C17R6C18R6C19R6C20R6C16R7C17R7C18R7C19R7C20R7C16R8C17R8C18R8C19R8C20R8C16R9C17R9C18R9C19R9C20R9C16R10C17R10C18R10C19R10C20R10C16R11C17R11C18R11C19R11C20R11C16R12C17R12C18R12C19R12C20R12C17R13C18R13C19R13C20R13C17R14C18R14C19R14C20R14C21R9C22R9C23R9C24R9C13R13C14R13C13R14C14R14C13R10C13R11C13R12C10R9C11R9C12R9C10R12C11R12C12R12C13R12C13R9C13R10C13R11C13R12",

    enter: [
      {
        when: (F) => !F.woke,
        set: { woke: true },
        objective: OBJ.wake,
        lines: [
          { speaker: 'narrator', text: "Six in the evening. You slept through the whole day again." },
          { speaker: 'narrator', text: "The ceiling fan is dead. The fridge two rooms away is dead. The whole flat is holding its breath." },
          { speaker: 'narrator', text: "The power's out. Third time this month." },
          { speaker: 'july', sprite: 'july_idle', text: "...June's home. I can hear her floor creaking." },
          { speaker: 'july', sprite: 'july_idle', text: "Which means she came back. Which means she went somewhere first." },
          { speaker: 'narrator', text: "(Move with WASD or the arrow keys. Press E near the ! icon to interact.)" },
        ],
      },
    ],

    interacts: [
      // ── Computer desk ──
      {
        cells: "C9R7C10R7",
        icon: "C10R4",
        branches: [
          {
            when: (F) => !F.woke,
            lines: [{ speaker: 'narrator', text: "Dead screen. No power." }],
          },
          {
            when: (F) => !F.read_email,
            set: { read_email: true },
            objective: OBJ.money,
            lines: [
              { speaker: 'narrator', text: "The laptop still has battery. You open it in the dark." },
              {
                speaker: 'narrator',
                text: "Read the messages?",
                choices: [
                  { label: 'Yes', action: 'computer' },
                  { label: 'Not now' },
                ],
              },
            ],
          },
          {
            lines: [
              {
                speaker: 'narrator',
                text: "Open the laptop again?",
                choices: [
                  { label: 'Yes', action: 'computer' },
                  { label: 'No' },
                ],
              },
            ],
          },
        ],
      },

      // ── Closet ──
      {
        cells: "C22R7C23R7C24R7",
        icon: "C23R3",
        branches: [
          {
            when: (F) => !F.checked_closet,
            set: { checked_closet: true },
            lines: [
              { speaker: 'narrator', text: "Your side of the closet: three shirts, all the same grey." },
              { speaker: 'narrator', text: "June's old winter coat is still hanging in here. She outgrew it two years ago and never let you throw it away." },
              { speaker: 'july', sprite: 'july_idle', text: "Mum bought that one. Second-hand, but she made a whole thing of it." },
              { speaker: 'july', sprite: 'july_idle', text: "\"My two months, warm for winter.\" June and July. She thought she was so funny." },
            ],
          },
          { lines: [{ speaker: 'narrator', text: "Just clothes. Nothing you feel like being today." }] },
        ],
      },

      // ── TV ──
      {
        cells: "C6R10C6R11C6R12",
        icon: "C4R10",
        branches: [
          {
            when: (F) => !F.power_back,
            lines: [{ speaker: 'narrator', text: "No power, no TV. Just your own reflection in the dust." }],
          },
          { lines: [{ speaker: 'narrator', text: "You're not in the mood for anyone else's stories." }] },
        ],
      },

      // ── Bed / rent envelope ──
      {
        cells: "C21R9C22R9C23R9C24R9C21R8",
        icon: "C22R11",
        branches: [
          {
            when: (F) => F.read_email && !F.found_money,
            set: { found_money: true },
            objective: OBJ.leave,
            lines: [
              { speaker: 'narrator', text: "You reach under the mattress for the envelope. Rent money. Yours — three months of night shifts." },
              { speaker: 'narrator', text: "You count it twice." },
              { speaker: 'july', sprite: 'july_angry', text: "...Forty short." },
              { speaker: 'july', sprite: 'july_angry', text: "Dad doesn't know this envelope exists. He'd have taken all of it, not forty." },
              { speaker: 'july', sprite: 'july_idle', text: "So it was her." },
              { speaker: 'narrator', text: "You put the rest in your pocket. You don't say anything out loud. You've gotten good at that." },
            ],
          },
          {
            when: (F) => !F.found_money,
            lines: [
              { speaker: 'narrator', text: "Your bed. Sheets you haven't changed since the water got shut off." },
              { speaker: 'july', sprite: 'july_idle', text: "Sleeping more won't make the day shorter. It just makes it later." },
            ],
          },
          {
            lines: [{ speaker: 'narrator', text: "The envelope's in your pocket now. Forty short." }],
          },
        ],
      },

      // ── The flower pot — the childhood memory ──
      {
        cells: "C6R5C7R6",
        icon: "C7R3",
        branches: [
          {
            when: (F) => !F.saw_pot,
            set: { saw_pot: true },
            lines: [
              { speaker: 'narrator', text: "A plastic flower pot, painted over in a child's hand. Yellow, mostly. Some of it on the wall behind it." },
              { speaker: 'narrator', text: "There's a name scratched into the rim: JUNE & JULY. The ampersand is backwards." },
              { speaker: 'july', sprite: 'july_smile', text: "She was seven. She said fake flowers were better because they can't die if nobody waters them." },
              { speaker: 'july', sprite: 'july_idle', text: "She wasn't talking about flowers. She was eight before she understood that." },
            ],
          },
          { lines: [{ speaker: 'narrator', text: "Fake flowers. Still yellow. Still here." }] },
        ],
      },

      // ── Balcony doorway ──
      {
        cells: "C13R15C14R15C15R15C16R15C17R15",
        icon: "C15R13",
        branches: [
          {
            when: (F) => F.balcony_called,
            goto: 'scene-1.5',
          },
          {
            lines: [
              {
                speaker: 'narrator',
                text: "Step out on the balcony?",
                choices: [
                  { label: 'Yes', goto: 'scene-1.5' },
                  { label: 'No' },
                ],
              },
            ],
          },
        ],
      },

      // ── Door → stairwell ──
      {
        cells: "C17R4C18R4C19R4",
        icon: "C18R2",
        branches: [
          {
            when: (F) => !F.read_email,
            lines: [
              { speaker: 'july', sprite: 'july_idle', text: "Not yet. There was a message on the laptop last night. I want to read it before I see either of them." },
            ],
          },
          {
            when: (F) => !F.found_money,
            lines: [
              { speaker: 'july', sprite: 'july_idle', text: "Take the rent envelope first. Never leave money in a house like this." },
            ],
          },
          { goto: 'scene-2', at: 'C5R15' },
        ],
      },
    ],
  };

  // ═══════════════════════════════════════════════════════
  //  SCENE 2 — THE STAIRWELL / LANDING
  // ═══════════════════════════════════════════════════════
  scenes['scene-2'] = {
    background: 'assets/stairwell.png',
    spawn: { col: 5, row: 15 },
    walkable:
      "C3R15C4R15C5R15C6R15C7R15C8R15C9R15C10R15C11R15C12R15C13R15C14R15C15R15C16R15C17R15C18R15C19R15C20R15C21R15C22R15C23R15C24R15C25R15C26R15C27R15C28R15C3R16C4R16C5R16C6R16C7R16C8R16C9R16C10R16C11R16C12R16C13R16C14R16C15R16C16R16C17R16C18R16C19R16C20R16C21R16C22R16C23R16C24R16C25R16C26R16C27R16C28R16C3R17C4R17C5R17C6R17C7R17C8R17C9R17C10R17C11R17C12R17C13R17C14R17C15R17C16R17C17R17C18R17C19R17C20R17C21R17C22R17C23R17C24R17C25R17C26R17C27R17C28R17C3R18C4R18C5R18C6R18C7R18C8R18C9R18C10R18C11R18C12R18C13R18C14R18C15R18C16R18C17R18C18R18C19R18C20R18C21R18C22R18C23R18C24R18C25R18C26R18C27R18C28R18C1R16C2R16C1R17C2R17C1R18C2R18C29R16C30R16C29R17C30R17C29R18C30R18C12R14C13R14C14R14C15R14C16R14C17R14C18R14C19R14C20R14",

    props: [
      { sprite: 'june_idle', cell: 'C10R15', scale: 0.9325, when: (F) => !F.met_june },
    ],

    interacts: [
      // Back into July's room
      { cells: "C4R15C5R15C6R15C7R15", icon: "C5R13", branches: [{ goto: 'scene-1', at: 'C18R4' }] },

      // Right door → kitchen / living room
      {
        cells: "C24R15C25R15C26R15C27R15C28R15",
        icon: "C26R13",
        branches: [
          {
            when: (F) => !F.met_june,
            lines: [{ speaker: 'july', sprite: 'july_idle', text: "June's standing right there. Walking past her would be its own kind of answer." }],
          },
          { goto: 'kitchen', at: 'C16R5' },
        ],
      },

      // Left middle door → June's room
      {
        cells: "C12R14C13R14C14R14",
        icon: "C13R12",
        branches: [
          {
            when: (F) => !F.power_back,
            lines: [
              { speaker: 'narrator', text: "June's door. Locked, the way it's been locked since she turned fifteen." },
            ],
          },
          { goto: 'june-room', at: 'C11R17' },
        ],
      },

      // Right middle door → front door / street
      {
        cells: "C18R14C19R14C20R14",
        icon: "C19R12",
        branches: [
          {
            when: (F) => F.errand_done,
            lines: [{ speaker: 'july', sprite: 'july_idle', text: "Nothing else out there for me tonight." }],
          },
          {
            when: (F) => !F.checked_breaker,
            lines: [{ speaker: 'july', sprite: 'july_idle', text: "Going out with no reason and no list. That's Dad's move, not mine." }],
          },
          { goto: 'store', at: 'C15R18' },
        ],
      },

      // ── June on the landing ──
      {
        cells: "C8R15C9R15C10R15C11R15C8R16C9R16C10R16C11R16",
        icon: "C10R13",
        branches: [
          {
            when: (F) => !F.met_june,
            set: { met_june: true },
            lines: [
              { speaker: 'june', sprite: 'june_idle-a', text: "You finally stepped out of the house." },
              { speaker: 'june', sprite: 'june_idle-b', text: "What took you so long?" },
              { speaker: 'july', sprite: 'july_idle', text: "The power's out." },
              { speaker: 'june', sprite: 'june_idle', text: "I know. I've been sitting in the dark for two hours listening to you not wake up." },
              { speaker: 'narrator', text: "She's still in last night's clothes. Her hair smells like somebody else's cigarettes." },
              { speaker: 'july', sprite: 'july_idle', text: "You didn't sleep here." },
              { speaker: 'june', sprite: 'june_anxious', text: "I did. I came in at two." },
              { speaker: 'july', sprite: 'july_idle', text: "The door sticks at two. It didn't stick." },
              { speaker: 'june', sprite: 'june_upset', text: "God, you're — okay. Fine. Four. I came in at four." },
              { speaker: 'june', sprite: 'june_anxious', text: "July. If he asks, I was home all night. Please." },
              {
                speaker: 'narrator',
                text: "Cover for her?",
                choices: [
                  {
                    label: '"You were home all night."',
                    set: { covered: true, trust: 1 },
                    lines: [
                      { speaker: 'july', sprite: 'july_idle', text: "You were home all night. You went to bed before me." },
                      { speaker: 'june', sprite: 'june_smile', text: "...Thanks." },
                      { speaker: 'narrator', text: "She says it too fast, like she's paying for something in advance." },
                      { speaker: 'july', sprite: 'july_idle', text: "That's the fourth lie I'm holding for you this month. I keep count so you don't have to." },
                      { speaker: 'june', sprite: 'june_upset', text: "Nobody asked you to keep count." },
                    ],
                  },
                  {
                    label: '"Tell him yourself."',
                    set: { refused: true, trust: -1 },
                    lines: [
                      { speaker: 'july', sprite: 'july_angry', text: "No. You want to live like an adult, you can lie like one." },
                      { speaker: 'june', sprite: 'june_upset', text: "You know what he's like when he wakes up." },
                      { speaker: 'july', sprite: 'july_idle', text: "Yeah. I do. I'm the one who's always known." },
                      { speaker: 'narrator', text: "Something in her face closes, quietly, like a door in another room." },
                      { speaker: 'june', sprite: 'june_smug', text: "Right. Everything's always harder for you." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            when: (F) => F.met_june && !F.kitchen_intro,
            objective: OBJ.kitchen,
            lines: [
              { speaker: 'june', sprite: 'june_idle', text: "He's in the chair. Don't slam anything." },
              { speaker: 'june', sprite: 'june_idle-b', text: "And July — the power thing isn't a fuse. He didn't pay it. Again." },
              { speaker: 'july', sprite: 'july_idle', text: "I'll look at it." },
              { speaker: 'june', sprite: 'june_smug', text: "You always look at it." },
            ],
          },
          {
            lines: [
              { speaker: 'june', sprite: 'june_idle', text: "I'm going to my room. Don't knock unless the building's on fire." },
            ],
          },
        ],
      },
    ],
  };

  // ═══════════════════════════════════════════════════════
  //  KITCHEN / LIVING ROOM
  // ═══════════════════════════════════════════════════════
  const KITCHEN_WALK =
    "C14R4C15R4C16R4C17R4C14R5C15R5C16R5C17R5C8R6C9R6C10R6C11R6C12R6C13R6C14R6C15R6C16R6C17R6C18R6C19R6C20R6C21R6C8R7C9R7C10R7C11R7C12R7C13R7C14R7C15R7C16R7C17R7C18R7C19R7C20R7C21R7C8R8C15R8C16R8C17R8C18R8C19R8C20R8C21R8C22R8C23R8C24R8C25R8C8R9C15R9C16R9C17R9C18R9C19R9C20R9C21R9C22R9C23R9C24R9C25R9C6R10C7R10C8R10C15R10C16R10C17R10C18R10C19R10C20R10C21R10C22R10C23R10C24R10C25R10C6R11C7R11C8R11C15R11C16R11C17R11C18R11C19R11C20R11C21R11C22R11C23R11C24R11C25R11C4R12C5R12C6R12C7R12C8R12C9R12C10R12C11R12C12R12C13R12C14R12C15R12C16R12C17R12C18R12C19R12C20R12C21R12C22R12C23R12C4R13C5R13C6R13C7R13C8R13C9R13C10R13C11R13C12R13C13R13C14R13C15R13C16R13C22R13C23R13C4R14C5R14C6R14C7R14C8R14C9R14C10R14C11R14C12R14C13R14C14R14C15R14C16R14C22R14C23R14C4R15C5R15C6R15C7R15C8R15C9R15C10R15C11R15C12R15C13R15C14R15C15R15C16R15C22R15C23R15C24R15C25R15C26R15C27R15C11R16C12R16C13R16C14R16C15R16C16R16C22R16C23R16C24R16C25R16C26R16C27R16C11R17C12R17C13R17C14R17C15R17C16R17C17R17C18R17C19R17C20R17C21R17C22R17C23R17C24R17C25R17C26R17C27R17C11R18C12R18C13R18C14R18C15R18C16R18C17R18C18R18C19R18C20R18C21R18C22R18C23R18C24R18C25R18C26R18C27R18";

  scenes['kitchen'] = {
    background: 'assets/kitchen.png',
    spawn: { col: 16, row: 5 },
    walkable: KITCHEN_WALK,

    enter: [
      {
        when: (F) => !F.kitchen_intro,
        set: { kitchen_intro: true },
        objective: OBJ.chores,
        lines: [
          { speaker: 'narrator', text: "The kitchen smells like old oil and older smoke." },
          { speaker: 'narrator', text: "Dad is in the armchair, mouth open, one shoe off. The TV is on — the small one, the one with its own battery — hissing static into the room." },
          { speaker: 'narrator', text: "He's been asleep since noon. He'll be awake by seven, and whichever way he wakes up decides what kind of night everyone has." },
          { speaker: 'july', sprite: 'july_idle', text: "Okay. Quiet. Kill the static, clear the sink, get the bottles out of sight." },
          { speaker: 'july', sprite: 'july_idle', text: "If he opens his eyes to a clean room he complains. If he opens them to this, somebody gets it." },
        ],
      },
      {
        when: (F) => F.has_fuse && !F.power_back,
        set: { power_back: true, errand_done: true },
        objective: OBJ.cook,
        lines: [
          { speaker: 'narrator', text: "You slot the fuse in and push the breaker up. The flat wakes with a shudder — fridge, fan, the hallway bulb." },
          { speaker: 'narrator', text: "In the armchair, Dad shifts. Doesn't wake." },
          { speaker: 'july', sprite: 'july_idle', text: "Right. Food. She hasn't eaten anything I've seen her eat in two days." },
        ],
      },
    ],

    interacts: [
      // Door back to landing
      { cells: "C14R4C15R4C16R4C17R4C14R5C15R5C16R5C17R5", icon: "C15R3", branches: [{ goto: 'scene-2', at: 'C26R15' }] },

      // ── TV static ──
      {
        cells: "C22R13C23R13C22R14C23R14C22R12C23R12",
        icon: "C25R13",
        branches: [
          {
            when: (F) => !F.tv_off,
            set: { tv_off: true },
            lines: [
              { speaker: 'narrator', text: "You reach past his knee for the dial. He mutters something. You freeze with your hand out." },
              { speaker: 'dad', text: "...mm. Leave it..." },
              { speaker: 'narrator', text: "He doesn't wake. You turn it down first, then off, one notch at a time. The silence is enormous." },
              { speaker: 'july', sprite: 'july_idle', text: "Eleven years of practice at being quiet in my own house." },
            ],
          },
          { lines: [{ speaker: 'narrator', text: "The screen is dark. He's still breathing that heavy, wet way." }] },
        ],
      },

      // ── Dad ──
      {
        cells: "C17R12C18R12C19R12C20R12C21R12",
        icon: "C19R11",
        branches: [
          {
            when: (F) => !F.chores_done,
            lines: [
              { speaker: 'narrator', text: "Up close he looks smaller than he sounds. There's a fresh burn on the armrest beside his hand." },
              { speaker: 'july', sprite: 'july_idle', text: "One day he's going to fall asleep with one of these lit and take the whole floor with him." },
              { speaker: 'narrator', text: "You pinch out the cigarette. He doesn't stir." },
            ],
          },
          {
            lines: [
              { speaker: 'narrator', text: "His wallet is on the armrest. Empty, except for a photo of four people at a beach, folded so the fourth is out of frame." },
              { speaker: 'july', sprite: 'july_idle', text: "He folded Mum out but he kept the fold. That's the whole man, right there." },
            ],
          },
        ],
      },

      // ── Sink of dishes ──
      {
        cells: "C8R6C8R7C8R8C8R9",
        icon: "C6R7",
        branches: [
          {
            when: (F) => !F.dishes_done,
            set: { dishes_done: true },
            lines: [
              { speaker: 'narrator', text: "Four days of plates. No hot water — there hasn't been hot water since the boiler went." },
              { speaker: 'narrator', text: "You wash them in cold, slowly, so the ceramic doesn't knock." },
              { speaker: 'july', sprite: 'july_idle', text: "June used to dry. She'd stand on the crate and hold the plate with both hands like it was a baby bird." },
              { speaker: 'july', sprite: 'july_idle', text: "Somewhere along the way I stopped asking her and just did it. I thought I was being kind." },
              { speaker: 'narrator', text: "Cold water, cracked hands. Done." },
            ],
          },
          { lines: [{ speaker: 'narrator', text: "The sink is clean. It won't be by tomorrow." }] },
        ],
      },

      // ── Bottles ──
      {
        cells: "C22R15C23R15C24R15C22R16C23R16C24R16",
        icon: "C24R14",
        branches: [
          {
            when: (F) => !F.bottles_hidden,
            set: { bottles_hidden: true },
            objective: OBJ.breaker,
            lines: [
              { speaker: 'narrator', text: "Six bottles under the chair, two on their sides. You gather them against your chest so they can't clink." },
              { speaker: 'narrator', text: "Bin them, or line them up on the table where he'll see the count?" },
              {
                speaker: 'narrator',
                text: "",
                choices: [
                  {
                    label: 'Bin them quietly',
                    set: { trust: 1 },
                    lines: [
                      { speaker: 'narrator', text: "You wrap them in newspaper first. You've done this so many times your hands know the order." },
                      { speaker: 'july', sprite: 'july_idle', text: "Nobody sees it, so nobody has to have a feeling about it. That's the system." },
                    ],
                  },
                  {
                    label: 'Line them up where he\'ll see',
                    set: { trust: -1 },
                    lines: [
                      { speaker: 'narrator', text: "You set them in a neat row on the table. Eight soldiers." },
                      { speaker: 'july', sprite: 'july_angry', text: "Let him count them. Let him do one piece of the arithmetic in this house." },
                      { speaker: 'narrator', text: "Your hands are shaking. You're already imagining the noise this will make later." },
                    ],
                  },
                ],
              },
            ],
          },
          { lines: [{ speaker: 'narrator', text: "Handled. For tonight." }] },
        ],
      },

      // ── Fuse box by the fridge ──
      {
        cells: "C24R8C25R8C24R9C25R9",
        icon: "C26R8",
        branches: [
          {
            when: (F) => !F.chores_done,
            lines: [
              { speaker: 'july', sprite: 'july_idle', text: "Breaker later. Get the room quiet first — that's the thing that actually hurts people." },
            ],
          },
          {
            when: (F) => !F.checked_breaker,
            set: { checked_breaker: true },
            objective: OBJ.store,
            lines: [
              { speaker: 'narrator', text: "You open the little metal door beside the fridge and strike a match." },
              { speaker: 'narrator', text: "It isn't the bill. The main fuse is dead — burnt through, black as a match head." },
              { speaker: 'july', sprite: 'july_idle', text: "Two dollars. The whole flat has been dark since morning over two dollars." },
              { speaker: 'july', sprite: 'july_idle', text: "Oyo's still open. Fuse, and bread, since I'm going anyway." },
              { speaker: 'narrator', text: "You put the rent envelope in your jacket. Never leave money in a house like this." },
            ],
          },
          {
            when: (F) => !F.has_fuse,
            lines: [{ speaker: 'july', sprite: 'july_idle', text: "Dead fuse. I need the part before this does anything." }],
          },
          { lines: [{ speaker: 'narrator', text: "Power's back. The fridge is complaining about it." }] },
        ],
      },

      // ── Cupboard: rice ──
      {
        cells: "C4R12C5R12C4R13C5R13",
        icon: "C4R11",
        branches: [
          {
            when: (F) => F.errand_done && !F.has_rice,
            set: { has_rice: true },
            lines: [
              { speaker: 'narrator', text: "Half a bag of rice, a tin of something with no label, and a jar of instant coffee that's mostly clumps." },
              { speaker: 'july', sprite: 'july_idle', text: "Rice. Good. Rice always works." },
            ],
          },
          {
            when: (F) => F.has_rice,
            lines: [{ speaker: 'narrator', text: "You have the rice." }],
          },
          { lines: [{ speaker: 'narrator', text: "Cupboards. Nothing you can cook in the dark." }] },
        ],
      },

      // ── Fridge: egg ──
      {
        cells: "C22R8C23R8C22R9C23R9",
        icon: "C23R7",
        branches: [
          {
            when: (F) => F.errand_done && !F.has_egg,
            set: { has_egg: true },
            lines: [
              { speaker: 'narrator', text: "The fridge light comes on for the first time today. Inside: two eggs, ketchup, and something in a bowl you refuse to identify." },
              { speaker: 'narrator', text: "There's a magnet holding up a drawing. Two stick figures, one taller, both with yellow hair. Older than either of you remembers being." },
              { speaker: 'july', sprite: 'july_idle', text: "Two eggs. I'll take one." },
            ],
          },
          {
            when: (F) => !F.errand_done,
            lines: [{ speaker: 'narrator', text: "Warm inside. You shut it quickly — whatever's still good in there won't be if you keep looking." }],
          },
          { lines: [{ speaker: 'narrator', text: "One egg left in there. That one's hers for tomorrow." }] },
        ],
      },

      // ── Stove: cook ──
      {
        cells: "C6R10C7R10C6R11C7R11",
        icon: "C5R10",
        branches: [
          {
            when: (F) => F.cooked,
            lines: [{ speaker: 'narrator', text: "The plate is made. It'll go cold if you keep standing here." }],
          },
          {
            when: (F) => F.has_rice && F.has_egg,
            set: { cooked: true },
            objective: OBJ.search,
            lines: [
              { speaker: 'narrator', text: "Rice on, egg cracked on top, lid on. The gas ring puts a small blue light on the ceiling." },
              { speaker: 'narrator', text: "It's the same meal you made her the week Mum left, when neither of you could say the word 'left' out loud yet." },
              { speaker: 'july', sprite: 'july_smile', text: "She used to call it sun-rice. Because of the yolk." },
              { speaker: 'narrator', text: "You cover the plate with another plate to keep it warm and carry it as far as the hallway." },
              { speaker: 'narrator', text: "Then you stop, because you can hear her voice through her door. And she isn't on the phone with you." },
              { speaker: 'phone', text: "— relax, nobody's counting it. Just take it and come out." },
              { speaker: 'july', sprite: 'july_angry', text: "...Who is that." },
            ],
          },
          {
            when: (F) => F.errand_done,
            lines: [{ speaker: 'july', sprite: 'july_idle', text: "Rice and an egg. I need both before this is a meal." }],
          },
          { lines: [{ speaker: 'narrator', text: "Gas but no light. Not tonight." }] },
        ],
      },

      // ── Table: the letters ──
      {
        cells: "C9R12C10R12C11R12C12R12C13R12C14R12",
        icon: "C11R11",
        branches: [
          {
            when: (F) => !F.chores_done,
            lines: [
              { speaker: 'narrator', text: "Bills fanned across the table like a bad hand of cards. Two are stamped FINAL." },
              { speaker: 'july', sprite: 'july_idle', text: "He opens them. That's the part that gets me. He opens every single one and then puts it down." },
            ],
          },
          {
            lines: [
              { speaker: 'narrator', text: "Under the bills: a school letter, unopened, addressed to a parent or guardian." },
              { speaker: 'july', sprite: 'july_idle', text: "Twenty-two absences. Somebody's been signing her notes." },
              { speaker: 'july', sprite: 'july_idle', text: "Signing them well, too. Somebody who knows what my handwriting looks like." },
            ],
          },
        ],
      },
    ],
  };

  // ═══════════════════════════════════════════════════════
  //  STORE
  // ═══════════════════════════════════════════════════════
  scenes['store'] = {
    background: 'assets/store.png',
    spawn: { col: 15, row: 18 },
    walkable:
      "C14R7C15R7C25R7C26R7C27R7C4R8C5R8C6R8C7R8C8R8C9R8C10R8C11R8C12R8C13R8C14R8C15R8C16R8C17R8C18R8C19R8C20R8C21R8C22R8C23R8C24R8C25R8C26R8C27R8C4R9C5R9C6R9C7R9C14R9C15R9C16R9C24R9C25R9C26R9C27R9C4R10C5R10C6R10C7R10C14R10C15R10C16R10C24R10C25R10C26R10C27R10C4R11C5R11C6R11C7R11C14R11C15R11C16R11C24R11C25R11C26R11C27R11C4R12C5R12C6R12C7R12C14R12C15R12C16R12C24R12C25R12C26R12C27R12C4R13C5R13C6R13C7R13C14R13C15R13C16R13C24R13C25R13C26R13C27R13C4R14C5R14C6R14C7R14C14R14C15R14C16R14C24R14C25R14C26R14C27R14C9R15C10R15C11R15C12R15C13R15C14R15C15R15C16R15C17R15C18R15C19R15C20R15C21R15C9R16C10R16C11R16C12R16C13R16C14R16C15R16C16R16C17R16C18R16C19R16C20R16C21R16C9R17C10R17C11R17C12R17C13R17C14R17C15R17C16R17C17R17C18R17C19R17C20R17C21R17C12R18C13R18C14R18C15R18C16R18C17R18C18R18",

    enter: [
      {
        when: (F) => !F.store_intro,
        set: { store_intro: true },
        lines: [
          { speaker: 'narrator', text: "Oyo's is the only lit thing on the street. The fluorescent tube over the counter buzzes at a pitch that gets into your teeth." },
          { speaker: 'clerk', text: "July. You look like your father." },
          { speaker: 'july', sprite: 'july_idle', text: "Evening, Mr. Oyo." },
          { speaker: 'clerk', text: "It wasn't a compliment. What do you need?" },
        ],
      },
    ],

    interacts: [
      // Exit
      {
        cells: "C12R18C13R18C14R18C15R18C16R18C17R18C18R18",
        icon: "C15R19",
        branches: [
          {
            when: (F) => !F.has_fuse,
            lines: [{ speaker: 'july', sprite: 'july_idle', text: "Not without the fuse. I'm not walking back into that flat empty-handed." }],
          },
          { goto: 'scene-2', at: 'C19R15' },
        ],
      },

      // Shelves — flavour
      {
        cells: "C14R9C14R10C14R11C14R12C15R9C15R10C15R11C15R12C16R9C16R10C16R11C16R12",
        icon: "C15R13",
        branches: [
          {
            lines: [
              { speaker: 'narrator', text: "Instant noodles, three for the price of two. You know the exact weight of this shelf; you've been buying dinner off it since you were fourteen." },
            ],
          },
        ],
      },

      // Fridge — flavour
      {
        cells: "C4R8C5R8C6R8C7R8C4R9C5R9C6R9C7R9",
        icon: "C5R7",
        branches: [
          {
            lines: [
              { speaker: 'narrator', text: "The drinks fridge hums. Behind the glass, your reflection stands in a doorway of cold blue light, holding an envelope of somebody else's rent." },
            ],
          },
        ],
      },

      // ── Counter: the whole quest beat ──
      {
        cells: "C17R8C18R8C19R8C20R8C21R8C22R8C23R8",
        icon: "C20R7",
        branches: [
          // 1. Buy fuse + bread
          {
            when: (F) => !F.has_fuse,
            set: { has_fuse: true, has_bread: true },
            lines: [
              { speaker: 'july', sprite: 'july_idle', text: "One fifteen-amp fuse. And bread — the cheap loaf, not the seeded one." },
              { speaker: 'clerk', text: "The seeded one is thirty cents more and your sister only eats the seeded one." },
              { speaker: 'july', sprite: 'july_idle', text: "...The seeded one, then." },
              { speaker: 'narrator', text: "He rings it up slowly. Then he stops, and doesn't hand you the bag." },
              { speaker: 'clerk', text: "July. There's a tab." },
              { speaker: 'july', sprite: 'july_idle', text: "We don't have a tab. I closed it in March." },
              { speaker: 'clerk', text: "You did. Somebody opened it again." },
            ],
          },
          // 2. The Kade reveal
          {
            when: (F) => !F.heard_about_kade,
            set: { heard_about_kade: true },
            lines: [
              { speaker: 'clerk', text: "Four in the morning. Your sister, and a man." },
              { speaker: 'july', sprite: 'july_angry', text: "A man." },
              { speaker: 'clerk', text: "Twenty-five, twenty-six. Grey car outside with the engine running. He let her come in alone and do the talking." },
              { speaker: 'clerk', text: "Cigarettes, two energy drinks, and a phone card. Forty dollars. She said her brother would settle it." },
              { speaker: 'narrator', text: "Forty. The exact shape of the hole in your envelope, filled twice over." },
              { speaker: 'july', sprite: 'july_idle', text: "Did she say his name?" },
              { speaker: 'clerk', text: "She called him Kade. She said it like it was supposed to mean something to me." },
              { speaker: 'clerk', text: "July — she counted the money out on this counter and then she looked at the door before she picked the change up. You understand what I am telling you?" },
              { speaker: 'july', sprite: 'july_idle', text: "...Yeah. I understand." },
            ],
          },
          // 3. The choice
          {
            when: (F) => !F.errand_done && !F.paid_tab && !F.refused_tab,
            lines: [
              { speaker: 'clerk', text: "So. The forty. Do I put it on the family, or do I put it on her name in the book?" },
              {
                speaker: 'narrator',
                text: "Your father reads that book every time he comes in here.",
                choices: [
                  {
                    label: 'Pay it. Keep her name clean.',
                    set: { paid_tab: true, trust: 1 },
                    lines: [
                      { speaker: 'narrator', text: "You count the notes out of the rent envelope. It's thin now in a way that will matter on the first of the month." },
                      { speaker: 'july', sprite: 'july_idle', text: "Paid. And Mr. Oyo — if she comes in with him again, don't serve her. Call me. Any hour." },
                      { speaker: 'clerk', text: "I can refuse her cigarettes. I can't refuse her the door." },
                      { speaker: 'clerk', text: "And July — you keep paying the bill before anybody sees it. One day she is going to think the bill isn't real." },
                      { speaker: 'july', sprite: 'july_idle', text: "Then I'll keep paying it." },
                    ],
                  },
                  {
                    label: 'Leave it in the book. Let it land on her.',
                    set: { refused_tab: true, trust: -1 },
                    lines: [
                      { speaker: 'july', sprite: 'july_angry', text: "Put it under her name. Let her see it written down." },
                      { speaker: 'clerk', text: "Your father will see it written down first." },
                      { speaker: 'narrator', text: "You know that. You knew it before you said it. Some part of you wanted it said anyway." },
                      { speaker: 'july', sprite: 'july_idle', text: "...Then he sees it." },
                      { speaker: 'clerk', text: "Mm. You two are going to teach each other some very hard lessons." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            objective: OBJ.back,
            lines: [
              { speaker: 'clerk', text: "Go home, July. Put your light back on." },
            ],
          },
        ],
      },
    ],
  };

  // ═══════════════════════════════════════════════════════
  //  JUNE'S ROOM
  // ═══════════════════════════════════════════════════════
  scenes['june-room'] = {
    background: 'assets/june_room.png',
    spawn: { col: 11, row: 17 },
    walkable:
      "C19R6C19R7C19R8C7R9C8R9C9R9C10R9C11R9C12R9C13R9C14R9C15R9C16R9C17R9C18R9C19R9C7R10C8R10C9R10C10R10C11R10C12R10C13R10C14R10C15R10C16R10C17R10C18R10C19R10C8R11C9R11C10R11C11R11C12R11C13R11C14R11C15R11C16R11C17R11C18R11C19R11C8R12C9R12C10R12C11R12C12R12C13R12C14R12C15R12C16R12C17R12C18R12C19R12C8R13C9R13C10R13C11R13C12R13C13R13C14R13C15R13C16R13C17R13C18R13C19R13C7R14C8R14C9R14C10R14C11R14C12R14C13R14C14R14C15R14C16R14C17R14C18R14C19R14C20R14C21R14C22R14C23R14C24R14C7R15C8R15C9R15C10R15C11R15C12R15C13R15C14R15C15R15C16R15C17R15C18R15C19R15C20R15C21R15C22R15C23R15C24R15C4R16C5R16C6R16C7R16C8R16C9R16C10R16C11R16C12R16C13R16C14R16C15R16C16R16C17R16C18R16C19R16C20R16C21R16C22R16C23R16C24R16C4R17C5R17C6R17C7R17C8R17C9R17C10R17C11R17C12R17C13R17C14R17C15R17C16R17C17R17C18R17C19R17C20R17C21R17C22R17C23R17C24R17C9R18C10R18C11R18C12R18C13R18",

    enter: [
      {
        when: (F) => !F.clue_phone && !F.clue_cash && !F.clue_slip,
        objective: OBJ.search,
        lines: [
          { speaker: 'narrator', text: "You knock. Nothing. You try the handle and it gives — she left it open, which she never does." },
          { speaker: 'narrator', text: "Her window is open too. The fire escape ladder is down." },
          { speaker: 'july', sprite: 'july_idle', text: "She's on the roof, or she's in that grey car." },
          { speaker: 'july', sprite: 'july_idle', text: "Either way I've got about ten minutes in here, and I'm going to hate myself for all of them." },
          { speaker: 'narrator', text: "(Find three things. Then decide what kind of brother you are.)" },
        ],
      },
      {
        when: (F) => F.confronted && !F.balcony_called,
        set: { balcony_called: true },
        objective: OBJ.balcony,
        lines: [
          { speaker: 'narrator', text: "Her room is empty. The plate of rice you left by the door hasn't been touched." },
          { speaker: 'narrator', text: "Through the wall you can hear the balcony door scrape open." },
        ],
      },
    ],

    interacts: [
      // Door out
      { cells: "C9R18C10R18C11R18C12R18C13R18", icon: "C11R19", branches: [{ goto: 'scene-2', at: 'C13R15' }] },

      // ── Clue 1: the second phone ──
      {
        cells: "C15R9C16R9C17R9C15R10C16R10C17R10",
        icon: "C16R8",
        branches: [
          {
            when: (F) => !F.clue_phone,
            set: { clue_phone: true },
            lines: [
              { speaker: 'narrator', text: "Under the desk, taped to the underside of the drawer: a second phone. Cheap, prepaid, three weeks old." },
              { speaker: 'narrator', text: "It isn't locked. Nobody locks a phone they think nobody knows about." },
              { speaker: 'phone', text: "you up" },
              { speaker: 'phone', text: "who were you with today. don't lie i'll know" },
              { speaker: 'phone', text: "im not angry im just disappointed you'd rather be in that house than with me" },
              { speaker: 'phone', text: "come out. bring what we talked about. your brother won't even notice" },
              { speaker: 'june', sprite: 'june_anxious', text: "(sent 4:02am) sorry sorry i'm coming don't be mad" },
              { speaker: 'july', sprite: 'july_angry', text: "...She apologised four times in one screen." },
              { speaker: 'july', sprite: 'july_idle', text: "I know that shape. She learned it in this house. She learned it from watching me manage him." },
            ],
          },
          { lines: [{ speaker: 'narrator', text: "The phone is face-down on the desk where you left it. Still buzzing." }] },
        ],
      },

      // ── Clue 2: the money tin ──
      {
        cells: "C21R14C22R14C23R14C21R15C22R15C23R15",
        icon: "C22R13",
        branches: [
          {
            when: (F) => !F.clue_cash,
            set: { clue_cash: true },
            lines: [
              { speaker: 'narrator', text: "In the nightstand, inside a biscuit tin: forty dollars in fives, folded flat, and a bus timetable with one Sunday circled." },
              { speaker: 'narrator', text: "Under the notes, a receipt from a petrol station eighty kilometres out of the city." },
              { speaker: 'july', sprite: 'july_idle', text: "She took forty and she saved forty. She wasn't stealing to spend. She was stealing to leave." },
              { speaker: 'july', sprite: 'july_idle', text: "...With him." },
            ],
          },
          { lines: [{ speaker: 'narrator', text: "Forty dollars in a biscuit tin. A Sunday circled in pen." }] },
        ],
      },

      // ── Clue 3: the drawing / the note ──
      {
        cells: "C7R14C8R14C7R15C8R15",
        icon: "C6R14",
        branches: [
          {
            when: (F) => !F.clue_slip,
            set: { clue_slip: true },
            lines: [
              { speaker: 'narrator', text: "The laundry basket. Under it, a school notebook with the covers curled." },
              { speaker: 'narrator', text: "The last page isn't schoolwork. It's a list, in her handwriting, titled REASONS TO STAY." },
              { speaker: 'narrator', text: "There are two items. The first is 'July'. It has a line through it." },
              { speaker: 'july', sprite: 'july_idle', text: "..." },
              { speaker: 'narrator', text: "The second is 'the balcony in summer'. That one isn't crossed out." },
              { speaker: 'july', sprite: 'july_idle', text: "When did I get crossed off my sister's list of reasons." },
            ],
          },
          { lines: [{ speaker: 'narrator', text: "REASONS TO STAY. Two items. One crossed out." }] },
        ],
      },

      // ── The mirror ──
      {
        cells: "C8R11C8R12C8R13",
        icon: "C6R11",
        branches: [
          {
            lines: [
              { speaker: 'narrator', text: "The long mirror is cracked corner to corner. It's been like that since the night Dad threw the remote." },
              { speaker: 'narrator', text: "She never asked for a new one. She just learned where to stand so the crack doesn't cross her face." },
            ],
          },
        ],
      },

      // ── The confrontation ──
      {
        cells: "C11R16C12R16C13R16C14R16C15R16C16R16C11R17C12R17C13R17C14R17C15R17C16R17",
        icon: "C13R15",
        branches: [
          {
            when: (F) => clues(F) < 3 && !F.confronted,
            lines: [
              { speaker: 'july', sprite: 'july_idle', text: "Not yet. If I go to her with half of it, she'll talk me out of the half I have." },
              { speaker: 'narrator', text: "(Find all three things first.)" },
            ],
          },
          {
            when: (F) => !F.confronted,
            set: { confronted: true },
            objective: OBJ.confront,
            lines: [
              { speaker: 'narrator', text: "The window frame creaks. She comes in feet-first, the way she has since she was ten, and stops dead when she sees you standing in her room." },
              { speaker: 'june', sprite: 'june_anxious', text: "...What are you doing." },
              { speaker: 'narrator', text: "The tin is open on the bed. The phone is face-up on the desk. There's no version of this where you were just passing through." },
              { speaker: 'june', sprite: 'june_upset', text: "You went through my things." },
              { speaker: 'july', sprite: 'july_idle', text: "Who is Kade." },
              { speaker: 'june', sprite: 'june_upset', text: "You went through my THINGS, July—" },
              { speaker: 'july', sprite: 'july_angry', text: "Who is he." },
              { speaker: 'june', sprite: 'june_smug', text: "He's someone who asks me how my day was. Try it sometime." },
              { speaker: 'narrator', text: "It lands exactly where she aimed it." },
              {
                speaker: 'narrator',
                text: "How do you answer that?",
                choices: [
                  {
                    label: '"You\'re sixteen. It\'s over. I\'ll end it myself."',
                    set: { pressed: true, trust: -1 },
                    lines: [
                      { speaker: 'july', sprite: 'july_angry', text: "You're sixteen and he's twenty-six and he had you walk into Oyo's alone at four in the morning while he sat in the car." },
                      { speaker: 'july', sprite: 'july_angry', text: "It's finished. Give me the phone. If I have to, I'll find him myself." },
                      { speaker: 'june', sprite: 'june_upset', text: "There it is." },
                      { speaker: 'june', sprite: 'june_upset', text: "You sound exactly like him, you know that? Not the words. The voice." },
                      { speaker: 'july', sprite: 'july_idle', text: "Don't." },
                      { speaker: 'june', sprite: 'june_upset', text: "'Give me the phone.' 'It's finished.' 'I'll handle it.'" },
                      { speaker: 'june', sprite: 'june_smug', text: "You've been running this house since you were twelve and now there's nothing left in it to run except me." },
                      { speaker: 'narrator', text: "She takes the phone off the desk and walks out. She doesn't slam the door. Somehow that's worse." },
                    ],
                  },
                  {
                    label: '"I found your list. I got crossed out."',
                    set: { pressed: false, trust: 1 },
                    lines: [
                      { speaker: 'july', sprite: 'july_idle', text: "I found your notebook. The list." },
                      { speaker: 'june', sprite: 'june_anxious', text: "...That's nothing. That's from ages ago." },
                      { speaker: 'july', sprite: 'july_idle', text: "I was on it. And then I wasn't." },
                      { speaker: 'july', sprite: 'july_idle', text: "I'm not asking about him yet. I'm asking when that happened. Because I didn't notice, June, and I notice everything in this house." },
                      { speaker: 'narrator', text: "Her mouth opens. Closes. She sits down on the floor with her back against the bed, still in her jacket." },
                      { speaker: 'june', sprite: 'june_upset', text: "You notice the bills. You notice the bottles. You notice when he's in a mood." },
                      { speaker: 'june', sprite: 'june_upset', text: "You've never once noticed me when nothing was wrong." },
                      { speaker: 'july', sprite: 'july_idle', text: "..." },
                      { speaker: 'june', sprite: 'june_anxious', text: "I'm going out on the balcony. Come out. Don't bring the voice you just used." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            objective: OBJ.balcony,
            lines: [{ speaker: 'narrator', text: "She's not here. The balcony door is open." }],
          },
        ],
      },
    ],
  };

  // ═══════════════════════════════════════════════════════
  //  BALCONY — the closing scene
  // ═══════════════════════════════════════════════════════
  scenes['scene-1.5'] = {
    background: 'assets/balcony.png',
    fitScale: 0.6,
    spawn: { col: 15, row: 14 },
    walkable:
      "C7R9C8R9C9R9C10R9C11R9C12R9C13R9C14R9C15R9C16R9C17R9C18R9C19R9C20R9C21R9C22R9C23R9C24R9C7R10C8R10C9R10C10R10C11R10C12R10C13R10C14R10C15R10C16R10C17R10C18R10C19R10C20R10C21R10C22R10C23R10C24R10C7R11C8R11C9R11C10R11C11R11C12R11C13R11C14R11C15R11C16R11C17R11C18R11C19R11C20R11C21R11C22R11C23R11C24R11C7R12C8R12C9R12C10R12C11R12C12R12C13R12C14R12C15R12C16R12C17R12C18R12C19R12C20R12C21R12C22R12C23R12C24R12C7R13C8R13C9R13C10R13C11R13C12R13C13R13C14R13C15R13C16R13C17R13C18R13C19R13C20R13C21R13C22R13C23R13C24R13C4R11C5R11C6R11C4R12C5R12C6R12C4R13C5R13C6R13C25R11C26R11C27R11C25R12C26R12C27R12C25R13C26R13C27R13C9R14C10R14C11R14C12R14C13R14C14R14C15R14C16R14C17R14C18R14C19R14C20R14C21R14C22R14",

    props: [
      { sprite: 'june_idle', cell: 'C13R10', scale: 0.9, when: (F) => F.balcony_called && !F.chapter_done },
    ],

    enter: [
      {
        when: (F) => F.balcony_called && !F.chapter_done,
        lines: [
          { speaker: 'narrator', text: "She's at the railing with her sleeves pulled over her hands, looking down at the car park where the grey car isn't parked yet." },
          { speaker: 'narrator', text: "(Go and stand next to her.)" },
        ],
      },
    ],

    interacts: [
      // Railing
      {
        cells: "C15R9C16R9C17R9C18R9C19R9",
        icon: "C17R7",
        branches: [
          {
            when: (F) => !F.balcony_called,
            lines: [
              { speaker: 'narrator', text: "Eleven floors of warm air moving up past your face. Two of the balcony rails are still bent from the summer you and June tried to hang a bedsheet as a sail." },
              { speaker: 'july', sprite: 'july_idle', text: "She was so sure the whole building would take off." },
            ],
          },
          { lines: [{ speaker: 'narrator', text: "The car park. Empty. For now." }] },
        ],
      },

      // Back inside
      {
        cells: "C12R14C13R14C14R14C15R14C16R14C17R14C18R14C19R14",
        icon: "C15R12",
        branches: [
          {
            when: (F) => F.balcony_called && !F.chapter_done,
            lines: [{ speaker: 'july', sprite: 'july_idle', text: "No. Not this time. This time I stay out here until she's finished talking." }],
          },
          {
            lines: [
              {
                speaker: 'narrator',
                text: "Go back inside?",
                choices: [
                  { label: 'Yes', goto: 'scene-1', at: 'C15R15' },
                  { label: 'No' },
                ],
              },
            ],
          },
        ],
      },

      // ── June: the final conversation ──
      {
        cells: "C11R10C12R10C13R10C14R10C11R11C12R11C13R11C14R11",
        icon: "C13R9",
        branches: [
          {
            when: (F) => F.balcony_called && !F.chapter_done,
            set: { chapter_done: true },
            objective: OBJ.end,
            lines: [
              { speaker: 'narrator', text: "You stand next to her. Neither of you looks at the other. It's easier at this angle; it always has been." },
              { speaker: 'june', sprite: 'june_idle', text: "You washed the dishes." },
              { speaker: 'july', sprite: 'july_idle', text: "Yeah." },
              { speaker: 'june', sprite: 'june_idle', text: "In cold water." },
              { speaker: 'july', sprite: 'july_idle', text: "There isn't any other kind." },
              { speaker: 'narrator', text: "Below, someone drags a bin across concrete. Eleven floors up it sounds almost like the sea." },
              { speaker: 'june', sprite: 'june_anxious', text: "He shouts at me too, you know. Kade. Not like Dad. Quieter. He does it in a way where I end up saying sorry." },
              { speaker: 'july', sprite: 'july_idle', text: "Then why." },
              { speaker: 'june', sprite: 'june_upset', text: "Because when he's angry at me, he's angry at ME." },
              { speaker: 'june', sprite: 'june_upset', text: "In this house nobody's ever angry at me. Nobody's anything at me. You just... absorb it. You take the hit and you clean the kitchen and you go to bed." },
              { speaker: 'june', sprite: 'june_anxious', text: "Do you know what it's like growing up next to someone who never once said 'this is not okay'? You just made it survivable. Every single day. Until surviving it was normal." },
              { speaker: 'july', sprite: 'july_idle', text: "I was thirteen, June." },
              { speaker: 'june', sprite: 'june_upset', text: "I know. I know. That's the worst part. There's nobody to be angry at, so I'm angry at you." },
              { speaker: 'narrator', text: "Down in the car park, headlights swing in and stop. Grey car. Engine left running." },
              { speaker: 'june', sprite: 'june_anxious', text: "That's him." },
              {
                speaker: 'narrator',
                text: "You have about ten seconds.",
                choices: [
                  {
                    label: '"Don\'t go. Please."',
                    set: { trust: 1 },
                    lines: [
                      { speaker: 'july', sprite: 'july_idle', text: "Don't go down there. Not tonight. Please." },
                      { speaker: 'narrator', text: "It's the first time in four years you've asked her for anything instead of telling her." },
                      { speaker: 'june', sprite: 'june_anxious', text: "..." },
                      { speaker: 'june', sprite: 'june_upset', text: "Say it again tomorrow. When it's not an emergency. When nothing's happening and you say it anyway." },
                      { speaker: 'june', sprite: 'june_anxious', text: "If you can do that, I'll listen. I'm serious, July. Tomorrow." },
                      { speaker: 'narrator', text: "Then she's climbing over the rail onto the fire escape, and the metal rings twice, and she's gone." },
                    ],
                  },
                  {
                    label: 'Say nothing. Let her go.',
                    set: { trust: -1 },
                    lines: [
                      { speaker: 'narrator', text: "You open your mouth. What comes out is nothing." },
                      { speaker: 'narrator', text: "Eleven years of keeping the peace and your body simply will not make the noise." },
                      { speaker: 'june', sprite: 'june_upset', text: "Yeah. That's what I thought." },
                      { speaker: 'narrator', text: "Then she's climbing over the rail onto the fire escape, and the metal rings twice, and she's gone." },
                    ],
                  },
                ],
              },
              { speaker: 'narrator', text: "The car pulls out. You watch its lights until the building takes them." },
              { speaker: 'narrator', text: "Behind you, in the flat, a chair scrapes. Dad's awake. He's found something — the bottles, the book at Oyo's, the missing forty. Something. There's always something." },
              { speaker: 'dad', text: "JULY. Get in here." },
              { speaker: 'july', sprite: 'july_idle', text: "...Coming." },
              { speaker: 'narrator', text: "You stay at the railing for four more seconds. You'll spend the next four years telling yourself it was three." },
              { speaker: 'narrator', text: "", end: true },
            ],
          },
          {
            when: (F) => F.chapter_done,
            lines: [{ speaker: 'narrator', text: "The railing is cold. The car park is empty again." }],
          },
        ],
      },
    ],
  };

  window.STORY = {
    scenes: scenes,
    characters: characters,
    initialFlags: INITIAL_FLAGS,
    objectives: OBJ,
    startScene: 'scene-1',
    // Derived flags recalculated after every change.
    derive: function (F) {
      F.chores_done = !!(F.tv_off && F.dishes_done && F.bottles_hidden);
      return F;
    },
    // Objective shown for the current state (fallback if none set explicitly).
    objectiveFor: function (F) {
      if (F.chapter_done) return '';
      if (F.confronted) return OBJ.balcony;
      if (F.power_back) return clues(F) < 3 ? OBJ.search : OBJ.confront;
      if (F.has_fuse) return OBJ.back;
      if (F.checked_breaker) return OBJ.store;
      if (F.chores_done) return OBJ.breaker;
      if (F.kitchen_intro) return OBJ.chores;
      if (F.met_june) return OBJ.kitchen;
      if (F.found_money) return OBJ.leave;
      if (F.read_email) return OBJ.money;
      if (F.woke) return OBJ.email;
      return OBJ.wake;
    },
    // Content of the in-game computer screen.
    computer: function (F) {
      return [
        { from: 'Riverside High — Attendance Office', subj: 'FINAL NOTICE: J. Aster, Year 11', body: 'Twenty-two unexplained absences this term. A guardian must attend a meeting on Monday. Notes submitted to date appear to carry an inconsistent signature.' },
        { from: 'mum (no subject)', subj: 'draft — never sent, 3 years old', body: 'july i know youre the one reading these. is she eating. is she talking to anyone. tell her i' },
        { from: 'Northbank Power', subj: 'Disconnection scheduled', body: 'Account 4471-B is 62 days overdue. Supply will be interrupted without further notice.' },
        { from: 'Shift Roster — Nightline Logistics', subj: 'You are rostered: 6 of 7 nights', body: 'Sun, Mon, Tue, Wed, Fri, Sat. 22:00-06:00. Overtime available.' },
      ];
    },
  };
})();
