const STORAGE_KEY = "SuperSecretKey";

export function formatTime(totalSeconds) {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
		2,
		"0"
	)}`;
}

export function formatRelativeTime(timestamp) {
	const now = Date.now();
	const diff = now - timestamp; // difference in ms

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	if(years > 1) return formatDate(timestamp);
	if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
	if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
	if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
	if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
	if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
	if (minutes > 0) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
	return "Just now";
}

export function formatDate(timestamp) {
	const date = new Date(timestamp);
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = String(date.getFullYear()).slice(-2);
	return `${day}/${month}/${year}`;
}


export function getTopScores() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveScore(name, time) {
	const scores = getTopScores();

	scores.push({
		name,
		time,
		timestamp: Date.now(),
	});
	scores.sort((a, b) => a.time - b.time);

	const top10 = scores.slice(0, 10);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(top10));

	return top10;
}
