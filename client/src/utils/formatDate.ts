export const fmtDate = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short", // Jan, Feb, Mar...
  year: "numeric",
});

export function formatDate(dateString: string): string {
  const inputDate = new Date(dateString);
  const now = new Date();

  // Convert to local date for better comparison
  const diffInMs = now.getTime() - inputDate.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // Handle today/yesterday
  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Yesterday";
  }

  // Handle days ago (2–6 days)
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  // Handle weeks
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks === 1) {
    return "A week ago";
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} weeks ago`;
  }

  // Handle months
  const diffInMonths =
    (now.getFullYear() - inputDate.getFullYear()) * 12 +
    (now.getMonth() - inputDate.getMonth());

  if (diffInMonths === 1) {
    return "1 month ago";
  } else if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }

  // Handle years
  const diffInYears = Math.floor(diffInMonths / 12);
  if (diffInYears === 1) {
    return "1 year ago";
  } else {
    return `${diffInYears} years ago`;
  }
}
