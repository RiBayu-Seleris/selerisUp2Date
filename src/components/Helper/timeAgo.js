// src/components/Helper/timeAgo.js
export function timeAgo(dateString) {
  const date = new Date(dateString); // ❌ jangan tambah offset manual lagi

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const safeDiff = diffInSeconds < 0 ? 0 : diffInSeconds;
  const days = Math.floor(safeDiff / (3600 * 24));
  const hours = Math.floor((safeDiff % (3600 * 24)) / 3600);
  const minutes = Math.floor((safeDiff % 3600) / 60);

  if (days > 0) {
    return `${days} Days Ago`;
  } else if (hours > 0) {
    return `${hours} Hours Ago`;
  } else if (minutes > 0) {
    return `${minutes} Minutes Ago`;
  } else {
    return "Just Now";
  }
}
