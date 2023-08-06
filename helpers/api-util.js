// Fetch data from firebase
export const getAllEvents = async () => {
  const res = await fetch(
    "https://test-project-228e5-default-rtdb.firebaseio.com/events.json"
  );
  const raw = await res.json();
  const events = [];
  for (const key in raw) {
    events.push({
      id: key,
      ...raw[key],
    });
    console.log(events);
  }

  return events;
};

//Filter Featured Events
export const getFeaturedEvents = async () => {
  const events = await getAllEvents();

  return events.filter((e) => e.isFeatured);
};

//Filter Events By Id
export const getEventById = async (id) => {
  const events = await getAllEvents();
  return events.find((e) => e.id === id);
};

//Filter by search
export const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;
  const events = await getAllEvents();
  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);

    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
