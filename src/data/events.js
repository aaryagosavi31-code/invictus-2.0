// Content sourced from the Invictus 2.0 brochure (DISCE eXpress).
const events = [
  {
    id: 'press',
    theme: 'press',
    name: 'Press Files',
    genre: 'Journalism & Investigation',
    teamSize: '2 Members',
    tagline:
      'Some stories are hidden in plain sight, waiting to be uncovered. The Press Files is a three-round investigation challenge where teams must observe, decode, connect, and piece together a story that is never directly handed to them. Each round tests a different skill — speed, observation, and deduction — with clues gradually coming together as teams progress.',
    rounds: [
      {
        numeral: 'I',
        title: 'The Gamemaster',
        quote: 'Not even Ares knew what battle awaited him until it was already upon him.',
        description:
          'Before any story can be told, you must first prove you are worthy of telling it. The Gamemaster brings a series of rapid, unpredictable challenges where instructions may change, time may run short, and distractions can come from anywhere. There is no fixed format and no way to fully prepare. Your only weapon is your ability to think fast and adapt without hesitation.',
      },
      {
        numeral: 'II',
        title: "Pandora's Last Cue",
        quote: 'Even Hermes left a trail for those sharp enough to follow it.',
        description:
          'You will receive a newsletter that looks completely ordinary. It is not. Hidden within its headlines, captions, images, page numbers, and margins are clues waiting to be discovered. Each solved clue leads to the next step, with the trail growing harder as you go. You are not just reading, you are investigating. Only the most observant teams will reach the end of the trail and unlock the final round.',
      },
      {
        numeral: 'III',
        title: 'Spill the Ambrosia',
        quote: 'The Fates weave many threads. Only the wise see the pattern beneath them.',
        description:
          'You will receive a collection of stories, incidents, quotes, rumours, and fragments that seem to have nothing in common. Hidden across them is a single narrative, woven through subtle details and carefully placed clues. It is never stated outright. You must read between the lines, connect the unrelated, and uncover what the text leaves unsaid. Once you find the story, write it clearly and compellingly, like a story worth reading.',
      },
    ],
  },
  {
    id: 'muses',
    theme: 'muses',
    name: 'Muses Gambit',
    genre: 'Words & Wit',
    teamSize: '3 Members',
    tagline:
      'A three-round improvisation challenge where teams must think on their feet, respond to the unexpected, build scenes from nothing, and keep the audience engaged — all without knowing what comes next. Each round introduces a new format and challenge, testing quick thinking, teamwork, spontaneity, and the ability to turn even the strangest situation into an entertaining performance. With no script or preparation to rely on, every response happens in the moment.',
    rounds: [
      {
        numeral: 'I',
        title: 'Wits and Wisdom',
        quote: 'Apollo valued wit above all offerings, and he always knew when you were guessing.',
        description:
          'No preparation. No second chances. No time to think twice. A rapid-fire quiz covering general knowledge, current affairs, pop culture, hypothetical scenarios, and questions nobody saw coming. All three team members compete together, responding within seconds as the questions unfold. The topics will shift, the questions will surprise you, and unexpected twists may appear at any point. The only way through is to trust what you know, think fast, and say it faster.',
      },
      {
        numeral: 'II',
        title: 'The Unsung Warriors',
        quote: 'In the great theatres of Athens, the Chorus did not just watch. They gave the story its soul.',
        description:
          'Two performers take the stage and build a scene from nothing, given only a situation and a theme. The third member becomes the Chorus, shaping the scene through sound, rhythm, beatboxing, narration, or improvised song. At key moments, the Chorus steps in, pushing the performers to respond, express, and seamlessly return to the scene. Before the round begins, your team makes a prediction, with the most accurate one earning a strategic advantage in the final round.',
      },
      {
        numeral: 'III',
        title: 'The Convergence',
        quote: 'Three rivers, born in different mountains, destined to meet at the same sea.',
        description:
          "Three members. Three worlds. One stage. Zero preparation. You'll enter knowing only your own reality, while your teammates enter with theirs. But when the Convergence Bell rings, those separate worlds will collide, and your team will have to turn the unexpected chaos into one story. Adapt to the unknown, stay true to your character, and make the impossible feel inevitable.",
      },
    ],
  },
  {
    id: 'satyrical',
    theme: 'satyrical',
    name: 'Satyrical',
    genre: 'Parody & Performance',
    teamSize: '4 Members',
    tagline:
      'Greek mythology meets unexpected situations in this three-round parody and performance challenge. Teams bring gods, heroes, monsters, and legends into worlds they were never meant to be in through humour, skits, improvisation, and courtroom comedy. Across each round, teams face a new performance format, testing their creativity, acting, adaptability, and ability to entertain as a team.',
    rounds: [
      {
        numeral: 'I',
        title: 'The Olympian Household Chaos',
        quote: 'Even on Olympus, someone always forgets to take out the trash.',
        description:
          'Mount Olympus has a leaking tap, the Wi-Fi is down, groceries are missing, and somehow Zeus is being blamed for all of it. Your team will receive four Greek mythological characters and an ordinary household crisis, then bring them into the modern world through a short parody skit. Use their personalities, powers, and ancient grudges to create chaos that feels unmistakably them. Historical accuracy takes a backseat to creativity, comedy, and recognisable characters.',
      },
      {
        numeral: 'II',
        title: 'The Mythological Collaboration',
        quote: 'One event. Four witnesses. Not one of them agrees on what happened.',
        description:
          'A famous mythological scene has taken place, but no two people saw it the same way. Your team will re-enact one legendary moment through four distinct perspectives — the Bystander, the Instigator, the Victim, and more. Just when you find your rhythm, the moderator can call a shift, forcing roles to swap immediately while the scene continues without breaking flow. With almost no prep time, all four members must perform and adapt together.',
      },
      {
        numeral: 'III',
        title: 'The Trial Of Olympus',
        quote: 'All rise. The gods are in session, and they are not known for their patience.',
        description:
          'The courtroom of Olympus is now open. Your team will receive a mythology-inspired case with a charge, plaintiff, defendant, evidence, and compulsory elements that must appear in your performance. Each member takes on a role: Judge, Lawyer, Witness, or Defendant. This is not about justice. It is about spectacle. Every line must land, every prop must fit, and every god is watching.',
      },
    ],
  },
]

export default events
