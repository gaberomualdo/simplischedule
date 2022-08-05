import { CheckIcon, ClipboardCheckIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

import Card from "../components/card";
import Head from "next/head";
import { useRouter } from "next/router";

import Event from "../lib/Event";
import {
  checkPinExists,
  makeTitle,
  boxStyles,
  formatNum,
  newEvent,
} from "../lib/util";
import { uuid } from "uuidv4";
import {
  ChevronRightIcon,
  ClipboardCopyIcon,
  DownloadIcon,
} from "@heroicons/react/solid";
import { EyeIcon, UserIcon, UsersIcon } from "@heroicons/react/outline";
import Timer from "../components/timer";

const columns = [
  {
    id: "main",
    name: "Join the Event",
    title: "Join the Event",
    desc: "Want to join event? Do so now!",
    icon: UserIcon,
  },
];

const asArray = (e) => {
  if (!e) return [];
  return Object.keys(e)
    .sort()
    .map((key) => e[key]);
};
const newEventID = () => new Date().getTime().toString() + uuid();

const eventPage = () => {
  const router = useRouter();
  const { pin } = router.query;
  const [event, setevent] = useState(null);
  const [clientID, setClientID] = useState("");
  const [copied, setCopied] = useState(false);
  const [focusedColumn, setFocusedColumn] = useState(null);
  const [highlightedCardID, setHighlightedCardID] = useState(null);

  const addEvent = async (evt, callback = () => {}) => {
    const db = firebase.database();
    const { pin } = router.query;
    if (pin === undefined) return;
    await db.ref(`${pin}/${newEventID()}`).set(evt);
    await callback();
  };

  useEffect(() => {
    (async () => {
      const db = firebase.database();
      const { pin } = router.query;
      if (pin === undefined) return;
      if (!(await checkPinExists(pin))) {
        window.open("/", "_self");
      }
      const clientID = localStorage.getItem("simplischedule-client-id");
      setClientID(clientID);
      const pinRef = db.ref(pin);
      // TODO: move to 'child added' event to make this more performant
      pinRef.on("value", (snapshot) => {
        const events = asArray(snapshot.val());
        const newEvent = new Event(events);
        setevent(newEvent);
      });
    })();
  }, [router.query]);

  if (!event) {
    return (
      <div className="flex items-center justify-center h-screen w-full text-2xl text-gray-700 font-semibold">
        Loading...
      </div>
    );
  }

  if (!event.users.includes(clientID)) {
    addEvent({
      type: "user-joined",
      clientID,
    });
  }

  const getCardsInColumn = (columnID) => {
    let cards = event.getCards().filter((e) => e.parentCardID === columnID);
    return cards;
  };

  return (
    <>
      <Head>
        <title>{makeTitle(`Event ${pin || ""}`)}</title>
      </Head>
      <div className="w-full min-h-screen flex flex-col bg-gray-100">
        <div
          className="z-50 sticky top-0 w-full border-gray-200 shadow-md bg-white flex justify-between items-center h-20 px-4"
          style={{ flexShrink: 0 }}
        >
          <div className="flex items-center">
            <h1 className="text-2xl font-medium pl-2 text-gray-700">
              {event.name}
            </h1>
          </div>

          <div className="flex">
            <div className="hidden sm:flex items-center">
              <EyeIcon className="mr-1 w-5 h-5 text-gray-400" />
              <p className="text-gray-500 text-md mr-2 xl:mr-5">
                {event.users.length}
              </p>
            </div>
            <button
              type="button"
              className={
                (copied ? "text-blue-600" : "text-gray-700") +
                " transition-all hidden xl:inline-flex items-center px-3 py-2 bg-gray-200 text-sm rounded outline-none bg-white hover:bg-gray-300"
              }
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 1000);
              }}
            >
              {copied ? "Copied!" : "Copy URL"}
              {copied ? (
                <ClipboardCheckIcon
                  className="ml-2 -mr-1 h-5 w-5"
                  aria-hidden="true"
                />
              ) : (
                <ClipboardCopyIcon
                  className="ml-2 -mr-1 h-5 w-5"
                  aria-hidden="true"
                />
              )}
            </button>
            <button
              onClick={() => newEvent()}
              type="button"
              className="ml-3 transition-all inline-flex items-center px-3 py-2 border border-transparent text-sm rounded text-white bg-blue-600 hover:bg-blue-700 outline-none"
            >
              Start a New Event
              <ChevronRightIcon
                className="ml-1 -mr-1 h-5 w-5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
        <div
          className={
            "p-3 flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 xl:flex mx-auto w-full max-w-2xl"
          }
        >
          {columns.map((col, i) => {
            const cards = getCardsInColumn(col.id);
            return (
              <div
                className={
                  "flex-1 overflow-y-auto bg-white border shadow-lg rounded-md pb-6"
                }
              >
                <div>
                  <div
                    className={`mt-4 mb-4 mx-4 relative rounded-md border-2 pr-3 ${
                      focusedColumn === col.id ? "border-gray-400" : ""
                    }`}
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <col.icon
                        className={`h-5 w-5 ${
                          focusedColumn === col.id
                            ? "text-gray-500"
                            : "text-gray-400"
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="text"
                      className="outline-none py-3 block w-full pl-10 border-gray-300 rounded-md"
                      placeholder={"Enter your name to join the event"}
                      spellCheck={false}
                      onFocus={() => setFocusedColumn(col.id)}
                      onBlur={() => setFocusedColumn(null)}
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (() => {
                          if (e.target.value.trim() === "") return;
                          e.preventDefault();
                          addEvent({
                            type: "add-card",
                            userID: clientID,
                            cardID: uuid(),
                            text: e.target.value,
                            parentCardID: col.id,
                          });
                          e.target.value = "";
                        })()
                      }
                    />
                  </div>
                  <div className={`border-t border-gray-200`}>
                    {cards.map((card, i) => (
                      <Card
                        setHighlightedCardID={setHighlightedCardID}
                        getCardByID={(id) => event.cards[id]}
                        highlighted={highlightedCardID === card.id}
                        card={{ ...card, number: i + 1 }}
                        clientID={clientID}
                        colID={col.id}
                        addEvent={addEvent}
                        childCards={event
                          .getCards()
                          .filter((e) => e.parentCardID === card.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default eventPage;
