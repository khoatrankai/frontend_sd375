// components/TimeAgo.tsx
"use client"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/vi" // nếu muốn hiển thị tiếng Việt

import React from "react"

dayjs.extend(relativeTime)
dayjs.locale("vi") // đổi ngôn ngữ nếu cần

type TimeAgoProps = {
  date: string | Date
}

const TimeAgo = ({ date }: TimeAgoProps) => {
  return <span>{dayjs(date).fromNow()}</span>
}

export default TimeAgo
