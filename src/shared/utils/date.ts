function ensureDate(input: string | number | Date): Date {
  return input instanceof Date ? input : new Date(input)
}

export function formatDate(date: Date | string, locale = "ko"): string {
  const d = ensureDate(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (locale === "ko") {
    if (diffInSeconds < 60) {
      return "방금 전"
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`
    } else if (diffInDays < 7) {
      return `${diffInDays}일 전`
    } else {
      return formatKoreanDate(date)
    }
  } else {
    if (diffInSeconds < 60) {
      return "Just now"
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`
    } else {
      return formatEnglishDate(date)
    }
  }
}

export function formatFullDate(date: Date | string, locale = "ko"): string {
  const d = ensureDate(date)
  if (locale === "ko") {
    return formatKoreanDateTime(date)
  } else {
    return formatEnglishDateTime(date)
  }
}

function formatKoreanDate(date: Date | string): string {
  const d = ensureDate(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  return `${year}년 ${month}월 ${day}일`
}

function formatKoreanDateTime(date: Date | string): string {
  const d = ensureDate(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hours = d.getHours().toString().padStart(2, "0")
  const minutes = d.getMinutes().toString().padStart(2, "0")
  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`
}

function formatEnglishDate(date: Date | string): string {
  const d = ensureDate(date)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const month = months[d.getMonth()]
  const day = d.getDate()
  const year = d.getFullYear()
  return `${month} ${day}, ${year}`
}

function formatEnglishDateTime(date: Date | string): string {
  const d = ensureDate(date)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const month = months[d.getMonth()]
  const day = d.getDate()
  const year = d.getFullYear()
  let hours = d.getHours()
  const minutes = d.getMinutes().toString().padStart(2, "0")
  const ampm = hours >= 12 ? "PM" : "AM"
  hours = hours % 12
  hours = hours ? hours : 12
  return `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`
}
