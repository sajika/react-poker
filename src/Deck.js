import React, { Component } from "react";
import "./Deck.css";
import CardContainer from "./CardContainer";

const range = (start, count) =>
  Array.apply(0, Array(count)).map((element, index) => {
    return index + start;
  });

const spreadShuffle = i => ({
  x: Math.cos(i) * Math.floor(Math.random() * 200 + 1),
  y: Math.sin(i) * Math.floor(Math.random() * 200 + 1),
  z: 0
});

const spread = i => ({
  x: i * 12 - 100,
  y: 50,
  z: 0
});

const fan = i => ({
  x: Math.cos(i) * 95 + 400,
  y: Math.sin(i) * 95,
  z: i
});

const stack = i => ({
  x: 0.1 * i,
  y: 0.1 * i,
  z: i
});

function convertSuit(suit) {
  switch (suit) {
    case 1:
      return "h";
    case 2:
      return "d";
    case 3:
      return "s";
    case 4:
      return "c";
  }
}

function convertRank(rank) {
  if (rank === 1) return "A";
  if (rank < 11) return rank;

  switch (rank) {
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
  }
}

const getSuit = i => convertSuit((i / 13) | 0);

const getRank = i => convertRank(i % 13);

const getCard = i => ({
  suit: getSuit(i),
  rank: getRank(i)
});

class DeckContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { board: [] };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.board) {
      this.setState({ board: nextProps.board });
    }
  }

  render() {
    const { board } = this.state;
    const { size, flipOnHover, boardYoffset, boardXoffset } = this.props;

    return (
      <div>
        {range(13, 65).map(i => {
          const card = getCard(i);

          return card.rank ? (
            <CardContainer
              index={i}
              key={card.rank + card.suit}
              board={board}
              card={card}
              faceDown={true}
              size={size}
              boardXoffset={boardXoffset} // board x offset relative to stack
              boardYoffset={boardYoffset} // board y offset relative to stack
              mapXYZ={stack}
              flipOnHover={flipOnHover}
            />
          ) : null;
        })}
      </div>
    );
  }
}

DeckContainer.defaultProps = {
  size: 200,
  boardXoffset: 475,
  boardYoffset: 300,
  flipOnHover: true
};

export default DeckContainer;
