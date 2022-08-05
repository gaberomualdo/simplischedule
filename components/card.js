import { XIcon } from "@heroicons/react/outline";
import React from "react";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  render() {
    const { card, clientID, addEvent, colID } = this.props;
    const isOwnCard = card.userID === clientID;
    let rightSide = null;
    if (isOwnCard) {
      rightSide = (
        <div className="flex justify-end" style={{ minWidth: "2.5rem" }}>
          <button
            className={`transition-all bg-gray-200 rounded-full w-6 h-6 flex justify-center items-center text-gray-800 hover:text-white hover:bg-red-500`}
            onClick={() => {
              addEvent({
                type: "remove-card",
                cardID: card.id,
              });
            }}
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      );
    }
    return (
      <>
        <div
          ref={this.ref}
          className={"px-4 flex items-center border-b cursor-default"}
          data-card-id={card.id}
          data-col-id={colID}
          style={{
            transition: "background-color .25s",
            marginTop: this.props.highlighted || card.pinned ? "-1px" : "0",
          }}
        >
          <div
            className={`flex flex-1 items-center ${
              this.props.childCards.length > 0 ? "py-3" : "py-4"
            }`}
          >
            <span
              className="text-sm text-gray-400 w-9 flex-initial mono self-start pt-1.5"
              style={{ flexShrink: 0, userSelect: "none" }}
            >
              #{card.number}
            </span>
            <div className="flex-1" style={{ fontSize: 0, flexShrink: 1 }}>
              <div>
                <p
                  className={`text-base text-gray-700 py-1 ${
                    card.actioned ? "line-through opacity-60" : ""
                  }`}
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {card.text}
                </p>
              </div>
            </div>
          </div>
          <div
            className={"self-start flex items-center overflow-hidden py-4"}
            style={{ minHeight: "4rem" }}
          >
            {rightSide}
          </div>
        </div>
      </>
    );
  }
}
