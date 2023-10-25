const GameState = require('./src/GameState');

class Player {
  static get VERSION() {
    return 'Get playing';
  }

  static betRequest(gameState, bet) {
    var game = new GameState(gameState);
    if(game.bettingRound() === "pre flop") {
      bet(Math.max(0, game.me().score() * game.bigBlind()));
    } else {
      bet(game.toCall());
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;

