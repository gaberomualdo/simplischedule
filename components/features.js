import {
  CheckIcon,
  CursorClickIcon,
  LightningBoltIcon,
  LinkIcon,
} from "@heroicons/react/outline";

const features = [
  {
    name: "Effortless Setup",
    description:
      "Simply click the Start Event button and you're ready to go. No account sign-up or form required.",
    icon: CursorClickIcon,
  },
  {
    name: "Fast & Realtime",
    description:
      "You can be sure that signups in your events will be synced with your friends at all times.",
    icon: LightningBoltIcon,
  },
  {
    name: "Super Simple",
    description:
      "The app is super simple to use and fast to set up. You'll never use another events tool again.",
    icon: CheckIcon,
  },
  {
    name: "Easily Sharable",
    description:
      "Easily share your a link to your event with your friends, coworkers, or organization with the instant link copy button. Links to events can be shared with anyone.",
    icon: LinkIcon,
  },
];

export default function Features() {
  return (
    <div className="bg-white md:pt-6 md:pb-4" id="features">
      <div className="max-w-6xl mx-auto pt-12 md:py-12">
        <p className="text-3xl font-bold text-gray-900 text-center px-3">
          Features
        </p>
        <p className="mt-3 mb-10 text-lg text-gray-500 text-center px-3">
          A couple useful pieces of functionality that make Simplischedule a
          great tool for you.
        </p>
        <div className="border-gray-200 border-t md:border-none grid grid-cols-1 gap-x-4 md:gap-y-4 sm:grid-cols-2 lg:gap-x-6 lg:gap-y-6">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="transform transition-all px-6 py-8 border-b md:border border-gray-200 md:rounded-lg md:hover:bg-white md:hover:scale-105 md:hover:shadow md:cursor-default"
            >
              <div className="flex justify-center">
                <span className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 bg-opacity-10">
                  <feature.icon
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div className="mt-3">
                <h3 className="text-xl font-medium text-gray-700 text-center mb-4">
                  {feature.name}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
