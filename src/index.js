const React = require('react');
const { List } = require('immutable');
const { createGame, revealTile } = require('./script');

const div = React.DOM.div;

const Board = game => {

};

const undo = () => {
    if (gameHistory.length === 0) return;
    game = gameHistory.last();
    gameHistory = gameHistory.pop();

    render();
};

const UndoButton = createComponent(() => button({ onClick: undo}, 'Undo'));

const Tile = createComponent(tile => {
    if (tile.get('isRevealed')) {
        return div({className: `tile ${tile.get('isMine') ? ' mine' : ''}` },
            tile.get('threatCount') > 0 ? tile.get('threatCount') : '');
    }

    return div({
        className: 'tile',
        onClick: () => clickTile(tile.get('id')),
    }, div({className: 'lid'}, ''));
});

const GameUI = createComponent(game => div({}, Board(game), UndoButton()));

let game = createGame({cols: 16, rows: 16, mines: 48});
let gameHistory = List();

const clickTile = tileId => {
    gameHistory = gameHistory.push(game);
    game = revealTile(game, tileId);
    render();
};
const render = () => React.render(GameUI(game), document.getElementById('board'));

render();
