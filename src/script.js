const { List, Map } = require('immutable');

const repeat = (num, item) => {
    let items = [];

    while (num--) {
        items.push(item);
    }

    return List(items);
};

const randomly = () => {
    return Math.random() - 0.5;
};

const initTiles = (rows, cols, mines) => {
    return repeat(mines, Map({isMine: true})).
            concat(repeat(rows * cols - mines, Map({}))).
            sort(randomly).
            map((item, idx) => {
                return item.set('id', idx);
    })
};

const createGame = ({rows, cols, mines}) => {
    return Map({
        rows,
        cols,
        tiles: initTiles(rows, cols, mines)
    })
};

const revealMine = tile => tile.get('isMine') ? tile.set('isRevealed', true) : tile;

const revealMines = game => {
    // return game.set('tiles', game.get('tiles').map(tile => tile.get('isMine') ? tile.set('isRevealed', true) : tile))
    // By using the updateIn method from Immutable JS
    return game.updateIn(['tiles'],
            tiles => tiles.map(revealMine)
    )
};

const lost = game => {
    return revealMines(game.set('isDead', true));
};

const revealTile = (game, tileId) => {
    if (!game.getIn(['tiles', tileId])) return game;

    const updated = game.setIn(['tiles', tileId, 'isRevealed'], true);
    // Without Immutable JS it would look a bit like this below:
    // const tiles = game.get('tiles');
    // const tile = tiles.get(tileId);
    // const updatedTile = tile.set('isRevealed', true);
    // const updatedTiles = tiles.set(tileId, updatedTile);
    //
    // return game.set('tiles', updatedTiles)

    return game.getIn(['tiles', tileId, 'isMine']) ? lost(updated) : updated;
};

module.exports = {revealTile, createGame}