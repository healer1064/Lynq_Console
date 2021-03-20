export default {
  plans: {
    month: {
      basic: "Free",
      silver: "9.99",
      premium: "29.99",
    },
    year: {
      basic: "Free",
      silver: "99.99",
      premium: "309.99",
    },
  },
  home: {
    stats: {
      today: {
        revenue: 63,
        session: 3,
        request: 4,
      },
      weekly: {
        revenue: 250,
        session: 8,
        request: 11,
      },
      monthly: {
        revenue: 1000,
        session: 16,
        request: 22,
      },
      yearly: {
        revenue: 4350,
        session: 33,
        request: 36,
      },
    },
  },
  appointments: {
    schedule: [],
    request: [
      {
        event_type: "Full Moon Meditation",
        duration: "60 min",
        price: "50",
        day: "Wednesday, February 22, 2021",
        time: "09:00 AM",
        made_by: "Bob.iger@disney.com",
        ago: "12 hours, 31 min ago",
      },
      {
        event_type: "Half Moon Meditation",
        duration: "30 min",
        price: "25",
        day: "Sunday, March 20, 2021",
        time: "10:00 AM",
        made_by: "John.regiani@gmail.com",
        ago: "12 hours, 31 min ago",
      },
    ],
  },
  setting: {
    setup: [],
    eventType: [
      {
        id: 1,
        event_type: "Full Moon Meditation",
        duration: "60 min",
        price: 50,
      },
      {
        id: 2,
        event_type: "Half Moon Meditation",
        duration: "30 min",
        price: 25,
      },
      {
        id: 3,
        event_type: "Meditation session for beginners",
        duration: "30 min",
        price: 50,
      },
    ],
  },
};
