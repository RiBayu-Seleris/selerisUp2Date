// src/helpers/formatNumber.js

// 🔹 Format singkat (contoh: 15k, 1.2M)
export function formatNumber(num) {
  if (num == null) return "-";
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  } else {
    return num.toString();
  }
}

// 🔹 Format dengan pemisah ribuan (contoh: 15.000.000)
export function formatNumberSeparator(num) {
  if (num == null) return "-";
  return new Intl.NumberFormat("id-ID").format(num);
}
