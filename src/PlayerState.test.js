const PlayerState = require('./PlayerState');
const defaultGameState = require('./defaultGameState');

const buildPlayerStateWithDefaults = (state) => {
  return new PlayerState(Object.assign(defaultGameState.players[1], state));
}

const buildPlayerWithOffSuitCards = (rank1, rank2) => {
  return buildPlayerStateWithDefaults({
    "hole_cards": [
      {
          "rank": rank1,
          "suit": "hearts"
      },
      {
          "rank": rank2,
          "suit": "spades"
      }
    ]
  });
}

const buildPlayerWithOffSuitedCards = (rank1, rank2) => {
  return buildPlayerStateWithDefaults({
    "hole_cards": [
      {
          "rank": rank1,
          "suit": "hearts"
      },
      {
          "rank": rank2,
          "suit": "hearts"
      }
    ]
  });
}
        

test('Checks for pair correctly', () => {
  expect(buildPlayerWithOffSuitCards("A","9").hasPocketPair()).toBe(false);
  expect(buildPlayerWithOffSuitCards("3","9").hasPocketPair()).toBe(false);
  expect(buildPlayerWithOffSuitCards("A","K").hasPocketPair()).toBe(false);
  expect(buildPlayerWithOffSuitCards("A","A").hasPocketPair()).toBe(true);
  expect(buildPlayerWithOffSuitCards("4","4").hasPocketPair()).toBe(true);
});

test('Checks for suited correctly', () => {
  expect(buildPlayerWithOffSuitedCards("6","K").hasPocketSuited()).toBe(true);
  expect(buildPlayerWithOffSuitCards("A","A").hasPocketSuited()).toBe(false);
});

test('Finds highest value correctly', () => {
  expect(buildPlayerWithOffSuitCards("A","9").highestPocketValue()).toBe(14);
  expect(buildPlayerWithOffSuitCards("9","K").highestPocketValue()).toBe(13);
  expect(buildPlayerWithOffSuitCards("3","9").highestPocketValue()).toBe(9);
  expect(buildPlayerWithOffSuitCards("7","2").highestPocketValue()).toBe(7);
  expect(buildPlayerWithOffSuitCards("A","K").highestPocketValue()).toBe(14);
  expect(buildPlayerWithOffSuitCards("J","Q").highestPocketValue()).toBe(12);
  expect(buildPlayerWithOffSuitCards("J","J").highestPocketValue()).toBe(11);
  expect(buildPlayerWithOffSuitCards("4","4").highestPocketValue()).toBe(4);
});

test('Calculates Chen score as score of high card for connectors', () => {
  expect(buildPlayerWithOffSuitCards("A","K").chenScore()).toBe(10);
  expect(buildPlayerWithOffSuitCards("K","Q").chenScore()).toBe(8);
  expect(buildPlayerWithOffSuitCards("Q","K").chenScore()).toBe(8);
});

test('Doubles Chen score for pairs', () => {
  expect(buildPlayerWithOffSuitCards("K","K").chenScore()).toBe(16);
  expect(buildPlayerWithOffSuitCards("2","2").chenScore()).toBe(5);
});

test('Adds 2 to Chen score for suited', () => {
  expect(buildPlayerWithOffSuitedCards("A","K").chenScore()).toBe(12);
  expect(buildPlayerWithOffSuitedCards("Q","K").chenScore()).toBe(10);
});

test('Substract for gaps in Chen score', () => {
  expect(buildPlayerWithOffSuitCards("A","Q").chenScore()).toBe(9);
  expect(buildPlayerWithOffSuitCards("Q","A").chenScore()).toBe(9);
  expect(buildPlayerWithOffSuitCards("A","J").chenScore()).toBe(8);
  expect(buildPlayerWithOffSuitCards("A","10").chenScore()).toBe(6);
  expect(buildPlayerWithOffSuitCards("A","9").chenScore()).toBe(5);
  expect(buildPlayerWithOffSuitCards("A","8").chenScore()).toBe(5);
});

test('Add correction for gaps for low cards in Chen score', () => {
  expect(buildPlayerWithOffSuitCards("J","10").chenScore()).toBe(7);
  expect(buildPlayerWithOffSuitCards("J","9").chenScore()).toBe(6);
});

test('Round half points up for Chen score', () => {
    expect(buildPlayerWithOffSuitCards("9","7").chenScore()).toBe(5);
});

/*

Round half point scores up. (e.g. 7.5 rounds up to 8)
*/
