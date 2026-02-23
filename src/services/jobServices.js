export const getJobs = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/jobs/get-list`
  );

  if (!response.ok) {
    throw new Error("Error fetching jobs");
  }

  return response.json();
};