import {
  CheckCircleIcon,
  ChevronDoubleRightIcon,
  QuestionMarkCircleIcon,
  ThumbUpIcon,
} from "@heroicons/react/outline";
import config from "./config";

export function classes(...x) {
  return x.join(" ");
}
export function checkPinExists(pin) {
  return new Promise((resolve) => {
    if (process.browser) {
      window.database
        .ref(pin)
        .once("value")
        .then((snapshot) => {
          resolve(snapshot.val() !== null);
        });
    } else {
      resolve(true);
    }
  });
}
const newPin = () => (Math.floor(Math.random() * 90000) + 10000).toString();
export async function newEvent() {
  let pin = newPin();
  while (await checkPinExists(pin)) {
    pin = newPin();
  }
  const name = prompt("Enter your event name:");
  await window.database.ref(pin).set({
    0: {
      type: "event-started",
      name,
    },
  });
  window.open(`/${pin}`, "_self");
}
export function makeTitle(title) {
  if (title.length === 0) return config.name;
  return `${title} • ${config.name}`;
}

export const formatNum = (n) =>
  n.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
