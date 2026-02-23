export const getCandidateByEmail = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/candidate/get-by-email?email=${import.meta.env.VITE_EMAIL}`
  );

  if (!response.ok) {
    throw new Error("Error when searching for candidate.");
  }

  return response.json();
};