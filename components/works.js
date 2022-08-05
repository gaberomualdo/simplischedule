const features = [
  {
    name: "Create an Event",
    description: `In one click, create a new event that includes signups. Anyone can signup super fast.`,
  },
  {
    name: "Invite Your Friends",
    description:
      "Easily share your event with a single invite link. This can be created and shared with one click.",
  },
  {
    name: "Join Events",
    description:
      "For the people you invite, they can join your event with one click. No account or signup required.",
  },
  {
    name: "Attend an Event",
    description:
      "Now is the time for people to attend your event! Check your attendees list at your event for everyone that comes.",
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-gray-50 overflow-hidden border-b border-t border-gray-200">
      <div className="mx-auto py-12 px-4 sm:px-12 lg:py-20 lg:px-20 lg:grid lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:mt-0 lg:col-span-7 pr-8">
          <p className="text-3xl font-bold text-gray-900">How It Works</p>
          <p className="mt-3 mb-10 text-lg text-gray-500">
            Here's how our incredibly intuitive and simple tool for events works
            today.
          </p>
          <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:grid-flow-row sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
            {features.map((feature, i) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute h-10 w-10 bg-blue-500 text-white flex justify-center items-center rounded-full">
                    <p className="text-lg font-light">{i + 1}</p>
                  </div>
                  <p className="ml-14 pt-1 text-xl leading-8 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-14 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hidden lg:flex lg:col-span-3">
          <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
            <img
              className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
              src="/demo.jpg"
              alt="Product demo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
